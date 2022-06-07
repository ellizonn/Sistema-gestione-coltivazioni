"use strict";

const sqlite = require('sqlite3').verbose();
const gestore_devices = require('./gestore_devices');
const iot = require('./obj_dispositivo_iot');
const misura = require('./obj_misura');

class gestore_stati{

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

    cambio_stato_attuatore(id_device, new_stato) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE dispositivo_iot SET stato = ? WHERE id_device = ?';
            this.db.run(sql,  [new_stato, id_device], 
            function (err) {
                if(err){
                    reject(err);
                } else { 
                    if (this.changes === 0)
                        resolve({error404: 'Attuatore richiesto non trovato, oppure la proprietà o l\'azienda non esistono.'});
                    else {
                        resolve();
                    }
                }
            })
        });
    }

    nuova_misura(misura, id_device) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO misura(data_misurazione,ora_misurazione,valore_misurato,unita_misura,fk_device) VALUES (?, ?, ?, ?, ?)';
            this.db.run(sql, [misura.data_misurazione,misura.ora_misurazione,misura.valore_misurato,misura.unita_misura,id_device], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    ottieni_stato_proprieta(id_proprieta) {
        //TODO: ?
    }

        ottieni_stato_attuatori_proprieta(id_proprieta) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id_device,stato FROM dispositivo_iot WHERE fk_proprieta = ?';
                this.db.all(sql, [id_proprieta], (err, rows) => {
                    if (err) 
                        reject(err);
                    else if (rows.length === 0)
                        resolve({error404: 'Nessun dispositivo_iot trovato per questa proprieta, o la proprieta non esiste'});
                    else {
                        let lista_stati_attuatori_proprieta = rows.map((row) => {return new iot(row.id_device,row.stato)});
                        resolve(lista_stati_attuatori_proprieta);
                    }
                });
            });
        }

        ottieni_stato_misure_proprieta(id_proprieta) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id_misura,data_misurazione,ora_misurazione,valore_misurato,unita_misura FROM misura WHERE fk_device = (SELECT id_device FROM dispositivo_iot WHERE fk_proprieta = ?)';
                this.db.all(sql, [id_proprieta], (err, rows) => {
                    if (err) 
                        reject(err);
                    else if (rows.length === 0)
                        resolve({error404: 'Nessuna misura trovata per questo dispositivo_iot, oppure nessun dispositivo_iot trovato per questa proprieta, o la proprieta non esiste'});
                    else {
                        let lista_stati_misure_proprieta = rows.map((row) => {return new misura(row.id_misura,row.data_misurazione,row.ora_misurazione,row.valore_misurato,row.unita_misura)});
                        resolve(lista_stati_misure_proprieta);
                    }
                });
            });
        }

    ottieni_mod_singolo_attuatore(id_device) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT manuale FROM dispositivo_iot WHERE id_device=?";
            this.db.get(sql,[id_device],(err, rows) =>{
                if (err)
                    reject(err); 
                else if (rows === undefined)
                    resolve({error404:'Nessuna azienda trovata con questo id.'});
                else
                    resolve(rows.manuale);
            });        
        });
    }
   
}

module.exports = gestore_stati;