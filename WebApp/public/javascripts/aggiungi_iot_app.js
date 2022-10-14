"use strict"

class nuovi_iot_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.nuovi_manager = new nuovi_iot_manager();
        this.iot = this.nuovi_manager.iot;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.nuovi_manager.fetchnuoviIOT().then(() => {
                        
                        this.iot = this.nuovi_manager.iot;
                        this.show1Proprieta(this.iot);
                });
                }
            }); 

    }


    show1Proprieta(iot){

        let n_iot=sessionStorage.getItem("n_IOT"); //N di iot da fare la PUT preso da aggiungi proprieta
      // per non farlo inviare prima che sia tutto a posto
      //sessionStorage.setItem("id_azienda",info_proprieta.fk_azienda);
      
      var z = document.createElement('div'); // is a node
      z.innerHTML = `
      <div class="row" style="border-left:50%,border-right:10%">
      <form encType="multipart/form-data" id="form_iot" class="row g-3"> 
        <div class="col-md-6">
          <label for="mod_interazione" class="form-label">Modalita' interazione</label>
          <input type="text" class="form-control" name="mod_interazione" id="mod_interazione" placeholder="mqtt" required>
        </div>
        <div class="col-md-6">
          <label for="parametri_connessione" class="form-label">Parametri connessione</label>
          <input type="text" class="form-control" id="parametri_connessione" placeholder="pass013" required>
        </div>
        <div class="col-md-6">
          <label for="tipo" class="form-label">Tipo</label>
          <select id="tipo" class="form-select" required>
          <option selected>Scegli...</option>
          <option>Attuatore</option>
          <option>Sensore</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="unita_misura" class="form-label">Unita' di misura</label>
          <select id="unita_misura" class="form-select" required>
          <option selected>Scegli...</option>
          <option>°C</option>
          <option>lx</option>
          <option>%</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="funzione" class="form-label">Funzione</label>
          <select id="funzione" class="form-select" required>
          <option selected>Scegli...</option>
          <option>Temperatura</option>
          <option>Luminosità</option>
          <option>Umidità</option>
          </select>
        </div>
        <div class="col-12">
          <input class="form-check-input" type="checkbox" id="gridCheck" required>
          <label class="form-check-label" for="gridCheck">
          Trattamento dati dispositivo IoT
          </label>
        </div>
        <div class="col-12">
        <button type="submit" class="btn btn-primary">Aggiungi altro IoT</button>
      </div>
      <div class="col-12">
      <button type="button" class="btn btn-secondary" onclick="location.href='Visualizza_elenco_proprieta.html'">Non aggiungi altri IoT</button>
      </div>
      </form>
      </div>



   `;
   /*  
        <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Aggiungi
      </button>*/

      var h = document.getElementById('form-aggiungi-iot');
      h.appendChild(z);
     

      const form=document.getElementById('form_iot');
      
      

      form.addEventListener('submit',(async function(e){

        e.preventDefault();
/*
        const N_IOT={ dispo:{
                             n_IOT:docuemnt.getElementById('n_IOT').value
                            }
                    }
        console.log("Numero dispositivi IOT: ",N_IOT);*/
        let id_azienda=sessionStorage.getItem("azienda_id"); //id dell'azienda
        let id_proprieta=sessionStorage.getItem("id_prop"); //id proprieta
        const iot={
          device:{
            mod_interazione:document.getElementById('mod_interazione').value,
            parametri_connessione:document.getElementById('parametri_connessione').value,
            tipo:document.getElementById('tipo').value,
            unita_misura:document.getElementById('unita_misura').value,
            funzione:document.getElementById('funzione').value,
            stato:'1',
            manuale:'0',
            fk_proprieta:id_proprieta 
          }
        }
        //sessionStorage.setItem("n_IOT",propr.proprieta.n_iot); //PRENDO IL N DI IOT CHE DEVO INSERIRE DA QUA
        
        //const propr='"estensione_ettari": 75,"coltura": "girasole","data_semina": "2022-07-10","lat": 150,"long": 12,"tipo_proprieta": "campo","copertura_mobile": false,"fk_azienda":2';
        let tok=sessionStorage.getItem("token");
    
        let response1 =  await fetch(`/v1/aziende/${id_azienda}/proprieta/${id_proprieta}/device`,{
          method: 'POST',
          /*body: JSON.stringify({
            proprieta:propr,
        FUNGE
          }),*/
          body: JSON.stringify(iot),
          headers: new Headers({
           // 'Access-Control-Allow-Origin':'no-cors',
           'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
            'Content-Type': 'application/json',
          }),
        }
          ).then(data => {
             //return data.json();
            })
            .then(post => {
             //console.log(post.title);
            });;
            
          /*  if(c) window.location.href="Aggiungi_iot.html";
           else */window.location.href="Aggiungi_iot.html";
      }));

       












    }
  }