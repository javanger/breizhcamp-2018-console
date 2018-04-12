var service = require('../service')

service.init(function(nb) {
    console.log('[init]', nb, 'sessions trouvées.')
});

service.listerSessions(function(nb) {
    console.log('[init]', nb)
});
