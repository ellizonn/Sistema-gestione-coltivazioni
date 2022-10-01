"use strict"

class elimina_manager{

    constructor(){
        this.elimina= [];
    }

    async fetchEliminaIOT(){

        
        let response1 = await fetch(`/v1/aziende/${1}/proprieta/${1}/device`);
        const IOTJson = await response1.json();
        if(response1.ok){
            for(let i=0; i<IOTJson.length; i++){
                this.elimina.push(new my_elimina(IOTJson[i].id_device, IOTJson[i].mod_interazione, IOTJson[i].parametri_connessione, IOTJson[i].tipo, IOTJson[i].unita_misura, IOTJson[i].funzione, IOTJson[i].stato, IOTJson[i].manuale))
                console.log(this.elimina[i]);
            }
        return  this.elimina;
        }
        else throw IOTJson;
    }

    async eliminaDispositivo(elimina){

        let response = await fetch(`/v1/aziende/${1}/proprieta/${1}/device/${3}`, {  //Stesso discorso del passaggio dei valori, qui funziona l'eliminazione
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(elimina),
        });

        //inizio conferma di avvenuta disdetta (modal)
        var myModal = new bootstrap.Modal(document.getElementById("modalElimina"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
        //document.getElementById("medico").innerText += medico;
        //document.getElementById("data").innerText += data;

        document.getElementById("chiudimi").addEventListener("click", function(){
            document.location.reload();
        });
        
        document.getElementById("modalDisdetta").addEventListener("hidePrevented.bs.modal",function(){
            document.location.reload();
        });
        //fine conferma

        if(response.ok){
            
            return;
        }
        else{
            try{
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err){
                if(Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Errore: ${errors}`;
                }
                else
                    throw 'Errore: non riesco a parsificare la risposta del server';
            }
        }


    }

}