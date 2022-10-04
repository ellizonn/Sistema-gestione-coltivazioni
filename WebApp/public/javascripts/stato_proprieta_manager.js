"use strict"

class visual_stato_proprieta_manager{

    constructor(){
        this.stato_proprieta = [];
        this.IOT_proprieta = [];
        this.ultime_misure=[];
    }

    async fetchstatoProprieta(){

        

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

                //RITORNA LISTA PROPRIETA DI UN AZIENDA
               let proprieta_info=await fetch(`/v1/aziende/${id_azienda}/proprieta`,{
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+tok, 
                })}
                );
                let app;
                const P_I=await proprieta_info.json();
                for(const P of P_I){
                    if(P.id_proprieta==kok)  app=P;
                }
                //FINE
        
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
        
        //RECUPERO LE ULTIME MISURE
        //let last_mis=
        //FINE


        if(response_id.ok && response1.ok && proprieta_info.ok){
           /*for(let i=0; i<id_az.length; i++){
                  if(id_az[i].id_proprieta == kok) { //devo comprendere solo una determinata proprieta
                      this.stato_proprieta.push(new my_stato_proprieta(id_az[i].id_proprieta, id_az[i].estensione_ettari, id_az[i].coltura, id_az[i].data_semina, id_az[i].lat, id_az[i].long, id_az[i].tipo_proprieta, id_az[i].copertura_mobile));
                     console.log(this.stato_proprieta[i]);
                     }
                 }*/
                 this.stato_proprieta.push(new my_stato_proprieta(app.id_proprieta, app.estensione_ettari, app.coltura, app.data_semina, app.lat, app.long, app.tipo_proprieta, app.copertura_mobile));
            
            for(let i=0; i<IOTJson.length; i++){
                if(IOTJson[i].tipo=='Attuatore') this.IOT_proprieta.push(new my_IOT_proprieta(IOTJson[i].id_device, IOTJson[i].mod_interazione, IOTJson[i].parametri_connessione, IOTJson[i].tipo, IOTJson[i].unita_misura, IOTJson[i].funzione, IOTJson[i].stato, IOTJson[i].manuale));
            }
        return this.stato_proprieta, this.IOT_proprieta;
        }




        else throw /*statoJson,*/ IOTJson; 
    }

}