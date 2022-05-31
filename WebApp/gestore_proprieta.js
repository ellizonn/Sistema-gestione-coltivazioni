"use strict";

const sqlite = require('sqlite3').verbose();

class gestore_proprieta{

    constructor(){
        this.DBSOURCE = './iserra.db';
        this.db =  new sqlite.Database(this.DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                console.log('Il Database iSerra è stato aperto con successo');
            } 
        });
    }


   //metodi del gestore

}

module.exports = gestore_proprieta;