var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var menu = "*************************\n1. Rafraichir les données\n2. Lister les sessions\n99. Quitter\n"

exports.start = function() {
  choix();
};


function choix(){
  rl.question(menu, function(saisie){
      switch(saisie){
        case "1":{
          service.init(function(nb) {
            console.log(nb, 'Données mises à jour\n')

          });
          choix();
          break;
        }
        case "2":{
          service.listerSessions(function(string){
            string.forEach(function (element){
              var str = element.name + ", présenté par : " + element.speakers;
              console.log(str)
            })
          })
          choix();
          break;
        }
        case "99":{
          rl.close();
          break;
        }
      }
  });
}
