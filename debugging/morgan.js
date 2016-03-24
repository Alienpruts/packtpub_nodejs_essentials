/**
 * Created by bert on 3/24/16.
 */

var Morgan = require('morgan');
var Router = require('router');
var Http = require('http');

router = new Router();

router.use(Morgan('combined'));

Http.createServer(function (request, response) {
    router(request, response, function (error) {
        if (!error) {
            response.writeHead(404);
        } else {
            console.log(error.message, error.stack);
            response.writeHead(400);
        }
        response.end('\n');
    })
}).listen(3000);

console.log('Server running on port 3000');

function getInfo(request, response) {
    var info = process.versions;

    info = JSON.stringify(info);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(info);
}

router.get('/info', getInfo);