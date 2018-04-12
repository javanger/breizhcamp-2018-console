var readline = require("readline");
var service = require("../service.js");

const INIT_CHOIX = "1";
const LISTER_SESSIONS_CHOIX = "2";
const LISTER_SPEAKERS_CHOIX = "3";
const CHERCHE_CHOIX = "4";
const MENU_CHOIX = "99";
const RECHERCHER_CHOIX = "98";
const QUITTER_CHOIX = "99";

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var menu =
  "\n\n*************************\n" +
  INIT_CHOIX +
  ". Rafraichir les données\n" +
  LISTER_SESSIONS_CHOIX +
  ". Lister les sessions\n" +
  LISTER_SPEAKERS_CHOIX +
  ". Lister les présentateurs\n" +
  CHERCHE_CHOIX +
  ". Rechecher une session\n" +
  QUITTER_CHOIX +
  ". Quitter\n\n";

var saisir = saisie => {
  choixService(saisie);
};

var afficher = (question, s) => {
  rl.question(question, s);
};

var lister = data => {
  tasks.forEach(element => {});
};

var sousMenu = saisie => {
  service.findSessionsWith(saisie, results => {
    var i = 0;
    var questions =
      RECHERCHER_CHOIX +
      ". Refaire une nouvelle recherche\n" +
      MENU_CHOIX +
      ". Retour au menu principal\n";
    if (results.length == 0) {
      console.log("(aucune session)");
    } else {
      // afficher la liste des sessions trouvées
      results.forEach(r => {
        console.log(++i + ". " + r + "\n");
      });
      afficher(questions, choix => {
        details(saisie, results, choix);
      });
    }
  });
};

var choixService = choix => {
  if (choix == QUITTER_CHOIX) rl.close();
  else {
    // attention, une fois l'interface fermée, la saisie n'est plus possible
    if (choix == INIT_CHOIX) {
      service.init(nb => {
        console.log("[init]", nb, "sessions trouvées.");
        console.log("... Données mise à jour");
        afficher(menu, saisir);
      });
    } else if (choix == LISTER_SESSIONS_CHOIX) {
      service.listerSessions(data => {
        console.log(data.map(e => `${e.name} (${e.speakers})`));
        afficher(menu, saisir);
      });
    } else if (choix == LISTER_SPEAKERS_CHOIX) {
      service.listerPresentateur(data => {
        console.log(data);
        afficher(menu, saisir);
      });
    } else if (choix == CHERCHE_CHOIX) {
      afficher("Quel mot recherchez vous ?  ", sousMenu);
    } else {
      afficher(menu, saisir);
    }
  }
};

var details = (saisie, data, choix) => {

  // determiner la liste de choix possible en fonction du nombre de resulats de recherche
    Array.from(Array(data.length).keys()).forEach(e => {
      // tableau commence à 0 donc incrémente de 1
      var possibleCase = e+1+"";
      if(choix == possibleCase) {
        service.findSessionByName(data[e], (res) => {
          console.log("\n\n" + 
          "name: " + res.name + "\n"+
          "description: " + res.description + "\n"
         );
        });

      }
    });

  switch (choix) {
    case MENU_CHOIX:
      afficher(menu, saisir);
      break;

    case RECHERCHER_CHOIX:
      choixService(CHERCHE_CHOIX);
      break;

    default:
      sousMenu(saisie);
      break;
  }
};

afficher(menu, saisir);
