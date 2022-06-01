"use strict";

const sqlite = require('sqlite3').verbose();
const dispositivo_iot = require ('./obj_dispositivo_iot');

class gestore_configurazioni{

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


    /* METODI DEL GESTORE */

    nuova_configurazione(piano_configurazione, id_proprieta, id_utente) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO piani_configurazione VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            this.db.run(sql, [piano_configurazione.id_proprieta, piano_configurazione.id_utente, piano_configurazione.condizioni_misure, piano_configurazione.attuatori_coinvolti, piano_configurazione.conseguenze, piano_configurazione.tipo_piano, piano_configurazione.umidita_min, piano_configurazione.temperatura_max, piano_configurazione.tempo_funzionamento, piano_configurazione.temperatura_da, piano_configurazione.temperatura_a, piano_configurazione.luminosita_da, piano_configurazione.luminosita_a, piano_configurazione.orario_da, piano_configurazione.orario_a, id_proprieta, id_utente], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    cambio_mod_attuatore(id_device, manuale) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE dispositivi_iot SET manuale = ? WHERE id_device = ?';
            this.db.run(sql,  [manuale, id_device], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error404: 'Attuatore richiesto non trovato.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

    ottieni_iot_proprieta(id_proprieta) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id_device,mod_interazione,parametri_connessione,tipo,unita_misura,funzione,stato,manuale FROM dispositivi_iot WHERE fk_proprieta = ?';
            this.db.get(sql, [id_proprieta], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessun dispositivo_iot trovato per questa proprieta, o la proprieta non esiste'});
                else {
                    let lista_dispositivi_iot = rows.map((row) => {return new dispositivo_iot(row.id_device,row.mod_interazione,row.parametri_connessione,row.tipo,row.unita_misura,row.funzione,row.stato,row.manuale)});
                    resolve(lista_dispositivi_iot);
                }
            });
        });
    }
   
}

module.exports = gestore_configurazioni;