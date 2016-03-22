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
    var message = 200;

    count += 1;

    switch (request.url) {
        case '/count':
            message = count.toString();
            break;
        case '/hello':
            message = 'World';
            break;
        default:
            status = 404;
            message = 'Not found';
            break;
    }

    response.writeHead(status, {
        'Content-Type': 'text/plain',
    });

    console.log(message);
    response.end(message);
}