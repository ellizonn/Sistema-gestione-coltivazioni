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
      
    } else {


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

            let c=document.createElement("h3");
            c.innerHTML="\"Nessuna proprieta' da eliminare\"";
            document.getElementById("elimina-proprieta").appendChild(c);

            thead.appendChild(row);



     }
    }



}