//Da terminare



"use strict"




const proprietaContainer = document.getElementById("stato_proprieta");

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
            let all_data_of_propieta = `
                                         <div class="col">
                                            <h5>ID_proprietà</h5>
                                            <p>${info_proprieta.id_proprieta}</p> 
                                        </div>

                                        <div class="col">
                                            <h5>Nome</h5>
                                            <p>${info_proprieta.estensione_ettari}</p>
                                         </div>
            ` 
            let riga = `
            
                        <div class="row">
                            <hr>
                             ${all_data_of_propieta}
                            </hr>
                            <hr><br></hr>
                        </div>   

            ` 

            $("#stato_proprieta").append(riga);
        }

        
    }

}

class my_info_proprieta{
    constructor(id_proprieta, estensione_ettari, coltura, data_semina, posizione, tipo_proprieta, copertura_mobile){
        this.id_proprieta=id_proprieta;
        this.estensione_ettari=estensione_ettari;
        this.coltura=coltura;
        this.data_semina=data_semina;
        this.lat=lat;
        this.long=long;
        this.tipo_proprieta=tipo_proprieta;
        this.copertura_mobile=copertura_mobile;
    }
}

class visual_stato_proprieta_manager{

    constructor(){
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
        let response = await fetch(`/v1/aziende/${id}`); //Nelle parentesi graffe ci deve andare l'id dell'azienda, SISTEMARE
        const infoJson = await response.json;
        if(response.ok){
            for(let i=0; i<serJson.length; i++)
                this.info_proprieta.push(new my_info_proprieta(serJson[i].id_proprieta, serJson[i].estensione_ettari, serJson[i].coltura, serJson[i].data_semina, serJson[i].lat, serJson[i].long, serJson[i].tipo_proprieta, serJson[i].copertura_mobile));
            return this.info_proprieta;
        }
        else {
            throw infoJson;
        }
    }

}