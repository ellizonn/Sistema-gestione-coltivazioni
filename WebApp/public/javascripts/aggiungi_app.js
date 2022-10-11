"use strict"

class nuova_proprieta_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.nuova_manager = new nuova_proprieta_manager();
        this.info_proprieta = this.nuova_manager.info_proprieta;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.nuova_manager.fetchnuovaProprieta().then(() => {
                        
                        this.info_proprieta = this.nuova_manager.info_proprieta;
                        this.show1Proprieta(this.info_proprieta);
                });
                }
            }); 

    }


    show1Proprieta(info_proprieta){
      

      // per non farlo inviare prima che sia tutto a posto
      sessionStorage.setItem("id_azienda",info_proprieta.fk_azienda);
      
      var z = document.createElement('div'); // is a node
      z.innerHTML = `
      <div class="row" style="border-left:50%,border-right:10%">
      <form encType="multipart/form-data" id="form_proprieta" class="row g-3"> 
        <div class="col-md-6">
          <label for="estensione_ettari" class="form-label">Estensione ettari</label>
          <input type="text" class="form-control" name="estensione_ettari" id="estensione_ettari" placeholder="Inserire..." required>
        </div>
        <div class="col-md-6">
          <label for="inputColtura" class="form-label">Coltura</label>
          <input type="text" class="form-control" id="coltura" placeholder="Inserire..." required>
        </div>
        <div class="col-md-6">
          <label for="inputData" class="form-label">Data semina</label>
          <input type="date" class="form-control" id="data_semina" required>
        </div>
        <div class="col-md-6">
          <label for="inputTipo" class="form-label">Tipo proprieta'</label>
          <select id="tipo_proprieta" class="form-select" required>
          <option selected>Scegli...</option>
          <option>Campo</option>
          <option>Serra</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="inputLat" class="form-label">Latitudine</label>
          <input type="text" class="form-control" id="lat" placeholder="0" required>
        </div>
        <div class="col-md-6">
          <label for="inputLong" class="form-label">Longitudine</label>
          <input type="text" class="form-control" id="long" placeholder="0" required>
        </div>
          <center>
        <div class="col-md-6">
          <label for="inputCopertura" class="form-label">Copertura mobile</label>
          <select id="copertura_mobile" class="form-select" required>
          <option selected>Scegli...</option>
          <option>1</option>
          <option>0</option>
          </select>
        </div>
          </center>
        <div class="col-12">
          <input class="form-check-input" type="checkbox" id="gridCheck" required>
          <label class="form-check-label" for="gridCheck">
          Trattamento dati proprieta'
          </label>
        </div>
        <div class="col-12">
        <button type="submit" class="btn btn-primary">Aggiungi</button>
        </div>
      </form>
      </div>

   `;

      var h = document.getElementById('form-aggiungi');
      h.appendChild(z);
     

      const form=document.getElementById('form_proprieta');
      
      
      form.addEventListener('submit',(async function(e){
        e.preventDefault()
        const propr={
          proprieta:{
            estensione_ettari:document.getElementById('estensione_ettari').value,
            coltura:document.getElementById('coltura').value,
            data_semina:document.getElementById('data_semina').value,
            tipo_proprieta:document.getElementById('tipo_proprieta').value,
            lat:document.getElementById('lat').value,
            long:document.getElementById('long').value,
            copertura_mobile:document.getElementById('copertura_mobile').value,
            fk_azienda:info_proprieta.fk_azienda
          }
        }
        console.log(propr);
        var name=document.getElementById('estensione_ettari').value
        //const propr='"estensione_ettari": 75,"coltura": "girasole","data_semina": "2022-07-10","lat": 150,"long": 12,"tipo_proprieta": "campo","copertura_mobile": false,"fk_azienda":2';
        let tok=sessionStorage.getItem("token");
        let response1 =  await fetch(`/v1/aziende/${info_proprieta.fk_azienda}/proprieta`,{
          method: 'POST',
          /*body: JSON.stringify({
            proprieta:propr,
        FUNGE
          }),*/
          body: JSON.stringify(propr),
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
   
            window.location.href="Visualizza_elenco_proprieta.html";
      }));

       












    }
  }



