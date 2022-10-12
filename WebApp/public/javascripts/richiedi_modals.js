"use strict";

let mod = document.getElementById("modals_uniformi");

const plus = `

<!-- Modal -->
<div class="modal hide fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Aggiunta dispositivo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Aggiungere un nuovo dispositivo IoT
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="location.href='Visualizza_elenco_proprieta.html'">NO</button>
        <button type="submit" class="btn btn-primary" onclick="location.href='Aggiungi_iot.html'">SI</button>
      </div>
    </div>
  </div>
</div>

            `;

mod.innerHTML += plus;

