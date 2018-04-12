var request = require('request');
var jsdom = require('jsdom');
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var speakers = [];

var URL_TALKS = 'http://www.breizhcamp.org/json/talks.json'
var URL_OTHERS = 'http://www.breizhcamp.org/json/others.json'
var URL_SPEAKERS = 'http://www.breizhcamp.org/conference/speakers/'

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
    request(URL_SPEAKERS, {}, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }
            var dom = new jsdom.JSDOM(body);
            var langs = dom.window.document.querySelectorAll('.speaker');
            langs.forEach(lg => {
                var name = lg.querySelector('.media-heading').innerHTML;
                speakers.push({
                    "name":name
            });
        });
    })
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

exports.listerPresentateurs = function (callback) {
    if(speakers.length == 0){
        exports.init(function(nb){
            callback(speakers);
        }); 
    } else {
        callback(speakers);
    }
};