"use strict"

class elimina_manager{

    constructor(){
        this.elimina= [];
    }

    async fetchEliminaIOT(){

        let sub=sessionStorage.getItem("chiave");
        let tok=sessionStorage.getItem("token");
        let kok=sessionStorage.getItem("elenco");
       

        //TROVA L'ID DELL'AZIENDA IN CUI LAVORA L'UTENTE
        let response_id = await fetch(`/v1/azienda_user/${sub}`,{
            headers: new Headers({
                'Access-Control-Allow-Origin':'no-cors',
               //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Authorization': 'Bearer '+tok, 
            })}
            ); 
            const id_az = await response_id.json();
            const id_azienda=id_az.fk_azienda;  //id azienda ce l'ho
    //FINE
        
        let response1 = await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/device`);
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

    async eliminaDispositivo(){

        let el=sessionStorage.getItem("id_elimina");
        console.log('ELIMINA', el);
/*
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


    */}

}