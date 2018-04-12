var talks = [];
var request = require("request");

exports.init = function(callback) {
  request("http://www.breizhcamp.org/json/talks.json", { json: true }, function(
    err,
    res,
    body
  ) {request(
    "http://www.breizhcamp.org/json/others.json",
    { json: true },
    function(err, res, body) {
      if (err) {
        return console.log("Erreur", err);
      }

      // body contient les données récupérées
      talks=talks.concat(body);
      callback(talks.length);
    });


    talks = body;
  });

 
 
  
  
};

exports.listerSessions = function(callback){
callback(talks);
};
