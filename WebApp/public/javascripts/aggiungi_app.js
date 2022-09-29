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

//NB CAPIRE COSA MANCA PER FARE LA POST
      //console.log(info_proprieta.fk_azienda);
      var z = document.createElement('div'); // is a node
      z.innerHTML = `
      <form encType="multipart/form-data" id="nuova_proprieta" class="row g-3" action="http://localhost:3000/v1/aziende/${info_proprieta.fk_azienda}/proprieta" method="post"> <!--Serve l'id dell'azienda qui, come ce lo metto-->
        <div class="col-md-6">
          <label for="inputEstensione" class="form-label">Estensione ettari</label>
          <input type="text" class="form-control" id="estensione_ettari" placeholder="Inserire..." required>
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
          <option>Vigneto</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="inputLat" class="form-label">Latitudine</label>
          <input type="text" class="form-control" id="lat" placeholder="0° N" required>
        </div>
        <div class="col-md-6">
          <label for="inputLong" class="form-label">Longitudine</label>
          <input type="text" class="form-control" id="long" placeholder="0° N" required>
        </div>
          <center>
        <div class="col-md-6">
          <label for="inputCopertura" class="form-label">Copertura mobile</label>
          <select id="copertura_mobile" class="form-select" required>
          <option selected>Scegli...</option>
          <option>True</option>
          <option>False</option>
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

   `;
  
      var h = document.getElementById('form-aggiungi');
      h.appendChild(z);
      console.log(info_proprieta.fk_azienda);

      //Qui bisogna aggiungere l'aggiunta dei dispositivi
        }
       
    }



