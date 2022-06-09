"use strict";

/*NAVBAR*/
let menu = document.getElementById("menu_uniforme");

const x = `
    
<!-- MENU DI NAVIGAZIONE -->
<nav class="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="home.html">
           <img src="images/Logo_iSerra-removebg-preview.png"  height="100">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="elementi">


        <li class="nav-item">
        <a class="nav-link" href="<----keycloac--->">Login</a>
        </li>

        <li class="nav-item">
        <a class="nav-link" href="Visualizza_elenco_proprieta.html">Visualizza elenco proprieta</a>
        </li>

          <script>
            let log = document.getEle
          </script>
          <!-- esempio di voce di menù disabilitata
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          -->
        </ul>
       
      </div>
    </div>
  </nav>
  <!-- FINE MENU DI NAVIGAZIONE -->

`;

menu.innerHTML += x;


/*FOOTER*/
let footer = document.getElementById("foot");

const y = `
          
          `;

footer.innerHTML += y;


(async function(){
  let log = document.getElementById("elementi");
 // let logged_collab = await fetch('/....');
 // let logged_agric = await fetch('/....');
 // const lcjson = await logged_collab.json();
 //  const lajson = await logged_agric.json();

 const lajson = false;
 const lcjson = false;

  let m;

  //if(!lcjson.log && !lajson.log){ //l'utente non è loggato
  if(!lcjson && !lajson){
    m = `
    <li class="nav-item">
    <a class="nav-link" href="log.html">Login</a>
    </li>
    `;
    log.innerHTML += m;
  }
  else if(lajson){  //loggato come agricoltore
     m = `
     -----
     `;
     log.innerHTML += m;

     let ilnome = await fetch(''); //mi servirebbe il nome dell'agricoltore con cui sono loggato
     const json = await ilnome.json();
     document.getElementById("ilnome").innerText="Logout [Agricoltore: " + json.ilnome + "]";
  }
  else if(lcjson.log){ //loggato come collaboratore
    m = `
    -----
    `;
    log.innerHTML += m;

    let ilnome = await fetch(''); //ottengo il nome del collaboratore
    const json = await ilnome.json();
    document.getElementById("ilnome").innerText = "Logout [Collaboratore: " + json.ilnome + "]";
  }
})