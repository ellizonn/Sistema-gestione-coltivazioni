"use strict"

class obj_misura {

    constructor(id_misura, data_misurazione, ora_misurazione, valore_misurato, unita_misura) {
        this.id_misura=id_misura;
        this.data_misurazione=data_misurazione;
        this.ora_misurazione=ora_misurazione;
        this.valore_misurato=valore_misurato;
        this.unita_misura=unita_misura;
    }

}

module.exports = obj_misura;