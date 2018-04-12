var service = require('./service');

exports.start = function() {
    service.init((nb) => {
        console.log('[init]', nb, 'sessions trouvées.')
    });
};