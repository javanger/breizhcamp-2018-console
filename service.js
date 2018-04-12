var request = require("request");
// tableau qui contiendra toutes les sessions du BreizhCamp

var talks = [];
var URL_API = "http://www.breizhcamp.org/json/talks.json";
var URL_OTHER = "http://www.breizhcamp.org/json/others.json";
exports.init = function(callback) {
  request(URL_API, { json: true }, function(err, res, body) {
    request(URL_OTHER, { json: true }, function(err, res, body){
    if (err) {
      return console.log("Erreur", err); }
      talks = talks.concat(body);
      callback(talks.length);
    });
    if (err) {
        return console.log("Erreur", err); }
    talks = body;
  ;
 });
};

exports.listerSessions = function (callback) {
     var t = "";
    talks.forEach(function(talk) {
    t = t.concat(talk.name+ " ( "+ talk.speakers + " )\n");
        });
        callback(t);
      };



