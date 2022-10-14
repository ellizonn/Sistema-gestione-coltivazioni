


class elimina_piano_manager{
   
    
    constructor(){  
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
    /   ///v1/aziende/:id_azienda/proprieta/:id_propr/piani
        let sub=sessionStorage.getItem("chiave");
        let tok=sessionStorage.getItem("token");
        let kok=sessionStorage.getItem("elenco");


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
        const id_azienda=id_az.fk_azienda; //Id dell'azienda dove lavora
        sessionStorage.setItem("per_elimina_piano_id_azienda",id_azienda); //per eliminare un piano di conf

      //ritorna i piani di configurazione
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
        //console.log("provo la stampa dei piani",prova_pianiJson);

    //FINE

        
        if(prova_piani.ok){
                for(let i=0; i<prova_pianiJson.length; i++){
                this.info_proprieta.push(new my_piano(prova_pianiJson[i].id_piano,kok));
                 }
            //     console.log(this.info_proprieta);
                return this.info_proprieta;
        }

        else {
            throw infoJson;
        } 
    }

    async eliminaPiano(){

      //  /v1/aziende/:id_azienda/proprieta/:id_propr/piani/:id_piano

     let pia=sessionStorage.getItem("id_elimina_piano");
     let prop=sessionStorage.getItem("id_elimina_pr");
     let tok=sessionStorage.getItem("token");
     let id_az=sessionStorage.getItem("per_elimina_piano_id_azienda");
     //console.log("id_az",id_az);
        console.log(pia);
     let elim_piano=await fetch (`/v1/aziende/${id_az}/proprieta/${prop}/piani/${pia}`,{
        method:'DELETE',
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
          })});

        //console.log(elim_piano);
            if(elim_piano.ok) window.location.href = 'Elimina_piano.html';
            else throw elim_piano;
            

    }

 /*   async card(){

        var myModal = new bootstrap.Modal(document.getElementById("azione_modal"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
    
        
        document.getElementById("azione_modal").addEventListener("hidePrevented.bs.modal",function(){
            document.location.reload();
        });
        
        return a;

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
        } */
   // }

}