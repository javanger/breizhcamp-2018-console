var service = require("./service");
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.start = function() {
  afficherMenu();
};

function afficherMenu() {
  console.log(
    " 1. Raffraichir les données \n 2. Lister les sessions \n 3. Lister les intervenants \n 99. Quitter"
  );
  rl.question("Faite votre choix : ", function(saisie) {
    switch (saisie) {
      case "1":
        service.init(function(nb) {
          console.log("[init]", nb, "sessions trouvées.");
        });
        afficherMenu();
        break;
      case "2":
        console.log(`Vous avez saisi : ${saisie}`);
        service.listerSessions(function(nb) {
          nb.forEach(element => {
              console.log(element.name + '('+ element.speakers +')');
          });
        });
        afficherMenu();
        break;
      case "3":
        service.listerPresentateur(function(nb){
            console.log(nb);
        });
        afficherMenu();
        break;
      case "99":
        rl.close();
        break;

      default:
        console.log("mauvaise saisie");
    }
  });
}
