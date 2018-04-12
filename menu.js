
exports.afficher = function() {
  var menu = "";
  menu = menu.concat("*************************\n");
  menu = menu.concat("1. Rafraichir les données\n");
  menu = menu.concat("2. Lister les sessions\n");
  menu = menu.concat("3. Lister les présentateurs\n");
  menu = menu.concat("99. Quitter\n");
  menu = menu.concat("\n");
  return menu;
};
