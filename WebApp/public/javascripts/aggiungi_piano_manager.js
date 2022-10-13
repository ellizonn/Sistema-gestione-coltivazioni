


class nuovo_piano_manager{
   
    
    constructor(){  
        this.piano = [];
    }

    async fetchnuovopiano(){
    
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

        sessionStorage.setItem("id_azienda_piano",id_azienda);
       
    }

}