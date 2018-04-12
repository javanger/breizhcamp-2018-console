// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request')
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var URL_TALKS = 'http://www.breizhcamp.org/json/talks.json';
var URL_OTHERS = 'http://www.breizhcamp.org/json/others.json';

var menu = "*************************\n" +
    "1. Rafraichir les données\n" +
    "2. Lister les sessions\n" +
    "99. Quitter\n" +
    "*************************\n";

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

function getResult(callback) {

    talks = [];

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

function listerSessions (callback){

    callback(talks);

}

exports.boucleMenu = function () {
    afficherMenu(demanderChoix);
}

var afficherMenu = saisieUtilisateur => {
    rl.question(menu, saisieUtilisateur);
}

var demanderChoix = saisie => {
    choixMenu(saisie);
}

var choixMenu = choix => {

    switch (parseInt(choix)) {
        case 1:

            getResult(function (nb) {

                console.log('[MAJ]', nb, 'sessions mises à jour.\n')

            });

            break;

        case 2:

            listerSessions(function (monString) {

                monString.forEach( function(session) {
                    console.log(" - " + session.name + " (" + session.speakers + ")\n");
                });

            });

            break;
    }

    if (choix == 99) {
        rl.close();
    } else {
        afficherMenu(demanderChoix);
    }

}