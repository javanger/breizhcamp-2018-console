var request = require('request')
var jsdom = require('jsdom');
var fs = require('fs');
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var presentateurs = [];

exports.init = function (callback) {

  request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
    request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
    // body contient les données récupérées
        talks = talks.concat(body);
        callback(talks.length);
    });

      // body contient les données récupérées
    talks = body;
  });

  request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
      var dom = new jsdom.JSDOM(body);
      var speaker = dom.window.document.querySelectorAll('.speaker');
      speaker.forEach(function(pr) {
          presentateurs = presentateurs.concat(pr.querySelector('.media-heading').innerHTML);
      });
  });
};

exports.listerSessions = function (callback){
  callback(talks);
};

exports.listerPresentateur = function (callback){
      callback(presentateurs);
};
