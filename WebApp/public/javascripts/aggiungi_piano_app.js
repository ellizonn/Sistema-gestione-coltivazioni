//     /v1/aziende/:id_azienda/proprieta/:id_propr/piani

"use strict"

class nuovo_piano_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.nuovo1_manager = new nuovo_piano_manager();
        this.piano = this.nuovo1_manager.piano;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.nuovo1_manager.fetchnuovopiano().then(() => {
                        
                        this.piano = this.nuovo1_manager.piano;
                        this.show1Proprieta(this.piano);
                });
                }
            }); 

    }


    show1Proprieta(piano){

        let id_azienda=sessionStorage.getItem("id_azienda_piano"); //id azienda
        let id_proprieta=sessionStorage.getItem("elenco"); //id proprieta
        console.log("L'id dell'azienda è", id_azienda);
        console.log("L'id della proprietà è", id_proprieta);

        var z = document.createElement('div'); // is a node
        z.innerHTML = 
        `
        <div class="row" style="border-left:50%,border-right:10%">
        <form encType="multipart/form-data" id="form_piano" class="row g-3"> 
          <div class="col-md-6">
            <label for="condizioni_misure" class="form-label">Condizioni misure</label>
            <input type="text" class="form-control" name="condizioni_misure" id="condizioni_misure" placeholder="..." required>
          </div>
          <div class="col-md-6">
            <label for="attuatori_coinvolti" class="form-label">Attuatori coinvolti</label>
            <input type="text" class="form-control" id="attuatori_coinvolti" placeholder="12,13,14" required>
          </div>
          <div class="col-md-6">
            <label for="conseguenze" class="form-label">Conseguenze</label>
            <input type="text" class="form-control" id="conseguenze" required>
          </div>
          <div class="col-md-6">
            <label for="tipo_piano" class="form-label">Tipo piano</label>
            <select id="tipo_piano" class="form-select" required>
            <option selected>Scegli...</option>
            <option>piano_illuminazione</option>
            <option>piano_riscaldamento</option>
            <option>piano_irrigazione</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="umidita_da" class="form-label">Umidita da</label>
            <input type="text" class="form-control" id="umidita_da" required>
          </div>
          <div class="col-md-6">
            <label for="umidita_a" class="form-label">Umidita a</label>
            <input type="text" class="form-control" id="umidita_a" required>
          </div>

          <div class="col-md-6">
            <label for="tempo_funzionamento" class="form-label">Tempo funzionamento</label>
            <input type="text" class="form-control" id="tempo_funzionamento" required>
          </div>

          
          <div class="col-md-6">
            <label for="temperatura_da" class="form-label">Temperatura da</label>
            <input type="text" class="form-control" id="temperatura_da" required>
          </div>
          <div class="col-md-6">
            <label for="temperatura_a" class="form-label">Temperatura a</label>
            <input type="text" class="form-control" id="temperatura_a" required>
          </div>

          <div class="col-md-6">
          <label for="luminosita_da" class="form-label">Luminosita da</label>
          <input type="text" class="form-control" id="luminosita_da" required>
        </div>
        <div class="col-md-6">
          <label for="luminosita_a" class="form-label">Luminosita a</label>
          <input type="text" class="form-control" id="luminosita_a" required>
        </div>

        <div class="col-md-6">
            <label for="orario_da" class="form-label">Orario da</label>
          <input type="time"  class="form-control" id="orario_da" required>
          </div>
          <div class="col-md-6">
          <label for="orario_a" class="form-label">Orario a</label>
        <input type="time"  class="form-control" id="orario_a" required>
        </div>

          <div class="col-12">
            <input class="form-check-input" type="checkbox" id="gridCheck" required>
            <label class="form-check-label" for="gridCheck">
            Trattamento dati dispositivo IoT
            </label>
          </div>
          <div class="col-12">
          <button type="submit" class="btn btn-primary">Aggiungi</button>
        </div>
        </form>
        </div>
     `;

     var h = document.getElementById('form-aggiungi-piano');
      h.appendChild(z);

    }
  }