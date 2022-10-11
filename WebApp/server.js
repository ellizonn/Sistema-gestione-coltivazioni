"use strict";

//Varie import e costanti
const express = require('express') ;
const g_p = require('./gestore_proprieta'); 
const gestore_proprieta = new g_p(); 
const g_d = require('./gestore_devices'); 
const gestore_devices = new g_d(); 
const g_c = require('./gestore_configurazioni'); 
const gestore_configurazioni = new g_c(); 
const g_s = require('./gestore_stati'); 
const gestore_stati = new g_s(); 
const app = express();
const port = 3000;

//Keycloak lato backend
const session = require('express-session')
var memoryStore = new session.MemoryStore();
app.use(session({ secret: 'some secret', resave: false, saveUninitialized: true, store: memoryStore }));
const keycloak = require('./keycloak_config.js').initKeycloak(memoryStore);
app.use(keycloak.middleware());
app.use( keycloak.middleware( { logout: '/logoff' } ));



//Oggetti per creare i JSON
const azienda = require('./obj_azienda');
const proprieta = require('./obj_proprieta');
const dispositivo_iot = require ('./obj_dispositivo_iot');

app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/home.html'));

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

//Inizializza il DB, non per le query principali (che sono svolte nei gestori)
//bensì per le query di supporto (dopo l'autenticazione, serve fare il controllo dell'autorizzazione)
const sqlite = require('sqlite3').verbose();
this.DBSOURCE = './iserra.db';
this.db =  new sqlite.Database(this.DBSOURCE, (err) => {
    if (err) {
        //non si riesce ad aprire il db
        console.err(err.message);
        throw err;
    }
    else{
        //console.log('Il Database iSerra è stato aperto con successo');
    } 
});



/* INIZIO API REST */

// Paolo's API

/*
    (1)
  GET /v1/azienda_user/{id_user}
  Trova l’id dell’azienda in cui lavora un utente.
  Chiama un metodo del gestore_proprieta (ottieni_azienda).
*/
app.get ('/v1/azienda_user/:id_user', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
  gestore_proprieta.ottieni_azienda(req.params.id_user).then ((idaz) => {
      if (idaz.error404){
          res.status(404).json(idaz);
      } else {
            const token = req.kauth.grant.access_token.content;
            //console.log(token);
            if(check_az(token, req.params.id_user))
                res.json(idaz);
            else
                res.status(401).json("utente correttamente loggato ma non autorizzato: puoi ottenere solo l'id della tua azienda!");
      }}).catch( (err) => {
         res.status(500).json({ 
            'errors': [{'param': 'Server', 'msg': err}],
          }); 
      });    
});
/*
    Controlla che l'utente loggato sia autorizzato,
    ovvero che richieda l'id della sua azienda (API 1)
*/
function check_az(token, id_user){
    if(token.sub === id_user)
        return true;
    else
        return false;
}


/*
    (2)
  GET /v1/aziende/{id_azienda}
  Fornisce info estese sull’azienda con l’ID specificato.
  Chiama un metodo del gestore_proprieta (ottieni_info_azienda).
*/
app.get ('/v1/aziende/:id_azienda', keycloak.protect(['collaboratore','agricoltore']),(req, res) => {
  gestore_proprieta.ottieni_info_azienda(req.params.id_azienda).then ((azienda) => {
      if (azienda.error404){
          res.status(404).json(azienda);
      } else {
            const token = req.kauth.grant.access_token.content;
            check_az_more(token, this.db).then ((authorize) => {
                //console.log(authorize);
                if(authorize.fk_azienda==req.params.id_azienda)
                    res.json(azienda);
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi ottenere solo info estesa sulla tua azienda!");
            }); 
      }}).catch( (err) => {
         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      }); 
});
/*
    Controlla che l'utente loggato sia autorizzato,
    ovvero che chieda info sull'azienda in cui lavora (API 2)
*/
function check_az_more(token, db){
    return new Promise((resolve, reject) => {
        const sql = "SELECT fk_azienda FROM utente WHERE id_utente=?";
        db.get(sql,[token.sub],(err, riga) =>{
            if (err)
                reject(err); 
            else if (riga === undefined)
                resolve({error404:'Nessuna azienda trovata per questo id utente.'});
            else
                resolve(riga);
        });    
    });
}


/*
    (3)
  GET /v1/aziende/{id_azienda}/proprieta
  Mostra l’elenco delle proprietà relativo ad una certa azienda.
*/
app.get ('/v1/aziende/:id_azienda/proprieta', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
  gestore_proprieta.elenco_proprieta(req.params.id_azienda).then ((proprieta) => {
      if (proprieta.error404){
          res.status(404).json(proprieta);
      } else {
          const token = req.kauth.grant.access_token.content;
          check_az_more(token, this.db).then ((authorize) => {
              if(authorize.fk_azienda==req.params.id_azienda)
                  res.json(proprieta);
              else
                  res.status(401).json("utente correttamente loggato ma non autorizzato: puoi ottenere solo info sulle proprieta della tua azienda!");
          }); 
      }}).catch( (err) => {
         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      }); 
});
/*
    Devo controllare che l'utente loggato sia autorizzato,
    ovvero che chieda info sulle proprieta' di un'azienda in cui lavora (API 3)
    NOTA: Qui per l'autorizzazione riutilizzo la function check_az_more(...)
*/


/*
        (4) 
    POST /v1/aziende/{id_azienda}/proprieta
    Aggiunge una nuova proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta', keycloak.protect(['agricoltore']), (req, res) => {
    console.log("SONO NELLA POST");
    console.log(req.body);
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
       /* const proprieta_app={
            estensione_ettari : req.body.estensione_ettari,
            coltura : req.body.coltura,
            data_semina : req.body.data_semina,
            tipo_proprieta : req.body.tipo_proprieta,
            lat : req.body.lat,
            long : req.body.long,
            copertura_mobile : req.body.copertura_mobile
        };
       let az=sessionStorage.getItem("id_azienda"); */
        if(authorize.fk_azienda==req.params.id_azienda){
       // if(authorize.fk_azienda==az){
            gestore_proprieta.nuova_proprieta(req.body.proprieta, req.params.id_azienda).then ((id_proprieta) => {
           // gestore_proprieta.nuova_proprieta(proprieta_app, az).then ((id_proprieta) => {
                if (id_proprieta.error404){
                    res.status(404).json(id_proprieta); 
                } else {
                    res.json(id_proprieta);
                    //res.redirect("Visualizza_elenco_proprieta.html"); //QUI CAMBIO POI LA PAGINA DI DESTINAZIONE
                }}).catch( (err) => {
                   res.status(500).json({ 
                       'errors': [{'param': 'Server', 'msg': err}],
                    }); 
            }); 
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi aggiungere proprieta' solo nella tua azienda!");
    }); 
});
/*
    Devo controllare che l'utente loggato (solo agricoltore, gia' controllato da keycloak) sia autorizzato,
    ovvero devo controllare che chieda di inserire una nuova proprietà per l'azienda in cui lavora (API 4)
    NOTA: Anche qui per l'autorizzazione riutilizzo la function check_az_more(...)
*/


/*
        (5)
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}
    Elimina una proprietà tra quelle esistenti.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr', keycloak.protect(['agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_proprieta.elimina_proprieta(req.params.id_propr).then((err) => {
                        if (err)
                            res.status(404).json(err);
                        else{
                            res.status(200).end();
                        }
                    }).catch((err) =>{
                         res.status(500).json({ 
                            'errors': [{'param': 'Server', 'msg': err}]
                         }); 
                    } );
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare proprieta' solo nella tua azienda!");
    });
});
/*
    Devo controllare che l'utente loggato (solo agricoltore, gia' controllato da keycloak) sia autorizzato,
    ovvero devo controllare che chieda di eliminare una nuova proprietà per l'azienda in cui lavora (API 5)
    NOTA: Anche qui per una parte di autorizzazione riutilizzo la function check_az_more(...)
    --> Inoltre, devo anche controllare che la proprieta' da eliminare sia di quella specifica azienda.
    Uso allora anche check_prop_on_az(...) per questa ultima parte di autorizzazione
*/
function check_prop_on_az(id_propr, db){
    return new Promise((resolve, reject) => {
        const sql = "SELECT fk_azienda FROM proprieta WHERE id_proprieta=?";
        db.get(sql,[id_propr],(err, riga) =>{
            if (err)
                reject(err); 
            else if (riga === undefined)
                resolve({error404:'Nessuna azienda trovata per questa proprieta\'.'});
            else
                resolve(riga);
        });    
    });
}


/*
        (6)
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/device
    Aggiunge un nuovo device in una data proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/device',  keycloak.protect(['agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_devices.nuovo_device(req.body.device, req.params.id_propr).then ((id_device) => {
                        if (id_device.error404){
                            res.status(404).json(id_device);
                        } else {
                            res.json(id_device);
                        }}).catch( (err) => {
                           res.status(500).json({ 
                               'errors': [{'param': 'Server', 'msg': err}],
                            }); 
                    }); 
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi aggiungere device in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi aggiungere device solo nella tua azienda!");
    });
});
/*
    Devo controllare che l'utente loggato (solo agricoltore, gia' controllato da keycloak) sia autorizzato,
    ovvero devo controllare che chieda di aggiungere un device per l'azienda in cui lavora (API 6)
    NOTA: Anche qui per una parte di autorizzazione riutilizzo la function check_az_more(...)
    --> Inoltre, devo anche controllare che la proprieta' su cui aggiungere quel device sia di quella specifica azienda.
        NOTA: riutilizzo allora anche check_prop_on_az(...) per questa ultima parte di autorizzazione
*/

/*
        (7)
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}
    Elimina un determinato device in una data proprietà.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device', keycloak.protect(['agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    check_device_on_propr(req.params.id_device, this.db).then((moreauth) => {
                        if(moreauth.fk_proprieta==req.params.id_propr){
                            gestore_devices.elimina_device(req.params.id_device).then((err) => {
                                if (err)
                                    res.status(404).json(err);
                                else
                                    res.status(200).end();
                            }).catch((err) =>{
                                 res.status(500).json({ 
                                    'errors': [{'param': 'Server', 'msg': err}]
                                 }); 
                            } );
                        }
                        else
                            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un device solo se e' effettivamente sulla proprieta\' dichiarata!");
                    });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un device solo in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un device solo nella tua azienda!");
    });
});
/*
    Devo controllare che l'utente loggato (solo agricoltore, gia' controllato da keycloak) sia autorizzato,
    ovvero devo controllare che chieda di eliminare un device per l'azienda in cui lavora (API 7)
    NOTA: Anche qui per una parte di autorizzazione riutilizzo la function check_az_more(...)
    --> Inoltre, devo anche controllare che la proprieta' da cui elimina quel device sia di quella specifica azienda.
        NOTA: riutilizzo allora anche check_prop_on_az(...) per questa parte di autorizzazione
    --> Inoltre, devo anche controllare che il device da eliminare si trovi effettivamente su quella proprieta'
        NOTA: uso allora la nuova function check_device_on_propr(...) per questa ultima parte di autorizzazione
*/
function check_device_on_propr(id_device, db){
    return new Promise((resolve, reject) => {
        const sql = "SELECT fk_proprieta FROM dispositivo_iot WHERE id_device=?";
        db.get(sql,[id_device],(err, riga) =>{
            if (err)
                reject(err); 
            else if (riga === undefined)
                resolve({error404:'Nessuna proprieta\' trovata per questo dispositivo iot\'.'});
            else
                resolve(riga);
        });    
    });
}



// Elia's API

/*
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/device
    Ottieni l’elenco degli IoT devices installati in una data proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/device', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_devices.ottieni_iot_proprieta(req.params.id_propr).then ((dispositivi_iot) => {
                        if (dispositivi_iot.error404){
                            res.status(404).json(dispositivi_iot);
                        } else {
                            res.json(dispositivi_iot);
                        }}).catch( (err) => {
                           res.status(500).json({ 
                               'errors': [{'param': 'Server', 'msg': err}],
                            }); 
                        });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare device solo in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare device solo nella tua azienda!");
    }); 
});//OK

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani
    Aggiunge un nuovo piano di configurazione relativo ad una certa proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/piani', keycloak.protect(['agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_configurazioni.nuova_configurazione(req.body.piano_configurazione, req.params.id_proprieta, req.params.id_utente).then ((id_piano) => {
                        if (id_piano.error404){
                            res.status(404).json(id_piano);
                        } else {
                            res.json(id_piano);
                        }}).catch( (err) => {
                           res.status(500).json({ 
                               'errors': [{'param': 'Server', 'msg': err}],
                            }); 
                        }); 
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi aggiungere piani in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi aggiungere piani solo nella tua azienda!");
    });
});

/*
    PUT /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/?manuale={true;false}
    Cambia la modalità di funzionamento (manuale/automatica) di un dato attuatore di una data proprietà.
*/
app.put ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/manuale/:manuale', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    check_device_on_propr(req.params.id_device, this.db).then((moreauth) => {
                        if(moreauth.fk_proprieta==req.params.id_propr){
                            gestore_configurazioni.cambio_mod_attuatore(req.params.id_device, req.params.manuale).then ((funzionamento_manuale) => {
                                if (funzionamento_manuale.error404){
                                    res.status(404).json(funzionamento_manuale);
                                } else {
                                    res.json(funzionamento_manuale);
                                }}).catch( (err) => {
                                   res.status(500).json({ 
                                       'errors': [{'param': 'Server', 'msg': err}],
                                    }); 
                                });
                        }
                        else
                            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi modificare un atturatore solo se e' effettivamente sulla proprieta\' dichiarata!");
                    });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi modificare un atturatore solo in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi modificare un atturatore solo nella tua azienda!");
    });
});

/*
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani/{id_piano}
    Elimina uno specifico piano di configurazione inserito in precedenza.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr/piani/:id_piano', keycloak.protect(['agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    check_piano_on_propr(req.params.id_piano, this.db).then((moreauth) => {
                        if(moreauth.fk_proprieta==req.params.id_propr){
                            gestore_configurazioni.elimina_configurazione(req.params.id_piano).then((err) => {
                                if (err)
                                    res.status(404).json(err);
                                else
                                    res.status(200).end();
                            }).catch((err) =>{
                                 res.status(500).json({ 
                                    'errors': [{'param': 'Server', 'msg': err}]
                                 }); 
                            } );
                        }
                        else
                            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un piano solo se e' effettivamente sulla proprieta\' dichiarata!");
                    });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un piano solo in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi eliminare un piano solo nella tua azienda!");
    });
});

function check_piano_on_propr(id_piano, db){
    return new Promise((resolve, reject) => {
        const sql = "SELECT fk_proprieta FROM piano_configurazione WHERE id_piano=?";
        db.get(sql,[id_piano],(err, riga) =>{
            if (err)
                reject(err); 
            else if (riga === undefined)
                resolve({error404:'Nessuna proprieta\' trovata per questo piano di configurazione\'.'});
            else
                resolve(riga);
        });    
    });
}

/*
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani
    Ottieni l’elenco di piani di configurazione presenti su una proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/piani',  keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_configurazioni.ottieni_configurazioni_proprieta(req.params.id_propr).then ((piano_configurazione) => {
                        if (piano_configurazione.error404){
                            res.status(404).json(piano_configurazione);
                        } else {
                            res.json(piano_configurazione);
                        }}).catch( (err) => {
                           res.status(500).json({ 
                               'errors': [{'param': 'Server', 'msg': err}],
                            }); 
                        });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare piani che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare piani solo nella tua azienda!");
    });
});//OK

/*
    PUT /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/?stato={true;false}
    Cambia lo stato (“on”/”off”) di un certo attuatore.
    Con “on”/”off” intendiamo se l’attuatore sta funzionando o meno.
*/
//'/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?stato={1;0}'
app.put ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/stato/:stato',  keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    check_device_on_propr(req.params.id_device, this.db).then((moreauth) => {
                        if(moreauth.fk_proprieta==req.params.id_propr){
                            gestore_stati.cambio_stato_attuatore(req.params.id_device, req.params.stato).then ((stato_attuale) => {
                                if (stato_attuale.error404){
                                    res.status(404).json(stato_attuale);
                                } else {
                                    res.json(stato_attuale);
                                }}).catch( (err) => {
                                   res.status(500).json({ 
                                       'errors': [{'param': 'Server', 'msg': err}],
                                    }); 
                                });
                        }
                        else
                            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi cambiare lo stato di un device solo se e' effettivamente sulla proprieta\' dichiarata!");
                    });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi cambiare lo stato di un device solo in proprieta' che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi cambiare lo stato di un device solo nella tua azienda!");
    });
});

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/misura
    Aggiunge una nuova misura.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/misura', (req, res) => {
    gestore_stati.nuova_misura(req.body.nuova_misura, req.params.id_device).then ((id_misura) => {
        if (id_misura.error404){
            res.status(404).json(id_misura);
        } else {
            res.json(id_misura);
        }}).catch( (err) => {
           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        });
});

/*
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/stati_device
    Ottieni l’elenco degli stati dei device appartenenti ad una determinata proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/stati_device',  keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    const token = req.kauth.grant.access_token.content;
    check_az_more(token, this.db).then ((authorize) => {
        if(authorize.fk_azienda==req.params.id_azienda){
            check_prop_on_az(req.params.id_propr, this.db).then ((auth) => {
                if(auth.fk_azienda==req.params.id_azienda){
                    gestore_stati.ottieni_stato_proprieta(req.params.id_propr).then ((lista_stati) => {   
                        if (lista_stati.error404){
                            res.status(404).json(lista_stati);
                        } else {
                            res.json(lista_stati);
                        }}).catch( (err) => {
                           res.status(500).json({ 
                               'errors': [{'param': 'Server', 'msg': err}],
                            }); 
                        });
                }
                else
                    res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare stati dei device che appartengono effettivamente alla tua azienda!");
            });
        }
        else
            res.status(401).json("utente correttamente loggato ma non autorizzato: puoi visualizzare stati dei device solo nella tua azienda!");
    });
});

//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;