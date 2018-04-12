var service = require('./service');

var URL = 'http://www.breizhcamp.org/json/talks.json';

exports.start = function () {

    service.init(URL, function (nb) {

        console.log('[init]', nb, 'sessions trouvées.')

    });
};