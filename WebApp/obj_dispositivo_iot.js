"use strict"

class obj_dispositivo_iot {

    constructor(id_device, mod_interazione, parametri_connessione, tipo, unita_misura, funzione, stato, manuale) {
        this.id_device=id_device;
        this.mod_interazione=mod_interazione;
        this.parametri_connessione=parametri_connessione;
        this.tipo=tipo;
        this.unita_misura=unita_misura;
        this.funzione=funzione;
        this.stato=stato;
        this.manuale=manuale;
    }

}

module.exports = obj_dispositivo_iot;