var request = require("request");

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

const API_URI = "https://jsonplaceholder.typicode.com/posts";

var getData = (uri, fn) => {
  // effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
  request(uri, { json: true }, (err, res, body) => {
    if (err) {
      return console.log("Erreur", err);
    }
    // body contient les données récupérées
    // invoquer la callback avec le nombre de sessions récupérées
    fn(body.length);
  });
};

exports.init = () => {
  // Envoie de la requête http
  getData(API_URI, nbSessions => {
    // une fois les données récupérées, alimenter la variable talks
    console.log(nbSessions);
  });
};
