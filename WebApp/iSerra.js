"use strict";


//const sqlite = require('sqlite3').verbose();
//const bcrypt = require('bcrypt');

class iSerra{

    constructor(){
        /*this.DBSOURCE = './db.db';
        this.db =  new sqlite.Database(this.DBSOURCE, (err) => {
            if (err) {
                //non si riesce ad aprire il db
                console.err(err.message);
                throw err;
            }
            else{
                console.log('Il Database iSerra è stato aperto con successo');
            } 
        });*/
        console.log('Il Database iSerra è stato aperto con successo');
    }

}

module.exports = iSerra;