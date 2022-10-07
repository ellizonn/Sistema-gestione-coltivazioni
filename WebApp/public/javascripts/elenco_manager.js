


class visual_elenco_proprieta_manager{
   
    
    constructor(){  
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
    
            //console.log(JSON.stringify(Keycloak));
          let sub=sessionStorage.getItem("chiave");
          let tok=sessionStorage.getItem("token");
          
         
          
            
            //console.log(Keycloak.realmAccess.roles[0]);


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
        const id_azienda=id_az.fk_azienda;
       let response = await fetch(`/v1/aziende/${id_azienda}/proprieta`,{
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
          })}
          
        );



        const infoJson = await response.json();
        if(response.ok){
                var recupero_id = []; //per tenere traccia degli id_proprieta
                for(let i=0; i<infoJson.length; i++){
                this.info_proprieta.push(new my_info_proprieta(infoJson[i].id_proprieta, infoJson[i].estensione_ettari, infoJson[i].coltura, infoJson[i].data_semina, infoJson[i].lat, infoJson[i].long, infoJson[i].tipo_proprieta, infoJson[i].copertura_mobile));
                recupero_id[i]=infoJson[i].id_proprieta;
                 }
                return this.info_proprieta;
        }

        else {
            throw infoJson;
        } 

    
    }


    async card(){
        
        var myModal = new bootstrap.Modal(document.getElementById("azione_modal"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
        
        let c=document.getElementsByClassName("pippo");
        console.log(c);
        
        
        document.getElementById("azione_modal").addEventListener("hidePrevented.bs.modal",function(){
            
            document.location.reload();
        });
        
        

    /*    if(response.ok){
            
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
    }


   
}



