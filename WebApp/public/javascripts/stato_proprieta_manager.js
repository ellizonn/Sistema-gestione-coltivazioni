"use strict"

class visual_stato_proprieta_manager{

    constructor(){
        this.stato_proprieta = [];
        this.IOT_proprieta = [];
    }

    async fetchstatoProprieta(){


        Keycloak = new Keycloak();
        //{onLoad:'check-sso'}
              await Keycloak.init({onLoad:'login-required'}).then(function(authenticated) {
                //alert(authenticated ? 'authenticated' : 'not authenticated');
            }).catch(function() {
                //alert('failed to initialize');
            });

            let response_id = await fetch(`/v1/azienda_user/${Keycloak.subject}`,{
                headers: new Headers({
                    'Access-Control-Allow-Origin':'no-cors',
                   //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Authorization': 'Bearer '+Keycloak.token, 
                })}
                ); 
                console.log(Keycloak);
                const id_az = await response_id.json();
                const id_azienda=id_az.fk_azienda;  //id azienda ce l'ho


        
    /*    let response1 = await fetch(`/v1/aziende/${id_azienda}/proprieta/${1}/device`);
        const IOTJson = await response1.json();
        if(response.ok && response1.ok){
            for(let i=0; i<statoJson.length; i++){
                  if(statoJson[i].id_proprieta == 1) { //devo cprendere solo una determinata proprieta
                      this.stato_proprieta.push(new my_stato_proprieta(statoJson[i].id_proprieta, statoJson[i].estensione_ettari, statoJson[i].coltura, statoJson[i].data_semina, statoJson[i].lat, statoJson[i].long, statoJson[i].tipo_proprieta, statoJson[i].copertura_mobile));
                     console.log(this.stato_proprieta[i]);
                     }
                 }
            for(let i=0; i<IOTJson.length; i++){
                this.IOT_proprieta.push(new my_IOT_proprieta(IOTJson[i].id_device, IOTJson[i].mod_interazione, IOTJson[i].parametri_connessione, IOTJson[i].tipo, IOTJson[i].unita_misura, IOTJson[i].funzione, IOTJson[i].stato, IOTJson[i].manuale))
                console.log(this.IOT_proprieta[i]);
            }
        return this.stato_proprieta, this.IOT_proprieta;
        }
        else throw statoJson, IOTJson; */
    }

}