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
//NB CAPIRE COSA MANCA PER FARE LA POST
      //console.log(info_proprieta.fk_azienda);
      
      var z = document.createElement('div'); // is a node
      z.innerHTML = `
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
          <option>Vigneto</option>
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

   `;

      var h = document.getElementById('form-aggiungi');
      h.appendChild(z);
     

      const form=document.getElementById('form_proprieta');
/*
      let a=new my_info_proprieta();

      let proprieta_app='{"proprieta":{'+
        '"estensione_ettari":'+Document.getElementById('estensione_ettari')
        '}}';*/
      

/*
estensione_ettari : Document.getElementById('estensione_ettari'),
        coltura : Document.getElementById('coltura'),
        data_semina : Document.getElementById('data_semina'),
        tipo_proprieta : Document.getElementById('tipo_proprieta'),
        lat : Document.getElementById('lat'),
        long : Document.getElementById('long'),
         copertura_mobile : Document.getElementById('copertura_mobile')*/



      form.addEventListener('submit',async function(){
       let proprieta_app=new my_info_proprieta(document.getElementById('estensione_ettari').value, document.getElementById('coltura').value, document.getElementById('data_semina').value, document.getElementById('lat').value, document.getElementById('long').value, document.getElementById('tipo_proprieta').value, document.getElementById('copertura_mobile').value, 0);
       let proprieta_json=JSON.parse(proprieta_app); 
       console.log(proprieta_json);
       console.log(proprieta_app);
       // method="post" action="http://localhost:3000/v1/aziende/${info_proprieta.fk_azienda}/proprieta"
       let tok=sessionStorage.getItem("token");
       let response_id = await fetch(`http://localhost:3000/v1/aziende/${info_proprieta.fk_azienda}/proprieta`,{
        method : "POST",
        headers: new Headers({
            'Access-Control-Allow-Origin':'no-cors',
           //'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': 'Bearer '+tok, 
        }),
        body : proprieta_json
        }
        ); 

      });

      //Qui bisogna aggiungere l'aggiunta dei dispositivi
      
        }
       
    }



