


class elimina_proprieta_manager{
   
    
    constructor(){  
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
    
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
        const id_azienda=id_az.fk_azienda; //Id dell'azienda dove lavora
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
                for(let i=0; i<infoJson.length; i++){
                this.info_proprieta.push(new my_info_proprieta_elimina(infoJson[i].id_proprieta,id_azienda));
                 }
                return this.info_proprieta;
        }

        else {
            throw infoJson;
        } 
    }

    async eliminaProprieta(){

     //   /v1/aziende/:id_azienda/proprieta/:id_propr

     let az=sessionStorage.getItem("id_elimina_az");
     let prop=sessionStorage.getItem("id_elimina_pr");

     let elim_prop=await fetch (`/v1/aziende/${az}/proprieta/${prop}`,{
        method:'DELETE',
    }); 

        console.log(elim_prop);
            if(elim_prop.ok) window.location.href = 'Elimina_proprieta.html';
            else throw elim;

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
