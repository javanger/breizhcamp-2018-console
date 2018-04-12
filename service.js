// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var speakers = [];
var request = require('request');
var jsdom = require('jsdom');
var urlConf = 'https://www.breizhcamp.org/json/talks.json';
var urlKeynote = 'http://www.breizhcamp.org/json/others.json';
var urlPresentateur = 'http://www.breizhcamp.org/conference/speakers/';

exports.init = function (callback) {
   request(urlConf, { json: true }, (err, res, body) => {
     request(urlKeynote, { json: true }, (err, res, body) => {
       if (err) { return console.log(err); }
        talks = talks.concat(body);
        callback(talks.length);
      });
     if (err) { return console.log(err); }
      talks = body;
    });
    request(urlPresentateur, {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll('.speaker');
        langs.forEach(function(lg) {
            var name = lg.querySelector('.media-heading').innerHTML;
            if (lg.querySelector("div p") != null) {
              var bio = lg.querySelector("div p").innerText;
            }
            speakers.push({
              "name":name,
              "bio":bio
            });
        });
    });
};

exports.listerSessions = function (callback) {
  callback(talks);
};

exports.listerPresentateurs = function (callback) {
  callback(speakers);
};
