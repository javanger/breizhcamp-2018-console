// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request')

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (url, callback) {

    // TODO => effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    request(url, {
        json: true
    }, function (err, res, body) {
        if (err) {
            return console.log('Erreur', err);
        }

        // TODO => une fois les données récupérées, alimenter la variable talks
        talks = body;

        // TODO => invoquer la callback avec le nombre de sessions récupérées
        callback(talks.length);

    });

}