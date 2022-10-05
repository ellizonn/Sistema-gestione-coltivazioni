"use strict"

class elimina_proprieta_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.elimina_manager = new elimina_proprieta_manager();
        this.info_proprieta = this.elimina_manager.info_proprieta;

        //controllo tipo utente
        
        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    
                    this.elimina_manager.fetchinfoProprieta().then(() => {
                        
                        this.info_proprieta = this.elimina_manager.info_proprieta;
                        this.showProprieta(this.info_proprieta);
                        document.addEventListener('click',this.elimina_manager.eliminaProprieta);
                });
                }
            }); 

    }


   async  showProprieta(info_proprieta){
    
        if(info_proprieta.length !=0){

            
            let table = document.createElement('table');
        table.className="table table-success table-striped";
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById("elimina-proprieta").appendChild(table)

            let row = document.createElement('tr');
            let heading = document.createElement('th');
            row.appendChild(heading);
            heading.innerHTML = "ID Azienda";

            let heading2 = document.createElement('th');
            row.appendChild(heading2);
            heading2.innerHTML = "ID Proprieta'";

            let heading3 = document.createElement('th');
            row.appendChild(heading3);
            heading3.innerHTML = "Elimina";

            thead.appendChild(row);

            //console.log(info_proprieta);
            
            for(const info of info_proprieta){ 
                
                let rowX = document.createElement('tr');
            let rowXdata = document.createElement('td');
            rowXdata.innerHTML = `${info.id_azienda}`;
            rowX.appendChild(rowXdata);

            let rowXdata2 = document.createElement('td');
            rowXdata2.innerHTML = `${info.id_proprieta}`;
            rowX.appendChild(rowXdata2);

            let rowXdata3 = document.createElement('td');
            let button_elimina_p = document.createElement('button');

            // button_elimina.addEventListener('onclick',crea_elimina(IOT.id_device),false); // onclick(crea_elimina(IOT.id_device));
           button_elimina_p.addEventListener("click", function () {
            sessionStorage.setItem("id_elimina_az",info.id_azienda);
            sessionStorage.setItem("id_elimina_pr",info.id_proprieta);
            console.log('ho cliccato, IOT cliccato : ',info.id_azienda, info.id_proprieta);
           //this.elimina_manager.eliminaDispositivo();
            });
            button_elimina_p.innerText = "X";  //  collegarlo alla query per manuale/automatico
            //rowXdata7.innerHTML = `${IOT.manuale}`;
          //  button_elimina.addEventListener("click",this.elimina_manager.eliminaDispositivo,false)
            rowXdata3.appendChild(button_elimina_p);
            rowX.appendChild(rowXdata3);

            tbody.appendChild(rowX);
            }
      /*      var z=document.getElementById('elimina-proprieta');
        for(const info of info_proprieta){  
           // console.log(info.id_proprieta, info.id_azienda);
          // var z = document.createElement('div'); // is a node
            let x =            ` <div class="col">
                                    <h5>Id proprieta'</h5>
                                    <p>${info.id_proprieta}</p>
                                  </div>

                                 <div class="col">
                                    <h5>ID azienda</h5>
                                    <p>${info.id_azienda}</p>
                                 </div>
                                 `;
                                 

            let elimina = ` 
                                 <div class="col">
                                  <h5>Elimina</h5>
                                  <svg id="${info.id_azienda}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                                </div>
                            `;

           let riga = `<div class="row">
                        <hr>
                        ${x}
                        ${elimina}
                        </hr>
                        <hr><br></hr>
                        </div>
                             `;
        z.innerHTML+=riga;


        // PERCHE' DA PROBLEMI [Uncaught (in promise) ReferenceError: $ is not defined at elimina_proprieta_app.showProprieta (EliminaProprieta_app.js:71:9) at EliminaProprieta_app.js:21:30]
      /*  $(`#${info.id_azienda}`).click(function(){
            //tramite gli endpoints richiamo funzione server.js ...
            fetch(`/v1/aziende/${info.id_azienda}/proprieta/${info.id_proprieta}`,{ //endpoint
                method: 'DELETE',
               // headers:{
               // 'Content-Type':'application/json'
                //},
                //body: JSON.stringify(DATA_WHICH_WE_WANT_TO_SEND) non mi serve 
            })
            
        }) */
        
    //}*/
    } else { }
    }



}