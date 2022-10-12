class my_IOT_proprieta{

    constructor(/*id_device,*/ mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale, fk_proprieta){
        
        //this.id_device=id_device;
            //trucchetto: se mi arrivano due parametri, costruisco la risposta a stati_device
            //e pertanto il secondo parametro passato sara' in realta' lo stato del device
            if(parametri_connessione==undefined && tipo==undefined && unita_misura==undefined && funzione==undefined && stato==undefined && manuale==undefined){ 
                this.stato=mod_interazione;
            }
            else{
                this.mod_interazione=mod_interazione;
                this.parametri_connessione=parametri_connessione;
                this.tipo=tipo;
                this.unita_misura=unita_misura;
                this.funzione=funzione;
                this.stato=stato;
                this.manuale=manuale;
                this.fk_proprieta=fk_proprieta;
            }
    }
    
    }