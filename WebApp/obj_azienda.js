"use strict";

class obj_azienda{

    constructor(id_azienda,via,citta,CAP,civico,nomeaz,piva){
        this.id_azienda=id_azienda;
        this.via=via;
        this.citta=citta;
        this.CAP=CAP;
        this.civico=civico;
        this.nomeaz=nomeaz;
        this.piva=piva;
    }

}

module.exports = obj_azienda;