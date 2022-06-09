"use strict"

class visual_stato_proprieta_manager{

    constructor(){
        this.stato_proprieta = [];
        this.IOT_proprieta = [];
    }

    async fetchstatoProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const statoJson = await response.json();
        let response1 = await fetch(`/v1/aziende/${1}/proprieta/${1}/device`);
        const IOTJson = await response1.json();
        if(response.ok && response1.ok){
            for(let i=0; i<statoJson.length; i++){
                  if(statoJson[i].id_proprieta == 1) { //devo cprendere solo una determinata proprieta
                      this.stato_proprieta.push(new my_stato_proprieta(statoJson[i].id_proprieta, statoJson[i].estensione_ettari, statoJson[i].coltura, statoJson[i].data_semina, statoJson[i].lat, statoJson[i].long, statoJson[i].tipo_proprieta, statoJson[i].copertura_mobile));
                     console.log(this.stato_proprieta[i]);
                     }
                 }
            for(let i=0; i<IOTJson.length; i++){
                this.IOT_proprieta.push(new my_IOT_proprieta(IOTJson[i].id_device, IOTJson[i].mod_interazione, IOTJson[i].parametri_connessione, IOTJson[i].tipo, IOTJson[i].unita_misura, IOTJson[i].funzione, IOTJson[i].stato, IOTJson[i].manuale))
                console.log(this.IOT_proprieta[i]);
            }
        return this.stato_proprieta, this.IOT_proprieta;
        }
        else throw statoJson, IOTJson;
    }

}