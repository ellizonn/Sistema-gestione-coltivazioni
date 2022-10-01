


class nuova_proprieta_manager{
   
    
    constructor(){  
        this.info_proprieta = [];
    }

    async fetchnuovaProprieta(){
    
        let sub=sessionStorage.getItem("chiave");
        let tok=sessionStorage.getItem("token");


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
        if(response_id.ok){
            this.info_proprieta.fk_azienda=id_azienda;
            return this.info_proprieta;
        }else {}
       
    }


    async card(){

        var myModal = new bootstrap.Modal(document.getElementById("azione_modal"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
    
        
        document.getElementById("azione_modal").addEventListener("hidePrevented.bs.modal",function(){
            document.location.reload();
        });

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

