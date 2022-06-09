"use strict";

let mod = document.getElementById("modals_uniformi");

const plus = `



<!-- Modal -->
<div class="modal fade" id="azione_modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Azione da effettuare</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
         <div class="card">
              <div class="card-body">
                   <a href="Visualizza_stato_proprieta.html">Visualizza stato proprieta'</a>
             </div>
         </div>

         <div class="card">
              <div class="card-body">
                   <a href="azione2.html">Azione due</a>
             </div>
         </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
            `;

mod.innerHTML += plus;


/*Ci serve per dividere le opzioni di scelta tra agricoltore e collaboratore*/
(async function(){
  let log = document.getElementById("modals_uniformi");
 // let logged_collab = await fetch('/....');
 // let logged_agric = await fetch('/....');
 // const lcjson = await logged_collab.json();
 //  const lajson = await logged_agric.json();

 const lajson = true;
 const lcjson = false;

  let m;

  if(lajson){  //loggato come agricoltore
     m = `
     
       <div class="card">
         <div class="card-body">
          <a href="Visualizza_stato_proprieta.html">Visualizza stato proprieta'</a>
         </div>
      </div>

      <div class="card">
        <div class="card-body">
          <a href="Gestione_manuale_attuatori_proprieta.html">Gestione manuale attuatori proprieta'</a>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <a href="Pianificazione_attuatori_proprieta.html">Pianificazione attuatori proprieta'</a>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <a href="Elimina_IoT_devices.html">Elimina IoT devices</a>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <a href="Elimina_proprieta.html">Elimina proprieta'</a>
        </div>
      </div>
     `;
     log.innerHTML += m;
  }
  else if(lcjson.log){ //loggato come collaboratore
    m = `
      <div class="card">
        <div class="card-body">
         <a href="Visualizza_stato_proprieta.html">Visualizza stato proprieta'</a>
        </div>
      </div>
        
         <div class="card">
         <div class="card-body">
              <a href="Gestione_manuale_attuatori_proprieta.html">Gestione manuale attuatori proprieta'</a>
        </div>
    </div>
    `;
    log.innerHTML += m;
  }
})