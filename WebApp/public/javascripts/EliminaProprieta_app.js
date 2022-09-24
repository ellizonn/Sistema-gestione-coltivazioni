"use strict"

class elimina_proprieta_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.elimina_manager = new elimina_proprieta_manager();
        this.info_proprieta = this.elimina_manager.info_proprieta;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.elimina_manager.fetchinfoProprieta().then(() => {
                        
                        this.info_proprieta = this.elimina_manager.info_proprieta;
                        this.showProprieta(this.info_proprieta);
                });
                }
            }); 

    }


   async  showProprieta(info_proprieta){
    
        if(info_proprieta.length !=0){

        for(const info of info_proprieta){  
           // console.log(info.id_proprieta, info.id_azienda);

            let x =            ` <div class="col">
                                    <h5>Id proprieta'</h5>
                                    <p>${info.id_proprieta}</p>
                                  </div>

                                 <div class="col">
                                    <h5>ID azienda</h5>
                                    <p>${info.id_azienda}</p>
                                 </div>
                                 `;
                                 

            let elimina = ` 
                                 <div class="col">
                                  <h5>Elimina</h5>
                                  <svg id="${info.id_azienda}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                </div>
                            `;

           let riga = `<div class="row">
                        <hr>
                        ${x}
                        ${elimina}
                        </hr>
                        <hr><br></hr>
                        </div>
                             `;
            

       // let z=document.getElementById('elimina-proprieta');
        //z.append(riga);
        $('#elimina-proprieta').append(riga);
     }
    } else { }
    }



}