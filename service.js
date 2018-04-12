var request = require("request");

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

const SESSIONS_URI = "http://www.breizhcamp.org/json/talks.json";
const KEYNOTE_URI = "http://www.breizhcamp.org/json/others.json";
var uris = [SESSIONS_URI, KEYNOTE_URI];
var compteurInitGet = 0;

var getData = (uri, dataLenght, talksLenght) => {
  // effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
  request(uri, { json: true }, (err, res, body) => {
    if (err) {
      return console.log("Erreur", err);
    }
    compteurInitGet++;
    if (compteurInitGet > uris.length) {
      talks = [];
      compteurInitGet = 1;
    }
    talks = talks.concat(body);
    // body contient les données récupérées
    // invoquer la callback avec le nombre de sessions récupérées
    dataLenght(body.length);
    if (compteurInitGet == uris.length) talksLenght(talks.length);
  });
};

var dataLenght = nb => {
  console.log(nb);
};

exports.init = talksLenght => {
  // Envoie de la requête http
  uris.forEach(uri => getData(uri, dataLenght, talksLenght));
};

exports.listerSessions = (fn) => {
  fn(talks);
};