/**
 * Created by bert on 3/21/16.
 */
var Http = require('http');
var server = Http.createServer(requestHandler);
var count = 0

server.listen(3000, function () {
    console.log("listening on port 3000");
});

function requestHandler(request, response) {
    var message;
    count += 1;
    response.writeHead(201, {
        'Content-Type': 'text/plain',
    });

    message = 'Visitor count: ' + count + ' with path : ' + request.url;
    console.log(message);
    response.end(message);
}