// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var request = require('request')

exports.init = function (callback) {

  request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
    request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {


        // body contient les données récupérées
        talks = talks.concat(body);
        callback(talks.length)
    });

      // body contient les données récupérées
    talks = body;
  });

};

exports.listerSessions = function (callback){
  callback(talks)
};
