"use strict";

const sqlite = require('sqlite3').verbose();

//Oggetti per creare i JSON
const iot = require('./obj_dispositivo_iot');

class gestore_devices{

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
    }


    /* METODI DEL GESTORE */

    //Ottieni l’elenco degli IoT devices installati in una data proprietà.
    ottieni_iot_proprieta(id_proprieta) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id_device,mod_interazione,parametri_connessione,tipo,unita_misura,funzione,stato,manuale FROM dispositivo_iot WHERE fk_proprieta = ?";
            this.db.all(sql, [id_proprieta], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessun dispositivo_iot trovato per questa proprieta, o la proprieta non esiste'});
                else {
                    let lista_dispositivi_iot = rows.map((row) => {return new iot(row.id_device,row.mod_interazione,row.parametri_connessione,row.tipo,row.unita_misura,row.funzione,row.stato,row.manuale)});
                    resolve(lista_dispositivi_iot);
                }
            });
        });
    }//OK

    //Aggiunge un nuovo device in una data proprietà.
    nuovo_device(device, id_proprieta) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO dispositivo_iot(mod_interazione,parametri_connessione,tipo,unita_misura,funzione,stato,manuale,fk_proprieta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [device.mod_interazione,device.parametri_connessione,device.tipo,device.unita_misura,device.funzione,device.stato,device.manuale,id_proprieta], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    //Elimina un determinato device in una data proprietà.
    elimina_device(id_device){
        return new Promise((resolve, reject) => {
            const sql = 'DELETE from dispositivo_iot WHERE id_device=?';
            this.db.run(sql,  [id_device], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Dispositivo da eliminare non trovato, o la prorprietà non esiste.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

   
}

module.exports = gestore_devices;