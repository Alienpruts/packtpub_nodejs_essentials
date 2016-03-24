/**
 * Created by bert on 3/24/16.
 */

var Http = require('http');

Http.createServer(function (request, response) {
    console.log('Recieved request', request.method, request.url);

    console.log('Returning 200');

    response.writeHead(200, {'Content-Type': 'text-plain'});
    response.end('Hello World\n');
}).listen(3000);

console.log('Running server on port 3000');
