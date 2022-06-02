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
            const sql = 'INSERT INTO piano_configurazione VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
            const sql = 'UPDATE dispositivo_iot SET manuale = ? WHERE id_device = ?';
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

    elimina_configurazione(id_piano){
        return new Promise((resolve, reject) => {
            const sql = 'DELETE from piano_configurazione WHERE id_piano = ?';
            this.db.run(sql,  [id_piano], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error: 'Piano configurazione da eliminare non trovato, o la proprietà non esiste, o l\'azienda non esiste.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

    ottieni_configurazioni_proprieta(id_proprieta) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id_piano,condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_min,temperatura_max,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a FROM piano_configurazione WHERE fk_proprieta = ?';
            this.db.get(sql, [id_proprieta], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessun piano configurazione trovato per questa proprieta, o la proprieta non esiste'});
                else {
                    let lista_configurazioni_proprieta = rows.map((row) => {return new piano_configurazione(row.id_piano,row.condizioni_misure,row.attuatori_coinvolti,row.conseguenze,row.tipo_piano,row.umidita_min,row.temperatura_max,row.tempo_funzionamento,row.temperatura_da,row.temperatura_a,row.luminosita_da,row.luminosita_a,row.orario_da,row.orario_a)});
                    resolve(lista_configurazioni_proprieta);
                }
            });
        });
    }

}

module.exports = gestore_configurazioni;