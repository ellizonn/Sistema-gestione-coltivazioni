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
            
            this.proprietaContainer.append(div); 
     }
    }



}
