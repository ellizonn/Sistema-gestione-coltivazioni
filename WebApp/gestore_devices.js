"use strict";

const sqlite = require('sqlite3').verbose();

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
                console.log('Il Database iSerra è stato aperto con successo');
            } 
        });
    }


    /* METODI DEL GESTORE */

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

module.exports = gestore_devices;