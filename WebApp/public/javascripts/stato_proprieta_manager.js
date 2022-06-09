"use strict"

class visual_stato_proprieta_manager{

    constructor(){
        this.stato_proprieta = [];
        this.IOT_proprieta = [];
    }

    async fetchstatoProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const infoJson = await response.json();
    }

}