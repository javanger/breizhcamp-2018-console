// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request')

var URL_TALKS = 'http://www.breizhcamp.org/json/talks.json';
var URL_OTHERS = 'http://www.breizhcamp.org/json/others.json';


// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    var resultatAttendu = [];

    function pushResult(talks, url) {
        resultatAttendu.push(url)

        if ([URL_OTHERS, URL_TALKS].every(u => resultatAttendu.includes(u))) {
            callback(talks.length)
        }


    }

    getJSON(URL_OTHERS, function (talks, url) {
        pushResult(talks, url)
    });

    getJSON(URL_TALKS, function (talks, url) {
        pushResult(talks, url)
    });

}

function getJSON(url, callback) {

    request(url, {
        json: true
    }, function (err, res, body) {
        if (err) {
            return console.log('Erreur', err);
        }

        talks = talks.concat(body);

        callback(talks, url);

    });

}