"use strict"

class visual_stato_proprieta_app{
    constructor(statoContainer){
        this.statoContainer = statoContainer;
        this.stato_manager = new visual_stato_proprieta_manager();
        this.stato_proprieta = this.stato_manager.stato_proprieta; //per info proprieta
        this.IOT_proprieta = this.stato_manager.IOT_proprieta; // per IOT
        this.ultime_misure=this.stato_manager.ultime_misure; //per misure
        this.piano=this.stato_manager.piano; //per piano di configurazione

        //controllo tipo utente

        let utente=false;
        (async function(){
                utente=true;
            })().then( () => {
                if(utente==true){
                    this.stato_manager.fetchstatoProprieta().then(() => {
                        this.stato_proprieta = this.stato_manager.stato_proprieta;
                        this.IOT_proprieta = this.stato_manager.IOT_proprieta;
                        this.ultime_misure=this.stato_manager.ultime_misure;
                        this.piano=this.stato_manager.piano;
                        this.showstatoProprieta(this.stato_proprieta, this.IOT_proprieta, this.ultime_misure, this.piano);
                });
                }
            }); 

    }

    showstatoProprieta(stato_proprieta, IOT_proprieta, ultime_misure, piano){

        
        
        //console.log("in APP",stato_proprieta);
        let table_1 = `<br><br><br>
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
                    <td>${stato_proprieta[0].tipo_proprieta}</td>
                    <td>${stato_proprieta[0].copertura_mobile}</td>
                </tr>
            </tbody>
        </table>

        `;
        

    //PER IOT
        if(IOT_proprieta.length==0){
            //NESSUN DISPOSITIVO TROVATO
        } else{
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

    //PER MISURE
    if(ultime_misure.length==0){
        //NON HO MISURE
    } else {
        let tabella = document.getElementById("stato_proprieta");
        tabella.innerHTML+=table_1;
 
         let table = document.createElement('table');
         table.className="table table-success table-striped";
         let thead = document.createElement('thead')
         let tbody = document.createElement('tbody');
 
         table.appendChild(thead);
         table.appendChild(tbody);
 
         document.getElementById("misure").appendChild(table)
 
             let row = document.createElement('tr');
             let heading = document.createElement('th');
             row.appendChild(heading);
             heading.innerHTML = "ID misura";
 
             let heading2 = document.createElement('th');
             row.appendChild(heading2);
             heading2.innerHTML = "Data misurazione";
 
             let heading3 = document.createElement('th');
             row.appendChild(heading3);
             heading3.innerHTML = "Ora misurazione";
 
             let heading4 = document.createElement('th');
             row.appendChild(heading4);
             heading4.innerHTML = "Valore misurato";
 
             let heading5 = document.createElement('th');
             row.appendChild(heading5);
             heading5.innerHTML = "Unita' di misura";
 /*
             let heading6 = document.createElement('th');
             row.appendChild(heading6);
             heading6.innerHTML = "FK DEVICE";
 */
             
              thead.appendChild(row);

              for(const mis of ultime_misure){
                let rowX = document.createElement('tr');
                let rowXdata = document.createElement('td');
                rowXdata.innerHTML = `${mis.id_misura}`;
                rowX.appendChild(rowXdata);
    
                let rowXdata1 = document.createElement('td');
                rowXdata1.innerHTML = `${mis.data_misurazione}`;
                rowX.appendChild(rowXdata1);
    
                let rowXdata2 = document.createElement('td');
                rowXdata2.innerHTML = `${mis.ora_misurazione}`;
                rowX.appendChild(rowXdata2);
    
                let rowXdata3 = document.createElement('td');
                rowXdata3.innerHTML = `${mis.valore_misurato}`;
                rowX.appendChild(rowXdata3);
    
                let rowXdata4 = document.createElement('td');
                rowXdata4.innerHTML = `${mis.unita_misura}`;
                rowX.appendChild(rowXdata4);
    /*
                let rowXdata5 = document.createElement('td');
                rowXdata5.innerHTML = `${mis.fk_device}`;
                rowX.appendChild(rowXdata5);
    */
                
    
                tbody.appendChild(rowX);
            }

    }

    if(piano.length==0){
        
    } else {
        let tabella = document.getElementById("stato_proprieta");
        tabella.innerHTML+=table_1;
 
         let table = document.createElement('table');
         table.className="table table-success table-striped";
         let thead = document.createElement('thead')
         let tbody = document.createElement('tbody');
 
         table.appendChild(thead);
         table.appendChild(tbody);
 
         document.getElementById("piano").appendChild(table)
 
             let row = document.createElement('tr');
             let heading = document.createElement('th');
             row.appendChild(heading);
             heading.innerHTML = "Attuatori coinvolti";
 
             let heading2 = document.createElement('th');
             row.appendChild(heading2);
             heading2.innerHTML = "Condizioni misure";
 
             let heading3 = document.createElement('th');
             row.appendChild(heading3);
             heading3.innerHTML = "Conseguenze";
 
             let heading4 = document.createElement('th');
             row.appendChild(heading4);
             heading4.innerHTML = "Id piano";
 
             let heading5 = document.createElement('th');
             row.appendChild(heading5);
             heading5.innerHTML = "Luminosita a";
 
             let heading6 = document.createElement('th');
             row.appendChild(heading6);
             heading6.innerHTML = "Luminosita da";

             let heading7 = document.createElement('th');
             row.appendChild(heading7);
             heading7.innerHTML = "Orario a";

             let heading8 = document.createElement('th');
             row.appendChild(heading8);
             heading8.innerHTML = "Orario da";
 
             let heading9 = document.createElement('th');
             row.appendChild(heading9);
             heading9.innerHTML = "Temperatura a";

             let heading10 = document.createElement('th');
             row.appendChild(heading10);
             heading10.innerHTML = "LTemperatura da";

             let heading11 = document.createElement('th');
             row.appendChild(heading11);
             heading11.innerHTML = "Temperatura max";
             
             let heading12 = document.createElement('th');
             row.appendChild(heading12);
             heading12.innerHTML = "Tempo funzionamento";

             let heading13 = document.createElement('th');
             row.appendChild(heading13);
             heading13.innerHTML = "Tipo piano";

             let heading14 = document.createElement('th');
             row.appendChild(heading14);
             heading14.innerHTML = "Umidita min";
              
             thead.appendChild(row);

             for(const p of piano){
                let rowX = document.createElement('tr');
                let rowXdata = document.createElement('td');
                rowXdata.innerHTML = `${p.attuatori_coinvolti}`;
                rowX.appendChild(rowXdata);
    
                let rowXdata1 = document.createElement('td');
                rowXdata1.innerHTML = `${p.condizioni_misure}`;
                rowX.appendChild(rowXdata1);
    
                let rowXdata2 = document.createElement('td');
                rowXdata2.innerHTML = `${p.conseguenze}`;
                rowX.appendChild(rowXdata2);
    
                let rowXdata3 = document.createElement('td');
                rowXdata3.innerHTML = `${p.id_piano}`;
                rowX.appendChild(rowXdata3);
    
                let rowXdata4 = document.createElement('td');
                rowXdata4.innerHTML = `${p.luminosita_a}`;
                rowX.appendChild(rowXdata4);
    
                let rowXdata5 = document.createElement('td');
                rowXdata5.innerHTML = `${p.luminosita_da}`;
                rowX.appendChild(rowXdata5);

                let rowXdata6 = document.createElement('td');
                rowXdata6.innerHTML = `${p.orario_a}`;
                rowX.appendChild(rowXdata6);

                let rowXdata7 = document.createElement('td');
                rowXdata7.innerHTML = `${p.orario_da}`;
                rowX.appendChild(rowXdata7);

                let rowXdata8 = document.createElement('td');
                rowXdata8.innerHTML = `${p.temperatura_a}`;
                rowX.appendChild(rowXdata8);

                let rowXdata9 = document.createElement('td');
                rowXdata9.innerHTML = `${p.temperatura_da}`;
                rowX.appendChild(rowXdata9);

                let rowXdata10 = document.createElement('td');
                rowXdata10.innerHTML = `${p.temperatura_max}`;
                rowX.appendChild(rowXdata10);

                let rowXdata11 = document.createElement('td');
                rowXdata11.innerHTML = `${p.tempo_funzionamento}`;
                rowX.appendChild(rowXdata11);

                let rowXdata12 = document.createElement('td');
                rowXdata12.innerHTML = `${p.tipo_piano}`;
                rowX.appendChild(rowXdata12);

                let rowXdata13 = document.createElement('td');
                rowXdata13.innerHTML = `${p.umidita_min}`;
                rowX.appendChild(rowXdata13);
    
                
    
                tbody.appendChild(rowX);
            }

    }
       
  
    }
}