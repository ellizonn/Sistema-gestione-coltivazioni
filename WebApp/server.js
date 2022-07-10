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



/* INIZIO API REST */

// Paolo's API

/*
  GET /v1/azienda_user/{id_user}
  Trova l’id dell’azienda in cui lavora un utente.
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
    ovvero che richieda l'id della sua azienda
*/
function check_az(token, id_user){
    if(token.sub === id_user)
        return true;
    else
        return false;
}

/*
  GET /v1/aziende/{id_azienda}
  Fornisce info estese sull’azienda con l’ID specificato.
*/
app.get ('/v1/aziende/:id_azienda', keycloak.protect(['collaboratore','agricoltore']),(req, res) => {
  gestore_proprieta.ottieni_info_azienda(req.params.id_azienda).then ((azienda) => {
      if (azienda.error404){
          res.status(404).json(azienda);
      } else {
          res.json(azienda); 
      }}).catch( (err) => {
         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      }); 
});


/*
  GET /v1/aziende/{id_azienda}/proprieta
  Mostra l’elenco delle proprietà relativo ad una certa azienda.
*/
app.get ('/v1/aziende/:id_azienda/proprieta', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
  gestore_proprieta.elenco_proprieta(req.params.id_azienda).then ((proprieta) => {
      if (proprieta.error404){
          res.status(404).json(proprieta);
      } else {
          res.json(proprieta);
      }}).catch( (err) => {
         res.status(500).json({ 
             'errors': [{'param': 'Server', 'msg': err}],
          }); 
      }); 
});

/*
    POST /v1/aziende/{id_azienda}/proprieta
    Aggiunge una nuova proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta', keycloak.protect('agricoltore'), (req, res) => {
    gestore_proprieta.nuova_proprieta(req.body.proprieta, req.params.id_azienda).then ((id_proprieta) => {
        if (id_proprieta.error404){
            res.status(404).json(id_proprieta); 
        } else {
            res.json(id_proprieta);
            res.redirect("Visualizza_elenco_proprieta.html"); // Aggiunta da Mattia
        }}).catch( (err) => {
           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        }); 
});

/*
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}
    Elimina una proprietà tra quelle esistenti.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr', keycloak.protect('agricoltore'), (req, res) => {
    gestore_proprieta.elimina_proprieta(req.params.id_propr).then((err) => {
        if (err)
            res.status(404).json(err);
        else
            res.status(200).end();
    }).catch((err) =>{
         res.status(500).json({ 
            'errors': [{'param': 'Server', 'msg': err}]
         }); 
    } );
});

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/device
    Aggiunge un nuovo device in una data proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/device',  keycloak.protect('agricoltore'), (req, res) => {
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
});

/*
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}
    Elimina un determinato device in una data proprietà.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device', keycloak.protect('agricoltore'), (req, res) => {
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
});


// Elia's API

/*
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/device
    Ottieni l’elenco degli IoT devices installati in una data proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/device', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
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
});//OK

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani
    Aggiunge un nuovo piano di configurazione relativo ad una certa proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/piani', keycloak.protect('agricoltore'), (req, res) => {
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
});

/*
    PUT /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/?manuale={true;false}
    Cambia la modalità di funzionamento (manuale/automatica) di un dato attuatore di una data proprietà.
*/
app.put ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?manuale={true;false}', keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
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
});

/*
    DELETE /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani/{id_piano}
    Elimina uno specifico piano di configurazione inserito in precedenza.
*/
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr/piani/:id_piano', keycloak.protect('agricoltore'), (req, res) => {
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
});

/*
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani
    Ottieni l’elenco di piani di configurazione presenti su una proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/piani',  keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
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
});//OK

/*
    PUT /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/?stato={true;false}
    Cambia lo stato (“on”/”off”) di un certo attuatore.
    Con “on”/”off” intendiamo se l’attuatore sta funzionando o meno.
*/
app.put ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?stato={true;false}',  keycloak.protect(['collaboratore','agricoltore']), (req, res) => {
    gestore_stati.cambio_stato_attuatore(req.params.id_device, req.params.new_stato).then ((stato_attuale) => {
        if (stato_attuale.error404){
            res.status(404).json(stato_attuale);
        } else {
            res.json(stato_attuale);
        }}).catch( (err) => {
           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        }); 
});

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/device/{id_device}/misura
    TODO: aggiungere descrizione (anche su file WORD!!!!!!!!) - PARLA CON PAOLO
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
    
});

//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;