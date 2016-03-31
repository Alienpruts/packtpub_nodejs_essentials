/**
 * Created by bert on 3/31/16.
 */
var Http = require('http');
var server_port;
var server_host;

// Arguments are collected in process.argv, where 0 and 1 are already taken
// Always provide defaults, excluding sensitive information
// This simple example is wrong on so many levels, but demonstrates the general idea.
server_port = process.argv[2] || 3000;
server_host = process.argv[3] || 'localhost';

Http.createServer(function (request, response) {
}).listen(server_port, server_host, function () {
    console.log('Listening on port', server_port, 'and host', server_host);
});