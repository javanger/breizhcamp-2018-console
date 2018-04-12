// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
const request = require('request');
var urlConf = 'https://www.breizhcamp.org/json/talks.json';
var urlKeynote = 'http://www.breizhcamp.org/json/others.json';

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

};

exports.listerSessions = function (callback) {
  var value = "";
  talks.forEach(function(talk) {
    value = value.concat(talk.name+ " ("+ talk.speakers+")\n");
  });
  callback(value);
};
