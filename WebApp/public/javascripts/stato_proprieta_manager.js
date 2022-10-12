"use strict"

class visual_stato_proprieta_manager{

    constructor(){
        this.stato_proprieta = [];
        this.IOT_proprieta = [];
        this.ultime_misure=[];
        this.piano=[];
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

         //RITORNO ULTIME MISURE
    let ritorno_misure=await fetch(`/v1/aziende/${id_azienda}/proprieta/${kok}/stati_device`,{
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
        })}
        ); 
        //console.log('Sto provando le misure',ritorno_misure);
        const misure=await ritorno_misure.json();
        console.log('Sto provando le misure',misure);
         //FINE
        
        //RECUPERO LE ULTIME MISURE
        //let last_mis=
        //FINE

          //PROVA ritorna i piani di configurazione
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

    //FINE

        if(response_id.ok && response1.ok && proprieta_info.ok  && ritorno_misure.ok && prova_piani.ok){
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

            for(let i=0;i<misure.lista_stati_misure_proprieta.length;i++){
                this.ultime_misure.push(new my_misure(misure.lista_stati_misure_proprieta[i].id_misura, misure.lista_stati_misure_proprieta[i].data_misurazione, misure.lista_stati_misure_proprieta[i].ora_misurazione, misure.lista_stati_misure_proprieta[i].valore_misurato, misure.lista_stati_misure_proprieta[i].unita_misura));
            }
            //console.log('Ultime misure',this.ultime_misure);

            for(let i=0;i<prova_pianiJson.length;i++){
                this.piano.push(new my_piano(prova_pianiJson[i].attuatori_coinvolti, prova_pianiJson[i].condizioni_misure, prova_pianiJson[i].conseguenze, prova_pianiJson[i].id_piano, prova_pianiJson[i].luminosita_a, prova_pianiJson[i].luminosita_da, prova_pianiJson[i].orario_a, prova_pianiJson[i].orario_da ,prova_pianiJson[i].temperatura_a, prova_pianiJson[i].temperatura_da, prova_pianiJson[i].tempo_funzionamento, prova_pianiJson[i].tipo_piano, prova_pianiJson[i].umidita_da, prova_pianiJson[i].umidita_a));
            }
            
        return this.stato_proprieta, this.IOT_proprieta, this.ultime_misure, this.piano;
        }




        else throw /*statoJson,*/ IOTJson; 
    }

}