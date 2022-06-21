"use strict"

class new_manuale_manager{

    constructor(){
        this.manuale=[];

    }


    async fetchManualeProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta/${1}/device`);
        const manJson = await response.json();
        if(response.ok){
                for(let i=0; i<manJson.length; i++){
                this.manuale.push(new my_manuale(manJson[i].id_device, manJson[i].mod_interazione, manJson[i].parametri_connessione, manJson[i].tipo, manJson[i].unita_misura, manJson[i].funzione, manJson[i].stato, manJson[i].manuale));
                 }
                return this.manuale;
        }
        else {
            throw manJson;
        }
    }


}