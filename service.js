var request = require("request");
var jsdom = require("jsdom");
// tableau qui contiendra toutes les sessions du BreizhCamp

var talks = [];
var groot = [];

var URL_API = "http://www.breizhcamp.org/json/talks.json";
var URL_OTHER = "http://www.breizhcamp.org/json/others.json";
var URL_P = "http://www.breizhcamp.org/conference/speakers/";
exports.init = function(callback) {
  request(URL_API, { json: true }, function(err, res, body) {
    request(URL_OTHER, { json: true }, function(err, res, body) {
      if (err) {
        return console.log("Erreur", err);
      }
      talks = talks.concat(body);
      callback(talks.length);
    });
    if (err) {
      return console.log("Erreur", err);
    }
    talks = body;

    request(URL_P, {}, function(err, res, body) {
      if (err) {
        return console.log("Erreur", err);
      }
      var dom = new jsdom.JSDOM(body);
      var nm = dom.window.document.querySelectorAll(".speaker .media-heading");
      
      nm.forEach(function(lg) {
       

        groot.push({
          'name': lg.innerHTML
        });
        
      });
    });
  });
};

exports.listerSessions = function(callback) {
  var t = "";
  talks.forEach(function(talk) {
    t = t.concat(talk.name + " ( " + talk.speakers + " )\n");
  });
  callback(t);
};

exports.listerPresentateurs = function(callback) {
  callback(groot);
};
