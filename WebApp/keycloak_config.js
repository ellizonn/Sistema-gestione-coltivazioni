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
/*
function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}
*/
function initKeycloak(memoryStore) { 
    if (_keycloak) { 
        console.warn("Trying to init Keycloak again!"); 
        return _keycloak; 
    } else {
        console.log("Initializing Keycloak..."); 
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig); 
        return _keycloak; 
    } 
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};