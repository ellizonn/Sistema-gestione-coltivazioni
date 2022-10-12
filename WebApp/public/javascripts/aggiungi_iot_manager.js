


class nuovi_iot_manager{
   
    
    constructor(){  
        this.iot = [];
    }

    async fetchnuoviIOT(){
    
        let sub=sessionStorage.getItem("chiave");
        let tok=sessionStorage.getItem("token");

        //trovo id azienda
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
        sessionStorage.setItem("azienda_id",id_azienda);
        //fine

/*
        //RITORNO IL NUMERODEGLI IOT INSTALLATI
       // /v1/aziende/:id_azienda/proprieta/:id_propr/device
       let id_prop=sessionStorage.getItem("id_prop");
        let n_iot_cont = await fetch(`/v1/aziende/${id_azienda}/proprieta/${id_prop}/device`,{
            headers: new Headers({
                'Access-Control-Allow-Origin':'no-cors',
               //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Authorization': 'Bearer '+tok, 
            })}
            ); 
            //let result=await n_iot_cont.json();
            console.log(n_iot_cont.length)
            //sessionStorage.setItem("n",);
        //FINE */

        /*
        //trovo id proprieta
       // /v1/aziende/:id_azienda/proprieta
       let response_elenco_prop = await fetch(`/v1/aziende/${id_azienda}/proprieta`,{
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
        })}
        ); 
        const id_prop=await response_elenco_prop.json();
        let max_id=id_prop[0];
        for(const id of id_prop){
            if(id>max_id) max_id=id;
        }
        sessionStorage.setItem("id_prop",max_id);
        //fine
        */

        /*
        if(response_id.ok){
            this.info_proprieta.fk_azienda=id_azienda;
            return this.info_proprieta;
        }else {}*/
       
    }

}