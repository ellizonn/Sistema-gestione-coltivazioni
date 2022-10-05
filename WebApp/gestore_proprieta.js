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
                //console.log('Il Database iSerra è stato aperto con successo');
            } 
        });
        this.db.run("PRAGMA foreign_keys=ON");
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
                else if (rows.length === 0)
                    resolve({error404:'Nessuna proprietà trovata per questa azienda, o l\'azienda non esiste.'});
                else{
                    let lista_proprieta = rows.map((row) => {return new proprieta(row.id_proprieta,row.estensione_ettari,row.coltura,row.data_semina,row.lat,row.long,row.tipo_proprieta,row.compertura_mobile)});
                    resolve(lista_proprieta);
                }
            });        
        });
    }

    //Aggiunge una nuova proprietà.
    nuova_proprieta(proprieta, id_azienda) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO proprieta(estensione_ettari,coltura,data_semina,lat,long,tipo_proprieta,copertura_mobile,fk_azienda) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [proprieta.estensione_ettari,proprieta.coltura,proprieta.data_semina,proprieta.lat,proprieta.long,proprieta.tipo_proprieta,proprieta.copertura_mobile,id_azienda], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    //Elimina una proprietà tra quelle esistenti.
    elimina_proprieta(id_proprieta){
        return new Promise((resolve, reject) => {
            const sql = 'DELETE from proprieta WHERE id_proprieta=?';
            //console.log(sql+id_proprieta);
            this.db.run(sql,  [id_proprieta], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Proprietà da eliminare non trovata, o l\'azienda non esiste.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }
   
}

module.exports = gestore_proprieta;