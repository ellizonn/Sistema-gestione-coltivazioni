"use strict"

class my_stato_proprieta{

    constructor(id_proprieta,estensione_ettari,coltura,data_semina,lat,long,tipo_proprieta,copertura_mobile){
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

class my_misure{
    constructor(id_misura,data_misurazione,ora_misurazione,valore_misurato,unita_misura,fk_device){
        this.id_misura=id_misura;
        this.data_misurazione=data_misurazione;
        this.ora_misurazione=ora_misurazione;
        this.valore_misurato=valore_misurato;
        this.unita_misura=unita_misura;
        this.fk_device=fk_device;
    }

}

class my_piano{
    constructor(id_piano,condizioni_misure,attuatori_coinvolti,conseguenze,tipo_piano,umidita_min,temperatura_max,tempo_funzionamento,temperatura_da,temperatura_a,luminosita_da,luminosita_a,orario_da,orario_a){
        this.id_piano=id_piano;
        this.condizioni_misure=condizioni_misure;
        this.attuatori_coinvolti=attuatori_coinvolti;
        this.conseguenze=conseguenze;
        this.temperatura_max=temperatura_max;
        this.tempo_funzionamento=tempo_funzionamento;
        this.temperatura_da=temperatura_da;
        this.temperatura_a=temperatura_a;
        this.luminosita_da=luminosita_da;
        this.luminosita_a=luminosita_a;
        this.orario_da=orario_da;
        this.orario_a=orario_a;
        this.tipo_piano=tipo_piano;
        this.umidita_min=umidita_min;
        this.tipo_piano=tipo_piano;
        this.umidita_min=umidita_min;
    }
}