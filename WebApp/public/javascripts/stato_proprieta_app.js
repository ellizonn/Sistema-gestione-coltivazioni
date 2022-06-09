"use strict"

class visual_stato_proprieta_app{
    constructor(statoContainer){
        this.statoContainer = statoContainer;
        this.stato_manager = new visual_stato_proprieta_manager();
        this.stato_proprieta = this.stato_manager.stato_proprieta; //per info proprieta
        this.IOT_proprieta = this.stato_manager.IOT_proprieta; // per IOT

        //controllo tipo utente

        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    this.stato_manager.fetchstatoProprieta().then(() => {
                        this.stato_proprieta = this.stato_manager.stato_proprieta;
                        this.IOT_proprieta = this.stato_manager.IOT_proprieta;
                        this.showstatoProprieta(this.stato_proprieta, this.IOT_proprieta);
                });
                }
            }); 

    }

    showstatoProprieta(stato_proprieta, IOT_proprieta){

    }
}