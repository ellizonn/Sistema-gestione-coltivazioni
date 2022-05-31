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

app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/home.html'));

//INIZIO API REST


//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;