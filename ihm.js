var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('** Application BreizhCamp 2018 **');

exports.start = function() {
    demarrer();
}
function demarrer(){

rl.question(Menu(), function(saisie){
    switch(saisie){
    case '1' :
    service.init(function(nb) {
        console.log("\n" +nb + ' Données mises à jour \n');  
         demarrer();
        });        
           break;
           
    case '2':  
       service.listerSessions(function(chaine) {
        console.log(chaine);
    demarrer(); 
       }); 
          
            break;
    case '99' :
        console.log('Au revoir');
        rl.close();
        break;
    }
});
};

function Menu(){
    var chaine = '************************* ' + '\n 1. Rafraichir les données'+ '\n 2. Lister les sessions'+ '\n 99. Quitter\n'
    return chaine;
}