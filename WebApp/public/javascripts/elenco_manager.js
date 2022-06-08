"use strict"

class visual_elenco_proprieta_manager{

    constructor(){
        this.info_proprieta = [];
    }

    async fetchinfoProprieta(){
        let response = await fetch(`/v1/aziende/${1}/proprieta`);
        const infoJson = await response.json();
        if(response.ok){
                 console.log("Sono qui");
                for(let i=0; i<infoJson.length; i++){
                this.info_proprieta.push(new my_info_proprieta(infoJson[i].id_proprieta, infoJson[i].estensione_ettari, infoJson[i].coltura, infoJson[i].data_semina, infoJson[i].lat, infoJson[i].long, infoJson[i].tipo_proprieta, infoJson[i].copertura_mobile));
                console.log(this.info_proprieta[i]);
                 }
                return this.info_proprieta;
        }
        else {
            throw infoJson;
        }
    }

    async card(hotspot){
        hotspot.id = hotspot.currentTarget.id;
        let name = hotspot.currentTarget.name;
        let description = hotspot.currentTarget.description;
        if(hotspot.currentTarget.description===null) description = new String("Non disponibile");
        let address = hotspot.currentTarget.address;
        if(hotspot.currentTarget.address===null) address = new String("Non disponibile");
        let latitude = hotspot.currentTarget.latitude;
        let longitude = hotspot.currentTarget.longitude;
        let services = hotspot.currentTarget.services;
        if(hotspot.currentTarget.services===null) services = new String("Nessuno degno di nota");
        let activities = hotspot.currentTarget.activities;
        if(hotspot.currentTarget.activities===null) activities = new String("Nessuna consigliata dai nostri utenti, dunque tutte da scoprire!");
        let parking = hotspot.currentTarget.parking;
        if(hotspot.currentTarget.parking===null) parking = new String("Nessuna indicazione dai nostri utenti: basarsi su Maps");
        let view = hotspot.currentTarget.view;
        if(hotspot.currentTarget.view===null) view = new String("Nessuna informazione dai nostri utenti");
        let surface = hotspot.currentTarget.surface
        if(hotspot.currentTarget.surface===null) surface = new String("Non disponibile");       
        let cell_signal = hotspot.currentTarget.cell_signal;
        if(Boolean(cell_signal)===true) cell_signal = new String("Disponibile");
        else if(Boolean(cell_signal)===false) cell_signal = new String("Non disponibile");
        else cell_signal = new String("Non indicato dai nostri utenti");
        let avoid_rain = hotspot.currentTarget.avoid_rain;
        if(Boolean(avoid_rain)===true) avoid_rain = new String("Presente");
        else if(Boolean(avoid_rain)===false) avoid_rain = new String("Assente");
        else avoid_rain = new String("Non indicato dai nostri utenti");
        let stars = hotspot.currentTarget.stars;
        if(Boolean(stars)===true) stars = new String("Positiva");
        else if(Boolean(stars)===false) stars = new String("Negativa");
        else stars = new String("Non indicato dai nostri utenti");

        var myModal = new bootstrap.Modal(document.getElementById("azione_modal"),{backdrop: 'static', keyboard: false});
        myModal.toggle();
        document.getElementById("name").innerText = name;
        document.getElementById("description").innerText = description;
        document.getElementById("address").innerText = address;
        // document.getElementById("latitude").innerText = latitude;
        // document.getElementById("longitude").innerText = longitude;
        document.getElementById("coordinate").innerHTML = latitude+", "+longitude;
        document.getElementById("coordinate").href = "https://maps.google.com/?q="+latitude+","+longitude;
        document.getElementById("services").innerText = services;
        document.getElementById("activities").innerText = activities;
        document.getElementById("parking").innerText = parking;
        document.getElementById("view").innerText = view;
        document.getElementById("surface").innerText = surface;
        document.getElementById("cell_signal").innerText = cell_signal;
        document.getElementById("avoid_rain").innerText = avoid_rain;
        document.getElementById("stars").innerText = stars;
        
        document.getElementById("chiudimi").addEventListener("click", function(){
            document.location.reload();
        });
        
        document.getElementById("modalCard").addEventListener("hidePrevented.bs.modal",function(){
            document.location.reload();
        });

        if(response.ok){
            
            return;
        }
        else{
            try{
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch(err){
                if(Array.isArray(err)) {
                    let errors = '';
                    err.forEach((e, i) => errors += `${i}. ${e.msg} for '${e.param}', `);
                    throw `Errore: ${errors}`;
                }
                else
                    throw 'Errore: non riesco a parsificare la risposta del server';
            }
        }
    }

}