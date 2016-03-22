/**
 * Created by bert on 3/21/16.
 */
var Http = require('http');
var Router = require('router');

var router = new Router();

var server = Http.createServer(function (request, response) {
    router(request, response, function (error) {
        if (!error) {
            response.writeHead(404);
        } else {
            // Handle errors.
            console.log(error.message, error.stack);
            response.writeHead(400)
        }
        response.end('\n');
    });

});

server.listen(3000, function () {
    console.log("listening on port 3000");
});
