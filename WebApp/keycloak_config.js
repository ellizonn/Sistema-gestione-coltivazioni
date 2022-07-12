var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'iserra_webapp',
    bearerOnly: false,
    serverUrl: 'https://lemur-12.cloud-iam.com/auth',
    realm: 'iserra',
    credentials: {
        secret: 'CZ5GVXj8sQ8sJPWKWZfJF5A0BCjTiZ4l'
    }
};

function initKeycloak(memoryStore) { 
    if (_keycloak) { 
        console.warn("Cerco di inizializzare ancora keycloak!"); 
        return _keycloak; 
    } else {
        console.log("Inizializzazione Keycloak in backend..."); 
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig); 
        return _keycloak; 
    } 
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak non e\' stato inizializzato. Chiamare la init.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};