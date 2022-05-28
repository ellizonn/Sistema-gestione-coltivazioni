"use strict";


//Varie import e costanti
const express = require('express') ;
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const BacchettaMagicaServer = require('./iSerra'); //--> VEDERE
const passport = require('passport'); //auth middleware
const LocalStrategy = require('passport-local').Strategy; //username and password for login
const session = require('express-session');
const flash = require('connect-flash'); 
const {check, validationResult} = require('express-validator');
const yhs = new iSerra(); // --> VEDERE
const app = express();
const port = 3000;


app.use(flash());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/home.html'));



  //"username e password" login strategy --> strategia di login locale
  passport.use(new LocalStrategy(
    function(username, password, done) {
      yhs.getUser(username, password).then(({user, check}) => {
        if (!user) {
          return done(null, false, { message: 'Username non corretto.' });
        }
        if (!check) {
          return done(null, false, { message: 'Password non corretta.' });
        }
        //console.log("use in passport: ",user);
        return done(null, user); //da qui faccio la serialize dell'utente
      })
    }
  ));
  //serialize e de-serialize dell'utente
  passport.serializeUser(function(user, done) {
    //done(null, user.cf, user.tipouser);
    done(null,user);
  });
  passport.deserializeUser(function(cf, done) {
    yhs.getUserById(cf).then(user => {
      done(null, user);
    });
  });



//controlla se la richiesta perviene da un utente autenticato come cliente
const isLoggedCli = (req, res, next) => {
  //  console.log(req.user , req.session.passport.user.tipouser);
  if(req.user && req.session.passport.user.tipouser===0){
    return next();
  }
  return res.status(401).json({"statusCode" : 401, "message" : "NON AUTENTICATO"}); 
  //res.redirect("log.html")
}
//controlla se la richiesta perviene da un utente autenticato come dipendente
const isLoggedDip = (req, res, next) => {
    if(req.user && req.session.passport.user.tipouser===1){
      return next();
    }
    return res.status(401).json({"statusCode" : 401, "message" : "NON AUTENTICATO"}); 
    //res.redirect("log.html")
}



// set up the session
app.use(session({
    //store: new FileStore(), // by default, Passport uses a MemoryStore to keep track of the sessions - if you want to use this, launch nodemon with the option: --ignore sessions/
    secret: 'frase segreta',
    resave: false,
    saveUninitialized: false 
  }));
//inizializzazione di passport
app.use(passport.initialize());
app.use(passport.session());







//INIZIO REST API (dentro c'è qualche altro middleware per mantenere un po' il mio ordine mentale)







//Login di qualsiasi utente (cliente/dipendente) con passport
//!Non bisogna proteggere questa route!
app.post('/loguser', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            return res.redirect("log.html?errore="+info.message);
        }
        // success, perform the login
        req.login(user, function(err) {
          if (err) { return next(err); }
          // req.user contains the authenticated user
          //Qui effettuo il redirect in base al tipo di utente
          if(req.session.passport.user.tipouser===0) //se è un cliente
            return res.redirect("myserCli.html");
            else if(req.session.passport.user.tipouser===1) //se è un dipendente
                return res.redirect("myserDip.html");
        }); 
    })(req, res, next);
});




//Logout di qualsiasi utente - ho usato app.get perché l'ho visto sulla documentazione di passport
//!PROTEZIONE ROUTE: LASCIO EFFETTUARE LOGOUT IN OGNI CASO, quindi non mi interessa proteggerla!
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



//Ho introdotto questo piccolo trucco, così lato client posso sapere se un utente è loggato oppure no (grazie alle sessioni)
//Questo mi è utile, ad esempio, per cambiare il comportamento della navbar dinamicamente
//Anche per tenere traccia del tipo di utente loggato attualmente, etc...
// --- Non mi interessa proteggere queste due ---
app.get('/loggato_cli', function(req,res){
    if(req.user && req.session.passport.user.tipouser===0)
        res.send({log: true});
    else
        res.send({log: false});
});
app.get('/loggato_dip', function(req,res){
    if(req.user && req.session.passport.user.tipouser===1)
        res.send({log: true});
    else
        res.send({log: false});
});



//Per la navbar: ottengo nome del dipendente loggato (protetta)
app.get('/loggato_dip_nome', isLoggedDip, function(req,res){
    res.send({ilnome: req.session.passport.user.user});
});
//Per la navbar: ottengo nome del cliente loggato (protetta)
app.get('/loggato_cli_nome', isLoggedCli, function(req,res){
    res.send({ilnome: req.session.passport.user.user});
});



//Attivo definitivamente il server --> ora accetto richieste
app.listen (port, () =>  console.log(`Il server di iSerra è attivo all'indirizzo http://localhost:${port}` )) ;






