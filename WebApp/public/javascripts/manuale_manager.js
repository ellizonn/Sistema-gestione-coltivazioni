"use strict"

class new_manuale_manager{

    constructor(){
        this.manuale=[];

    }


    async fetchManualeProprieta(){


        let sub=sessionStorage.getItem("chiave");//variabile keycloak
        let kok=sessionStorage.getItem("elenco"); //id proprieta
        let tok=sessionStorage.getItem("token"); //token

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

            sessionStorage.setItem("id_az",id_azienda);
    //FINE

    //PROVA ritorna i piani di configurazione
    /*
    let prova_piani=await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/piani`,{
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
        })}
        ); 
        const prova_pianiJson=await prova_piani.json();
        console.log("provo la stampa dei piani",prova_pianiJson);
        */
    //FINE
    
    //PROVA il ritorno misure
    /*
    let prova_misure=await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/stati_device`,{
     
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
        })}
        ); 
        //console.log('Sto provando le misure',prova_misure);
        const prova=await prova_misure.json();
        console.log('Sto provando le misure',prova.lista_stati_misure_proprieta);
        */
    //FINE

        let response = await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/device`,{
     
            headers: new Headers({
                'Access-Control-Allow-Origin':'no-cors',
               //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Authorization': 'Bearer '+tok, 
            })}
            ); 
        const manJson = await response.json();
        if(response.ok){
                for(let i=0; i<manJson.length; i++){
                    //console.log("manJson",manJson[i]);
                    if(manJson[i].tipo=='Attuatore') this.manuale.push(new my_manuale(manJson[i].id_device, manJson[i].mod_interazione, manJson[i].parametri_connessione, manJson[i].tipo, manJson[i].unita_misura, manJson[i].funzione, manJson[i].stato, manJson[i].manuale));
                 }
                return this.manuale;
        }
        else {
            throw manJson;
        }
    }



    async C_stato(){ //cambia stato

        //'/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?stato={1;0}'

        let id_dev=sessionStorage.getItem("device_id"); //ID DEVICE
        let id_azi=sessionStorage.getItem("id_az"); //ID AZIENDA
        let kok=sessionStorage.getItem("elenco"); //ID PROPRIETA
        let stato_dev=sessionStorage.getItem("stato"); //STATO DEVICE
        let tok=sessionStorage.getItem("token"); // TOKEN
        let man_dev=sessionStorage.getItem("manuale");
        
        //if(man_dev==0){
        if(stato_dev==1){
            //CAMBIO LO STATO A 0
            let zero=0;
            let result_of_change_stato=await fetch (`/v1/aziende/${id_azi}/proprieta/${kok}/device/${id_dev}/stato/${zero}`,{
                method:'PUT',
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+tok, 
                })}
                ); 
                window.location.href = 'Gestione_manuale_attuatori.html';
                console.log(result_of_change_stato);
                if(result_of_change_stato.ok) window.location.href = 'Gestione_manuale_attuatori.html';
                else throw result_of_change_stato;
        }else{
            //CAMBIO LO STATO A 1
            let uno=1;
            let result_of_change_stato=await fetch (`/v1/aziende/${id_azi}/proprieta/${kok}/device/${id_dev}/stato/${uno}`,{
                method:'PUT',
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+tok, 
                })}
                ); 
                window.location.href = 'Gestione_manuale_attuatori.html';
                console.log(result_of_change_stato);
                if(result_of_change_stato.ok) window.location.href = 'Gestione_manuale_attuatori.html';
                else throw result_of_change_stato;
        }
        //}

        //console.log('sono in manager stato ',id);
    }

    
    async C_manuale(){ //cambia manuale


        //'/v1/aziende/:id_azienda/proprieta/:id_propr/device/:id_device/?manuale={1;0}'

        let id_dev=sessionStorage.getItem("device_id"); //ID DEVICE
        let id_azi=sessionStorage.getItem("id_az"); //ID AZIENDA
        let kok=sessionStorage.getItem("elenco"); //ID PROPRIETA
        let man_dev=sessionStorage.getItem("manuale"); //MANUALE DEVICE
        let tok=sessionStorage.getItem("token"); // TOKEN

        if(man_dev==0){
            //CAMBIO MANUALE A 1
            let uno=1;
            let result_of_change_man=await fetch(`/v1/aziende/${id_azi}/proprieta/${kok}/device/${id_dev}/manuale/${uno}`,{
                method:'PUT',
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+tok, 
                })}
                ); 
                window.location.href = 'Gestione_manuale_attuatori.html';
                let a=await result_of_change_man.json();
                
                if(result_of_change_man.ok) window.location.href = 'Gestione_manuale_attuatori.html';
                else throw result_of_change_man;
        }else {
            //CAMBIO MANUALE A 0
            let zero=0;
            let result_of_change_man=await fetch(`/v1/aziende/${id_azi}/proprieta/${kok}/device/${id_dev}/manuale/${zero}`,{
                method:'PUT',
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'PUT',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+tok, 
                })}
                ); 
                window.location.href = 'Gestione_manuale_attuatori.html';
                if(result_of_change_man.ok) window.location.href = 'Gestione_manuale_attuatori.html';
                else throw result_of_change_man;
        }
    }

}