"use strict"

class visual_stato_proprieta_app{
    constructor(statoContainer){
        this.statoContainer = statoContainer;
        this.stato_manager = new visual_stato_proprieta_manager();
        this.stato_proprieta = this.stato_manager.stato_proprieta; //per info proprieta
        this.IOT_proprieta = this.stato_manager.IOT_proprieta; // per IOT

        //controllo tipo utente

        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    this.stato_manager.fetchstatoProprieta().then(() => {
                        this.stato_proprieta = this.stato_manager.stato_proprieta;
                        this.IOT_proprieta = this.stato_manager.IOT_proprieta;
                        this.showstatoProprieta(this.stato_proprieta, this.IOT_proprieta);
                });
                }
            }); 

    }

    showstatoProprieta(stato_proprieta, IOT_proprieta){

        let table_1 = `
        <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID proprieta'</th>
                                <th>Estensione ettari</th>
                                <th>Coltura</th>
                                <th>Data semina</th>
                                <th>Latitudine</th>
                                <th>Longitudine</th>
                                <th>Tipo proprieta'</th>
                                <th>Copertura mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                <tr>
                    <th scope="row">${stato_proprieta[0].id_proprieta}</th>
                    <td>${stato_proprieta[0].estensione_ettari}</td>
                    <td>${stato_proprieta[0].coltura}</td>
                    <td>${stato_proprieta[0].data_semina}</td>
                    <td>${stato_proprieta[0].lat}</td>
                    <td>${stato_proprieta[0].long}</td>
                    <td>${stato_proprieta[0].tipo}</td>
                    <td>${stato_proprieta[0].copertura_mobile}</td>
                </tr>
            </tbody>
        </table>

        `;


       // $("#stato_proprieta").append(riga);
       let tabella = document.getElementById("stato_proprieta");
       tabella.innerHTML+=table_1;

        let table = document.createElement('table');
        table.className="table table-success table-striped";
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementById("IOT").appendChild(table)

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

        for(const IOT of IOT_proprieta){
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
            rowXdata6.innerHTML = `${IOT.stato}`;
            rowX.appendChild(rowXdata6);

            let rowXdata7 = document.createElement('td');
            rowXdata7.innerHTML = `${IOT.manuale}`;
            rowX.appendChild(rowXdata7);

            tbody.appendChild(rowX);
        }

       
  
    }
}