


class nuovo_piano_manager{
   
    
    constructor(){  
        this.iot = [];
    }

    async fetchnuovopiano(){
    
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
        const id_azienda=id_az.fk_azienda;

        sessionStorage.setItem("id_azienda_piano",id_azienda);

        //RITORNA GLI IOT DI UNA PROPRIETA
        let response1 = await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/device`,{
            headers: new Headers({
                'Access-Control-Allow-Origin':'no-cors',
               //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Authorization': 'Bearer '+tok, 
            })}
            );
        const IOTJson = await response1.json();
        //FINE
        if(response1.ok)
        for(let i=0; i<IOTJson.length; i++){
            if(IOTJson[i].tipo=='Attuatore') this.iot.push(new my_IOT_proprieta(IOTJson[i].id_device, IOTJson[i].mod_interazione, IOTJson[i].parametri_connessione, IOTJson[i].tipo, IOTJson[i].unita_misura, IOTJson[i].funzione, IOTJson[i].stato, IOTJson[i].manuale));
        }
       
    }

}