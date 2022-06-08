"use strict"

class visual_elenco_proprieta_manager{

    constructor(){
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const infoJson = await response.json();
        if(response.ok){
                 console.log("Sono qui");
                for(let i=0; i<infoJson.length; i++){
                this.info_proprieta.push(new my_info_proprieta(infoJson[i].id_proprieta, infoJson[i].estensione_ettari, infoJson[i].coltura, infoJson[i].data_semina, infoJson[i].lat, infoJson[i].long, infoJson[i].tipo_proprieta, infoJson[i].copertura_mobile));
                console.log(this.info_proprieta[i]);
                 }
                return this.info_proprieta;
        }
        else {
            throw infoJson;
        }
    }

}