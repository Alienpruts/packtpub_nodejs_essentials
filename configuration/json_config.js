/**
 * Created by bert on 3/30/16.
 */
var Config = require('./config.json');
var Http = require('http');

Http.createServer(function (request, response) {
}).listen(Config.server.port, Config.server.host, function () {
    console.log('Listening on port', Config.server.port, 'and host', Config.server.host);
    console.log('\nAlso (fictively) contacting Database server on port', Config.database.port, 'on host', Config.database.host);
});