"use strict"



class elimina_app{

    constructor(eliminaContainer){
        this.eliminaContainer=eliminaContainer;
        this.elimina_manager= new elimina_manager();
        this.elimina=this.elimina_manager.elimina;

        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    this.elimina_manager.fetchEliminaIOT().then(() => {
                        this.elimina = this.elimina_manager.elimina;
                        this.showEliminaIOT(this.elimina);
                });
                }
            }); 
    }


    showEliminaIOT(elimina){

         // $("#stato_proprieta").append(riga);
       let tabella = document.getElementById("elimina_dispositivi");
       

        let table = document.createElement('table');
        table.className="table table-success table-striped";
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById("elimina_dispositivi1").appendChild(table)

            let row = document.createElement('tr');
            let heading = document.createElement('th');
            row.appendChild(heading);
            heading.innerHTML = "ID device";

            let heading2 = document.createElement('th');
            row.appendChild(heading2);
            heading2.innerHTML = "Tipo";

            let heading3 = document.createElement('th');
            row.appendChild(heading3);
            heading3.innerHTML = "Funzione";

            let heading4 = document.createElement('th');
            row.appendChild(heading4);
            heading4.innerHTML = "Elimina";

            thead.appendChild(row);

        for(const IOT of elimina){
            let rowX = document.createElement('tr');
            let rowXdata = document.createElement('td');
            rowXdata.innerHTML = `${IOT.id_device}`;
            rowX.appendChild(rowXdata);

            let rowXdata2 = document.createElement('td');
            rowXdata2.innerHTML = `${IOT.tipo}`;
            rowX.appendChild(rowXdata2);

            let rowXdata3 = document.createElement('td');
            rowXdata3.innerHTML = `${IOT.funzione}`;
            rowX.appendChild(rowXdata3);

            let rowXdata4 = document.createElement('td');
            let button_elimina = document.createElement('button');
            button_elimina.innerText = "X";  //  collegarlo alla query per manuale/automatico
            //rowXdata7.innerHTML = `${IOT.manuale}`;
            button_elimina.addEventListener("click",this.elimina_manager.eliminaDispositivo,false)
            rowXdata4.appendChild(button_elimina);
            rowX.appendChild(rowXdata4);

            tbody.appendChild(rowX);
        }

    }

}