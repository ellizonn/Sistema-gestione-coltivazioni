"use strict";

const obj_azienda = require('./obj_azienda');

const sqlite = require('sqlite3').verbose();

//Oggetti per creare i JSON
const azienda = require('./obj_azienda');
const proprieta = require('./obj_proprieta');

class gestore_proprieta{

    constructor(){
        this.DBSOURCE = './iserra.db';
        this.db =  new sqlite.Database(this.DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                console.log('Il Database iSerra è stato aperto con successo');
            } 
        });
    }


   //metodi del gestore

   //Trova l’id dell’azienda in cui lavora un utente.
    ottieni_azienda(id_user){
        return new Promise((resolve, reject) => {
            const sql = "SELECT fk_azienda FROM utente WHERE id_utente=?";
            this.db.get(sql,[id_user],(err, riga) =>{
                if (err)
                    reject(err);
                else if (riga === undefined)
                    resolve({error404:'Utente non esistente.'}); 
                else
                    resolve(riga);
            });                  
        });
    }

    //Fornisce info estese sull’azienda con l’ID specificato.
    ottieni_info_azienda(id_az){
        return new Promise((resolve, reject) => {
            const sql = "SELECT via,citta,CAP,civico,nomeaz,piva FROM azienda_agricola WHERE id_azienda=?";
            this.db.get(sql,[id_az],(err, riga) =>{
                if (err)
                    reject(err); 
                else if (riga === undefined)
                    resolve({error404:'Nessuna azienda trovata con questo id.'});
                else
                    resolve(new azienda(riga.id_azienda,riga.via,riga.citta,riga.CAP,riga.civico,riga.nomeaz,riga.piva));
            });        
        });
    }

    //Mostra l’elenco delle proprietà relativo ad una certa azienda.
    elenco_proprieta(id_az){
        return new Promise((resolve, reject) => {
            const sql = "SELECT id_proprieta,estensione_ettari,coltura,data_semina,lat,long,tipo_proprieta,copertura_mobile FROM proprieta WHERE fk_azienda=?";
            this.db.all(sql,[id_az],(err, rows) =>{
                if (err)
                    reject(err); 
                else if (rows === undefined)
                    resolve({error404:'Nessuna proprietà trovata per questa azienda.'});
                else{
                    let lista_proprieta = rows.map((row) => {return new proprieta(row.id_proprieta,row.estensione_ettari,row.coltura,row.data_semina,row.lat,row.long,row.tipo_proprieta,row.compertura_mobile)});
                    resolve(lista_proprieta);
                }
            });        
        });
    }
   
}

module.exports = gestore_proprieta;