var service = require('./service');
var menu = require('./menu');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function() {
  chargement();
};

function chargement(){
  rl.question(menu.afficher(), function(saisie) {
    switch (saisie) {
      case '1':
        service.init(function(nb) {
          console.log('[init]', nb, 'sessions trouvées.')
        });
        chargement();
        break;
      case '2':
        service.listerSessions(function(chaine) {
          console.log(chaine)
        });
        chargement();
        break;
      case '99':
        rl.close();
        break;
    }
  });
}
