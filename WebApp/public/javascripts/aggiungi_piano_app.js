//     /v1/aziende/:id_azienda/proprieta/:id_propr/piani

"use strict"

class nuovo_piano_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.nuovo1_manager = new nuovo_piano_manager();
        this.iot = this.nuovo1_manager.iot;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.nuovo1_manager.fetchnuovopiano().then(() => {
                        
                        this.iot = this.nuovo1_manager.iot;
                        this.show1Proprieta(this.iot);
                });
                }
            }); 

    }


    show1Proprieta(iot){

        console.log(iot);
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
            <select id="attuatori_coinvolti" class="form-select" required>
            <option selected>Scegli...</option>
            
            </select>
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

      let esempio_select_1 = document.getElementById('attuatori_coinvolti');
                    for(let i of iot ) {
                    esempio_select_1.add( new Option( i.id_device ) ); 
                    }

     /*   let piano_tipo = document.getElementById("tipo_piano");
        if(piano_tipo=='piano_illuminazione'){
            console.log('ciao');
        } else if(piano_tipo=='piano_irrigazione'){
          console.log('ciao1');
        }else if(piano_tipo=='piano_riscaldamento'){
          console.log('ciao2');
        } else console.log("cacca");*/


      const form=document.getElementById('form_piano');


      let id_azienda=sessionStorage.getItem("id_azienda_piano"); //id azienda
      let id_proprieta=sessionStorage.getItem("elenco"); //id proprieta
      let sub=sessionStorage.getItem("chiave"); //utente
      

      form.addEventListener('submit',(async function(e){

        e.preventDefault();

    // console.log("L'id dell'azienda è", id_azienda);
     // console.log("L'id della proprietà è", id_proprieta);


        const piano={
            piano_configurazione:{ 
            condizioni_misure:document.getElementById('condizioni_misure').value,
            attuatori_coinvolti:document.getElementById('attuatori_coinvolti').value,
            conseguenze:document.getElementById('conseguenze').value,
            tipo_piano:document.getElementById('tipo_piano').value,
            umidita_da:document.getElementById('umidita_da').value,
            umidita_a:document.getElementById('umidita_a').value,
            tempo_funzionamento:document.getElementById('tempo_funzionamento').value,
            temperatura_da:document.getElementById('temperatura_da').value,
            temperatura_a:document.getElementById('temperatura_a').value,
            luminosita_da:document.getElementById('luminosita_da').value,
            luminosita_a:document.getElementById('luminosita_a').value,
            orario_da:document.getElementById('orario_da').value,
            orario_a:document.getElementById('orario_a').value,
            fk_proprieta:id_proprieta,
            fk_utente:sub
          }
        }

        //sessionStorage.setItem("n_IOT",propr.proprieta.n_iot); //PRENDO IL N DI IOT CHE DEVO INSERIRE DA QUA
        
        //const propr='"estensione_ettari": 75,"coltura": "girasole","data_semina": "2022-07-10","lat": 150,"long": 12,"tipo_proprieta": "campo","copertura_mobile": false,"fk_azienda":2';
        let tok=sessionStorage.getItem("token");
    //  /v1/aziende/:id_azienda/proprieta/:id_propr/piani
        let response2 =  await fetch(`/v1/aziende/${id_azienda}/proprieta/${id_proprieta}/piani`,{
          method: 'POST',
          /*body: JSON.stringify({
            proprieta:propr,
        FUNGE
          }),*/
          body: JSON.stringify(piano),
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
           else */window.location.href="Visualizza_elenco_proprieta.html";
      }));


    }
  }