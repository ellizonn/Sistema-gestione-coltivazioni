"use strict";

const sqlite = require('sqlite3').verbose();
const piano_configurazione = require ('./obj_piano_configurazione');
const misura = require('./obj_misura');
const g_d = require('./gestore_devices');
const gestore_devices = new g_d();
const mqtt = require('mqtt');
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    username: 'pissir',
    password: 'pissir2020'
    // Auth - non ci serve autenticazione per test.mosquitto.org
    //clientId: 'emqx_test',
    //username: 'emqx_test',
    //password: 'emqx_test',
}

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
                //console.log('Il Database iSerra è stato aperto con successo');
            } 
        });
        this.db.run("PRAGMA foreign_keys=ON");
    }


    /* METODI DEL GESTORE */

    nuova_configurazione(piano_configurazione, id_proprieta, id_utente) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO piano_configurazione(condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_da,umidita_a,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a,fk_proprieta,fk_utente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            console.log(sql)
            this.db.run(sql, [piano_configurazione.condizioni_misure, piano_configurazione.attuatori_coinvolti, piano_configurazione.conseguenze, piano_configurazione.tipo_piano, piano_configurazione.umidita_da, piano_configurazione.umidita_a, piano_configurazione.tempo_funzionamento, piano_configurazione.temperatura_da, piano_configurazione.temperatura_a, piano_configurazione.luminosita_da, piano_configurazione.luminosita_a, piano_configurazione.orario_da, piano_configurazione.orario_a, id_proprieta, id_utente], function(err) {
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
            const sql = "SELECT id_piano,condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_da,umidita_a,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a FROM piano_configurazione WHERE fk_proprieta = ?";
            this.db.all(sql, [id_proprieta], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessun piano configurazione trovato per questa proprieta, o la proprieta non esiste'});
                else {
                    let lista_configurazioni_proprieta = rows.map((row) => {return new piano_configurazione(row.id_piano,row.condizioni_misure,row.attuatori_coinvolti,row.conseguenze,row.tipo_piano,row.umidita_da,row.umidita_a,row.tempo_funzionamento,row.temperatura_da,row.temperatura_a,row.luminosita_da,row.luminosita_a,row.orario_da,row.orario_a)});
                    resolve(lista_configurazioni_proprieta);
                }
            });
        });
    }//OK

    //Per accorgersi che gestore_stati ha registrato una nuova misura: si controllano quindi le configurazioni
    measure_alarm(propr_measure_changed){

        this.measure_alarm_conf(propr_measure_changed).then ((configs) => {
            this.measure_alarm_mis(propr_measure_changed).then ((misure) =>{
                //console.log(misure);
                for(let i=0; i<configs.length; i++){
                    let config=configs[i];
                    let x = config.attuatori_coinvolti.toString();
                    let array_id_devices = x.split(',');
                    //console.log(config.tipo_piano.toString())
                    switch(config.tipo_piano.toString()){
                        case "piano_irrigazione":
                            //console.log("irrig")
                            this.case_default(misure, array_id_devices, config.umidita_da, config.umidita_a, "%");
                            break;
                        case "piano_illuminazione":
                            //console.log("illum")
                            this.case_default(misure, array_id_devices, config.luminosita_da, config.luminosita_a, "lx");
                            break;
                        case "piano_riscaldamento":
                            //console.log("riscald")
                            //console.log(array_id_devices)
                            this.case_default(misure, array_id_devices, config.temperatura_da, config.temperatura_a, "°C");
                            break;  
                        default:
                            break;
                    }
                    
                }

            });
        });      
    }

    //Ottiene tutte le configurazioni automatiche della proprieta' utili al metodo precedente
    measure_alarm_conf(id_propr){
        return new Promise((resolve, reject) => {
            const sql = "SELECT id_piano,condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_da,umidita_da,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a FROM piano_configurazione WHERE fk_proprieta=?";
            this.db.all(sql, [id_propr], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessun piano configurazione trovato'});
                else {
                    let lista_configurazioni_proprieta = rows.map((row) => {return new piano_configurazione(row.id_piano,row.condizioni_misure,row.attuatori_coinvolti,row.conseguenze,row.tipo_piano,row.umidita_da,row.umidita_a,row.tempo_funzionamento,row.temperatura_da,row.temperatura_a,row.luminosita_da,row.luminosita_a,row.orario_da,row.orario_a)});
                    resolve(lista_configurazioni_proprieta);
                }
            });
        });
    }

    //Ottiene tutte le misure (recenti) della proprieta' utili al metodo precedente
    measure_alarm_mis(id_propr){
        return new Promise((resolve, reject) => {
            const sql = "SELECT id_misura,data_misurazione,ora_misurazione,valore_misurato,misura.unita_misura FROM misura,dispositivo_iot WHERE fk_device=id_device AND fk_proprieta=?";
            this.db.all(sql, [id_propr], (err, rows) => {
                if (err) 
                    reject(err);
                else if (rows.length === 0)
                    resolve({error404: 'Nessuna misura trovata per la proprieta\' in questione'});
                else {
                    let lista_misure_proprieta = rows.map((row) => {return new misura(row.id_misura,row.data_misurazione,row.ora_misurazione,row.valore_misurato,row.unita_misura)});
                    resolve(lista_misure_proprieta);
                }
            });
        });
    }

    //Implementazione degli switch case del metodo measure_alarm
    case_default(misure, array_id_devices, da, a, unita_misura) {
        
        for(let i=0; i<misure.length; i++) {
            let mis=misure[i];
            //console.log("val mis  "+mis.valore_misurato);
            //console.log("da   "+da);
                for(let j=0; j<array_id_devices.length; j++) {
                    let id_device = array_id_devices[j];
                    gestore_devices.ottieni_info_device(id_device).then ((device) => {
                        //console.log(device.id_device)
                        if(
                            id_device == device.id_device
                            && device.manuale == 0
                            && (mis.valore_misurato<da || mis.valore_misurato>a)
                            && device.tipo == "Attuatore"
                            && device.unita_misura == unita_misura
                        ) {
 
                            let new_stato=1;

                            if(mis.valore_misurato<da) {
                                //console.log("a")
                                new_stato = 1;
                            }
                            else if(mis.valore_misurato>a) {
                                //console.log("b")
                                new_stato = 0;
                            }

                            const sql = 'UPDATE dispositivo_iot SET stato = ? WHERE id_device = ?';
                            this.db.run(sql,  [new_stato, id_device]);
                                
                            let topic = 'azienda/1/proprieta/2/attuatori';
                            const client = mqtt.connect('tcp://193.206.52.98:1883', options);
                            
                            console.log("scatto dell'automatismo per il device "+id_device+" con il nuovo stato "+new_stato)

                            client.publish(topic, '{"id_device": ' + id_device + ', "stato": ' + new_stato + '}');

                           
                        }
                            /*
                            const g_s = require('./gestore_stati');
                            const gestore_stati = new g_s();
                            gestore_stati.cambio_stato_attuatore(id_device, new_stato); */
                    
                        
                        
                    })
                }
            
        }
    }

}

module.exports = gestore_configurazioni;