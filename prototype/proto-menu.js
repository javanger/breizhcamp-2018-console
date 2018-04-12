var readline = require("readline");
var service = require("../service.js");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var menu =
  "\n\n*************************\n" +
  "1. Rafraichir les données\n" +
  "2. Lister les sessions\n" +
  "3. Lister les présentateurs\n" +
  "99. Quitter\n\n";

var saisir = saisie => {
  choixService(saisie);
};

var afficher = s => {
  rl.question(menu, s);
};

var lister = data => {
  tasks.forEach(element => {});
};

var choixService = choix => {
  if (choix == "99") rl.close();
  else {
    // attention, une fois l'interface fermée, la saisie n'est plus possible
    if (choix == "1") {
      service.init(nb => {
        console.log("[init]", nb, "sessions trouvées.");
        console.log("... Données mise à jour");
        afficher(saisir);
      });
    } else if (choix == "2") {
      service.listerSessions(data => {
        console.log(data.map(e => `${e.name} (${e.speakers})`));
        afficher(saisir);
      });
    } else if (choix == "3") {
      service.listerPresentateur(data => {
        console.log(data);
        afficher(saisir);
      })
    }
  }
};

afficher(saisir);
