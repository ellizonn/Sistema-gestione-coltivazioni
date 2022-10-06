"use strict"

class nuova_proprieta_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.nuova_manager = new nuova_proprieta_manager();
        this.info_proprieta = this.nuova_manager.info_proprieta;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.nuova_manager.fetchnuovaProprieta().then(() => {
                        
                        this.info_proprieta = this.nuova_manager.info_proprieta;
                        this.show1Proprieta(this.info_proprieta);
                });
                }
            }); 

    }


    show1Proprieta(info_proprieta){
      

      // per non farlo inviare prima che sia tutto a posto
      sessionStorage.setItem("id_azienda",info_proprieta.fk_azienda);
      //console.log(info_proprieta.fk_azienda);
     
  

      //Qui bisogna aggiungere l'aggiunta dei dispositivi
        }
       
    }



