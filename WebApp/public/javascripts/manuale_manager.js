"use strict"

class new_manuale_manager{

    constructor(){
        this.manuale=[];

    }


    async fetchManualeProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const manJson = await response.json();
        if(response.ok){
                for(let i=0; i<manJson.length; i++){
                this.manuale.push(new my_manuale(manJson[i].id_proprieta, manJson[i].estensione_ettari, manJson[i].coltura, manJson[i].data_semina, manJson[i].lat, manJson[i].long, manJson[i].tipo_proprieta, manJson[i].copertura_mobile));
                 }
                return this.man_proprieta;
        }
        else {
            throw manJson;
        }
    }


}