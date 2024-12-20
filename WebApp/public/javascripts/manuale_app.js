"use strict"

class manuale_app{
    constructor(manualeContainer){
        this.manualeContainer=manualeContainer;
        this.manuale_manager= new new_manuale_manager();
        this.manuale=this.manuale_manager.manuale;

        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    this.manuale_manager.fetchManualeProprieta().then(() => {
                        this.manuale = this.manuale_manager.manuale;
                        this.showManualeProprieta(this.manuale, this.manuale_manager);
                    //    button_stato.addEventListener('click',this.manuale_manager.C_stato);
                     //   button_manuale.addEventListener('click',this.manuale_manager.C_manuale);
                });
                }
            }); 
    }


    showManualeProprieta(manuale, manuale_manager){

        let tabella = document.getElementById("gestione_manuale");
        //tabella.innerHTML+=table_1;
 
         let table = document.createElement('table');
         table.className="table table-success table-striped";
         let thead = document.createElement('thead')
         let tbody = document.createElement('tbody');
 
         table.appendChild(thead);
         table.appendChild(tbody);
 
         document.getElementById("gestione_manuale").appendChild(table)
 
             let row = document.createElement('tr');
             let heading = document.createElement('th');
             row.appendChild(heading);
             heading.innerHTML = "ID device";
 
             let heading2 = document.createElement('th');
             row.appendChild(heading2);
             heading2.innerHTML = "Modalita' interazione";
 
             let heading3 = document.createElement('th');
             row.appendChild(heading3);
             heading3.innerHTML = "Parametri connessione";
 
             let heading4 = document.createElement('th');
             row.appendChild(heading4);
             heading4.innerHTML = "Tipo";
 
             let heading5 = document.createElement('th');
             row.appendChild(heading5);
             heading5.innerHTML = "Unita' di misura";
 
             let heading6 = document.createElement('th');
             row.appendChild(heading6);
             heading6.innerHTML = "Funzione";
 
             let heading7 = document.createElement('th');
             row.appendChild(heading7);
             heading7.innerHTML = "Stato";
 
             let heading8 = document.createElement('th');
             row.appendChild(heading8);
             heading8.innerHTML = "Manuale";
 
             
              thead.appendChild(row);
 
         for(const IOT of manuale){
             let rowX = document.createElement('tr');
             let rowXdata = document.createElement('td');
             rowXdata.innerHTML = `${IOT.id_device}`;
             rowX.appendChild(rowXdata);
 
             let rowXdata1 = document.createElement('td');
             rowXdata1.innerHTML = `${IOT.mod_interazione}`;
             rowX.appendChild(rowXdata1);
 
             let rowXdata2 = document.createElement('td');
             rowXdata2.innerHTML = `${IOT.parametri_connessione}`;
             rowX.appendChild(rowXdata2);
 
             let rowXdata3 = document.createElement('td');
             rowXdata3.innerHTML = `${IOT.tipo}`;
             rowX.appendChild(rowXdata3);
 
             let rowXdata4 = document.createElement('td');
             rowXdata4.innerHTML = `${IOT.unita_misura}`;
             rowX.appendChild(rowXdata4);
 
             let rowXdata5 = document.createElement('td');
             rowXdata5.innerHTML = `${IOT.funzione}`;
             rowX.appendChild(rowXdata5);
 
             let rowXdata6 = document.createElement('td');
             let button_stato = document.createElement('button');
             button_stato = document.createElement('button');


             
             button_stato.addEventListener("click", function () {
               sessionStorage.setItem("device_id",IOT.id_device);
               sessionStorage.setItem("stato",IOT.stato);
              
               // console.log('ho cliccato stato, IOT cliccato : ',IOT.id_device);
              
                });
                button_stato.addEventListener('click',this.manuale_manager.C_stato);
                

             button_stato.innerText = `${IOT.stato}`;  // collegarlo alla query di cambio stato
             rowXdata6.appendChild(button_stato);
             //rowXdata6.innerHTML = `${IOT.stato}`;
             rowX.appendChild(rowXdata6);
 
             let rowXdata7 = document.createElement('td');
            let button_manuale = document.createElement('button');

            button_manuale.addEventListener("click", function () {
                //  sessionStorage.setItem("id_elimina_az",info.id_azienda);
                 // sessionStorage.setItem("id_elimina_pr",info.id_proprieta);
                 sessionStorage.setItem("device_id",IOT.id_device);
                 sessionStorage.setItem("manuale",IOT.manuale);
    
                 //this.elimina_manager.eliminaDispositivo();
                  });
                  button_manuale.addEventListener('click',this.manuale_manager.C_manuale);

            button_manuale.innerText = `${IOT.manuale}`;  //  collegarlo alla query per manuale/automatico
            //rowXdata7.innerHTML = `${IOT.manuale}`;
            rowXdata7.appendChild(button_manuale);
            rowX.appendChild(rowXdata7);
 
             tbody.appendChild(rowX);
         }

    }
    
}