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

app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/home.html'));

//INIZIO API REST

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

//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;