"use strict"

class visual_elenco_proprieta_manager{

    constructor(){
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const infoJson = await response.json();
        if(response.ok){
                var recupero_id = []; //per tenere traccia degli id_proprieta
                for(let i=0; i<infoJson.length; i++){
                this.info_proprieta.push(new my_info_proprieta(infoJson[i].id_proprieta, infoJson[i].estensione_ettari, infoJson[i].coltura, infoJson[i].data_semina, infoJson[i].lat, infoJson[i].long, infoJson[i].tipo_proprieta, infoJson[i].copertura_mobile));
                recupero_id[i]=infoJson[i].id_proprieta;
                 }
                return this.info_proprieta;
        }
        else {
            throw infoJson;
        }
    }

    async card(){

        var myModal = new bootstrap.Modal(document.getElementById("azione_modal"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
    
        
        document.getElementById("azione_modal").addEventListener("hidePrevented.bs.modal",function(){
            document.location.reload();
        });

        if(response.ok){
            
            return;
        }
        else{
            try{
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err){
                if(Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Errore: ${errors}`;
                }
                else
                    throw 'Errore: non riesco a parsificare la risposta del server';
            }
        }
    }

}
