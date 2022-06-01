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
app.get ('/v1/azienda_user/:id_user', (req, res) => {
  gestore_proprieta.ottieni_azienda(req.params.id_user).then ((idaz) => {
      if (idaz.error404){
          res.status(404).json(idaz);
      } else {
          res.json(idaz);
      }}).catch( (err) => {
         res.status(500).json({ 
            'errors': [{'param': 'Server', 'msg': err}],
          }); 
      });    
});

/*
  GET /v1/aziende/{id_azienda}
  Fornisce info estese sull’azienda con l’ID specificato.
*/
app.get ('/v1/aziende/:id_azienda', (req, res) => {
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
app.get ('/v1/aziende/:id_azienda/proprieta', (req, res) => {
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
app.post ('/v1/aziende/:id_azienda/proprieta', (req, res) => {
    gestore_proprieta.nuova_proprieta(req.body.proprieta, req.params.id_azienda).then ((id_proprieta) => {
        if (id_proprieta.error404){
            res.status(404).json(id_piano); //TODO:forse intendevi id_proprieta?
        } else {
            res.json(id_proprieta);
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
app.delete('/v1/aziende/:id_azienda/proprieta/:id_propr', (req, res) => {
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



// Elia's API

/*
    POST /v1/aziende/{id_azienda}/proprieta/{id_propr}/piani
    Aggiunge un nuovo piano di configurazione relativo ad una certa proprietà.
*/
app.post ('/v1/aziende/:id_azienda/proprieta/:id_propr/piani', (req, res) => {
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
app.put ('/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?manuale={true;false}', (req, res) => {
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
    GET /v1/aziende/{id_azienda}/proprieta/{id_propr}/device
    Ottieni l’elenco degli IoT devices installati in una data proprietà.
*/
app.get ('/v1/aziende/:id_azienda/proprieta/:id_propr/device', (req, res) => {
    gestore_devices.ottieni_iot_proprieta(req.params.id_proprieta).then ((dispositivi_iot) => {
        if (dispositivi_iot.error404){
            res.status(404).json(dispositivi_iot);
        } else {
            res.json(dispositivi_iot);
        }}).catch( (err) => {
           res.status(500).json({ 
               'errors': [{'param': 'Server', 'msg': err}],
            }); 
        }); 
});


//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;