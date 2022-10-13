class my_piano{
    constructor(condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_da,umidita_a,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a,fk_proprieta,fk_utente){
       // this.id_piano=id_piano;
        this.condizioni_misure=condizioni_misure;
        this.attuatori_coinvolti=attuatori_coinvolti;
        this.conseguenze=conseguenze;
        this.tipo_piano=tipo_piano; 
        this.umidita_da=umidita_da;
        this.umidita_a=umidita_a;  
        this.tempo_funzionamento=tempo_funzionamento;
        this.temperatura_da=temperatura_da;
        this.temperatura_a=temperatura_a;
        this.luminosita_da=luminosita_da;
        this.luminosita_a=luminosita_a;
        this.orario_da=orario_da;
        this.orario_a=orario_a;
        this.fk_proprieta=fk_proprieta;
        this.fk_utente=fk_utente;
    }
}

class my_IOT_proprieta{

    constructor(id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale){
        
        this.id_device=id_device;
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
            }
    }
    
    }