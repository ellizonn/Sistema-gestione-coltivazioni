"use strict";

const sqlite = require('sqlite3').verbose();
const g_f = require('./gestore_configurazioni');
const gestore_configurazioni = new g_f();
const iot = require('./obj_dispositivo_iot');
const misura = require('./obj_misura');
const mqtt = require('mqtt');
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth - non ci serve autenticazione per test.mosquitto.org
    //clientId: 'emqx_test',
    //username: 'emqx_test',
    //password: 'emqx_test',
}

//inserisce misura in arrivo da mqtt
async function support_measure(misura, id_device){
    await more_support_measure(id_device);
    let DBSOURCE = './iserra.db';
        let db =  new sqlite.Database(DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                //console.log('Il Database iSerra è stato aperto con successo');
            } 
    });
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO misura(data_misurazione,ora_misurazione,valore_misurato,unita_misura,fk_device) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [misura.data_misurazione,misura.ora_misurazione,misura.valore_misurato,misura.unita_misura,id_device], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

//rimuove tutte le misure precedenti a quella dell'inserimento
async function more_support_measure(id_device){
    let DBSOURCE = './iserra.db';
        let db =  new sqlite.Database(DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                //console.log('Il Database iSerra è stato aperto con successo');
            } 
    });
    return new Promise((resolve, reject) => {
        const sql = 'DELETE from misura WHERE fk_device=?';
        db.run(sql, [id_device], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

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
        this.db.run("PRAGMA foreign_keys=ON");


        const client  = mqtt.connect('mqtt://test.mosquitto.org:1883', options);
        client.on('connect', function () {
            console.log('gestore_stati connesso al server mqtt');
            client.subscribe('azienda/+/proprieta/+/misure', function (err) {
                //if (!err) {
                //client.publish('test', 'Hello mqtt')
                //}
            })
        })


        //FORMATO CORRETTO ACCETTATO
        // {"id_device": 1, "data_misurazione": "08-06-2022", "ora_misurazione": "15:50", "valore_misurato": 23, "unita_misura": "Celsius"}
        client.on('message', function (topic, message) {
            //console.log(message.toString())
            //client.end() - no, altrimenti me lo spegne
            let msg;
            topic = topic.split('/');
            topic = topic[3];
            msg = JSON.parse(message.toString());
            (async function(){
                await support_measure(msg,msg.id_device);
                gestore_configurazioni.measure_alarm(topic);
            }());
        })
      
    }


    /* METODI DEL GESTORE */

    cambio_stato_attuatore(id_device, new_stato) {
        return new Promise((resolve, reject) => {
            this.ottieni_mod_singolo_attuatore(id_device).then ((manuale) => {
                if(manuale==0) {
                    resolve({error404: 'Non è possibile cambiare lo stato del attuatore se questo è in modalità automatica: impostare modalità manuale.'});
                }
                else {
                    const sql = 'UPDATE dispositivo_iot SET stato = ? WHERE id_device = ?';
                    this.db.run(sql,  [new_stato, id_device], 
                    function (err) {
                        if(err){
                            reject(err);
                        } else { 
                            if (this.changes === 0)
                                resolve({error404: 'Attuatore richiesto non trovato, oppure la proprietà o l\'azienda non esistono.'});
                            else {
                                let topic = 'azienda/+/proprieta/+/attuatori';
                                const client = mqtt.connect('mqtt://test.mosquitto.org:1883', options);
                                client.on('connect', function () {
                                    console.log('gestore_stati connesso al server mqtt');
                                    client.publish(topic, '{"id_device": ' + id_device + ', "stato": ' + new_stato, function (err) {
                                        //if (!err) {
                                        //client.publish('test', 'Hello mqtt')
                                        //}
                                    })
                                })
                                resolve();
                            }
                        }
                    })
                }
            })
        });
    }

    //TODO: si potrebbere mettere client e topic global

    static nuova_misura(misura, id_device) {
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
        return new Promise((resolve, reject) => {
            let lista_stati_attuatori_proprieta;
            const sql = 'SELECT id_device,stato FROM dispositivo_iot WHERE fk_proprieta=? AND tipo=\'Attuatore\'';
                this.db.all(sql, [id_proprieta], (err, rows) => {
                    if (err) 
                        reject(err);
                    else if (rows.length === 0)
                        resolve({error404: 'Nessun Sensore trovato per questa proprieta, o la proprieta non esiste'});
                    else {
                        lista_stati_attuatori_proprieta = rows.map((row) => {return new iot(row.id_device,row.stato)});
                        //resolve(lista_stati_attuatori_proprieta);
                    }
                });
            const sql1 = 'SELECT id_misura,data_misurazione,ora_misurazione,valore_misurato,unita_misura FROM misura WHERE fk_device IN (SELECT id_device FROM dispositivo_iot WHERE fk_proprieta=? AND tipo=\'Sensore\')';
                this.db.all(sql1, [id_proprieta], (err, rows) => {
                    if (err) 
                        reject(err);
                    else if (rows.length === 0)
                        resolve({error404: 'Nessuna misura di Sensori trovata per questa proprieta\', oppure nessun Sensore trovato per questa proprieta, o la proprieta non esiste'});
                    else {
                        let lista_stati_misure_proprieta = rows.map((row) => {return new misura(row.id_misura,row.data_misurazione,row.ora_misurazione,row.valore_misurato,row.unita_misura)});
                        const result = {
                            lista_stati_attuatori_proprieta,
                            lista_stati_misure_proprieta
                        };
                        resolve(result);
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