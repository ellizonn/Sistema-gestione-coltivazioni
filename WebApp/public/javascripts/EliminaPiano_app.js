"use strict"

class elimina_piano_app{
    
    constructor(proprietaContainer){
        this.proprietaContainer = proprietaContainer;
        this.elimina_manager = new elimina_piano_manager();
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
                        document.addEventListener('click',this.elimina_manager.eliminaPiano);
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

    document.getElementById("elimina-piano").appendChild(table)

        let row = document.createElement('tr');
        let heading = document.createElement('th');
        row.appendChild(heading);
        heading.innerHTML = "ID Proprieta";

        let heading2 = document.createElement('th');
        row.appendChild(heading2);
        heading2.innerHTML = "ID Piano";

        let heading3 = document.createElement('th');
        row.appendChild(heading3);
        heading3.innerHTML = "Elimina";

        thead.appendChild(row);

        //console.log(info_proprieta);
        
        for(const info of info_proprieta){ 
            
            let rowX = document.createElement('tr');
        let rowXdata = document.createElement('td');
        rowXdata.innerHTML = `${info.fk_proprieta}`;
        rowX.appendChild(rowXdata);

        let rowXdata2 = document.createElement('td');
        rowXdata2.innerHTML = `${info.id_piano}`;
        rowX.appendChild(rowXdata2);

        let rowXdata4 = document.createElement('td');
        let button_elimina_p = document.createElement('button');

        // button_elimina.addEventListener('onclick',crea_elimina(IOT.id_device),false); // onclick(crea_elimina(IOT.id_device));
       button_elimina_p.addEventListener("click",function () {
        sessionStorage.setItem("id_elimina_piano",info.id_piano);
        sessionStorage.setItem("id_elimina_pr",info.fk_proprieta);
        console.log(info.id_piano);
        //console.log('ho cliccato, IOT cliccato : ',info.id_azienda, info.id_proprieta, info.id_piano);
       //this.elimina_manager.eliminaDispositivo();
        });
        button_elimina_p.innerText = "X";  //  collegarlo alla query per manuale/automatico
        //rowXdata7.innerHTML = `${IOT.manuale}`;
      //  button_elimina.addEventListener("click",this.elimina_manager.eliminaDispositivo,false)
        rowXdata4.appendChild(button_elimina_p);
        rowX.appendChild(rowXdata4);

        tbody.appendChild(rowX);
        }

} else { 
    let table = document.createElement('table');
    table.className="table table-success table-striped";
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById("elimina-piano").appendChild(table);


    let row = document.createElement('tr');
        let heading = document.createElement('th');
        row.appendChild(heading);
        heading.innerHTML = "ID Proprieta";

        let heading2 = document.createElement('th');
        row.appendChild(heading2);
        heading2.innerHTML = "ID Piano";

        let heading3 = document.createElement('th');
        row.appendChild(heading3);
        heading3.innerHTML = "Elimina";

        
        let c=document.createElement("h3");
        c.innerHTML="\"Nessun piano di configurazione\"";
        document.getElementById("elimina-piano").appendChild(c);

        thead.appendChild(row);

        //console.log(info_proprieta);
        
       
}

}}