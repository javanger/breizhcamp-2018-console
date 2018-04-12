var request = require('request');

reqnoduest('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    console.log(body);
});