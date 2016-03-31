/**
 * Created by bert on 3/30/16.
 */
var Config = require('./config.json');
var Http = require('http');

Http.createServer(function (request, response) {
}).listen(Config.port, Config.host, function () {
    console.log('Listening on port', Config.port, 'and host', Config.host);
});