"use strict"

const proprietaContainer = document.getElementById("");

let app = new visual_stato_proprieta_app(proprietaContainer);

class visual_stato_proprieta_app{
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.visual_stato_proprieta_manager = new my_info_proprieta();
        this.info_proprieta = this.visual_stato_proprieta_manager.info_proprieta;


        (async function(){
           this.visual_stato_proprieta_manager.fetchinfoProprieta().then(()=>{
               this.info_proprieta = this.visual_stato_proprieta_manager.info_proprieta;
               this.showinfo(this.info_proprieta);  //FARE SHOW INFO
           });
        })
    }

    showinfo(info_proprieta){
        if(info_proprieta.length == 0){

        }
        
    }

}

class my_info_proprieta{
    constructor(){

    }
}

class visual_stato_proprieta_manager{

    constructor(){
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
        let response = await fetch('');
        const infoJson = await response.json;
        if(response.ok){
            //costrisco l'oggetto che mi interessa
            return this.info_proprieta;
        }
        else {
            throw infoJson;
        }
    }

}