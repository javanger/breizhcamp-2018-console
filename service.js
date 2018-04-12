var request = require('request');
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

var URL_TALKS = 'http://www.breizhcamp.org/json/talks.json'
var URL_OTHERS = 'http://www.breizhcamp.org/json/others.json'

exports.init = function (callback) {
    request(URL_TALKS, { json: true }, (err, res, body) => {
        request(URL_OTHERS, { json: true }, (err, res, body) => {
            if (err) { return console.log('Erreur', err); }
            talks = talks.concat(body);
            callback(talks.length);
        });
        if (err) { return console.log('Erreur', err); }
        talks = body;
    });
};

exports.listerSessions = function (callback) {
    if(talks.length == 0){
        exports.init(function(nb){
            callback(talks);
        }); 
    } else {
        callback(talks);
    }
};