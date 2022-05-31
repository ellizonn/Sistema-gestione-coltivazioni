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
                   <a href="azione1.html">Azione uno</a>
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