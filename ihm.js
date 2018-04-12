var readline = require('readline');
var service = require('./service');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function() {
    saisie();
};

function saisie(){
    rl.question(menu(),function(choix){
        switch (choix) {
            case '1':
                service.init(function(nb) {
                    console.log(nb + ' Données mises à jour');
                    saisie();
                });   
                break;
            case '2':
                service.listerSessions(function(talks) {
                    console.log(talks.map(talk => talk.speakers ? talk.name + '( ' + talk.speakers + ' )' : talk.name ).join('\n'));
                    saisie();
                });   
                break;
            case '3':
                service.listerPresentateurs(function(speakers) {
                    console.log(speakers.map(speaker => speaker.name).join('\n'));
                    saisie();
                });   
                break;
            case '99':
                rl.close();
                break;
        }  
    });
}

function menu(){
    var chaine = '*************************\n'
    chaine += '1. Rafraichir les données\n'
    chaine += '2. Lister les sessions\n'
    chaine += '3. Lister les présentateurs\n'
    chaine += '99. Quitter\n'
    return chaine
}