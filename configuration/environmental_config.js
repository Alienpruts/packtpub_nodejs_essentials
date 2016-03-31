/**
 * Created by bert on 3/31/16.
 */
var Http = require('http');
var server_port;
var server_host;

// ParseInt because environ param are brought ein as strings!
//console.log(typeof process.env.FOO_SERVER_PORT);
server_port = parseInt(process.env.FOO_SERVER_PORT, 10);
server_host = process.env.FOO_SERVER_HOST;

Http.createServer(function (request, response) {
}).listen(server_port, server_host, function () {
    console.log('Listening on port', server_port, 'and host', server_host);
});