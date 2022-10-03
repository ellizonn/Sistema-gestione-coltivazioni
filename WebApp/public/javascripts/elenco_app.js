"use strict"

class visual_elenco_proprieta_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.visual_manager = new visual_elenco_proprieta_manager();
        this.info_proprieta = this.visual_manager.info_proprieta;
        
        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.visual_manager.fetchinfoProprieta().then(() => {
                        
                        this.info_proprieta = this.visual_manager.info_proprieta;
                        this.showProprieta(this.info_proprieta);
                });
                }
            }); 

    }


    showProprieta(info_proprieta){

        const pippo= document.getElementById("elenco_proprieta");


        for(const info of info_proprieta){  
      /*  let all_data_of_propieta = `
                                <div class="card">
                                    <div class="card-body">
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#azione_modal">
                                            ${info.id_proprieta}
                                        </button>
                                    </div>
                                </div>
                             `;*/
           
           /*
            const div = document.createElement("div");
            div.className = "card";
            
            
              const div1 = document.createElement("div");
                div.appendChild(div1)
                div1.className = "card-body";
                const a = document.createElement("a");
                a.className="pippo";
                div1.appendChild(a);
                a.toggleAttribute = "modal";
                a.textContent = info.id_proprieta;
                a.id=info.id_proprieta;
                a.addEventListener("click",this.visual_manager.card,false);
            
            this.proprietaContainer.append(div); */

           let a= `<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${info.id_proprieta}
                </button>
                    <ul class="dropdown-menu">
                        <li><a id="id_scelta" class="dropdown-item" href="Visualizza_stato_proprieta.html" onClick="crea(${info.id_proprieta})">Visualizza stato proprieta'</a></li>
                        <li><a id="id_scelta"  class="dropdown-item" href="Gestione_manuale_attuatori.html" onClick="crea(${info.id_proprieta})">Gestione manuale attuatori</a></li>
                        <li><a id="id_scelta" class="dropdown-item" href="Pianificazione_attuatori_proprieta.html" onClick="crea(${info.id_proprieta})">Pianificazione attuatori proprieta'</a></li>
                        <li><a id="id_scelta"  class="dropdown-item" href="Elimina_IoT_devices.html" onClick="crea(${info.id_proprieta})">Elimina IoT devices</a></li>
                    </ul>
            </div> <hr>`;

            
            pippo.innerHTML+=a;


            
     }
    }



}
