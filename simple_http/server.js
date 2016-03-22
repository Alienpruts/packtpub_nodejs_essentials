/**
 * Created by bert on 3/21/16.
 */
var Http = require('http');
var Router = require('router');

var counter = 0;
var mesages = {};

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

router.use(function (request, response, next) {
    console.log('middleware executed');
    // next NULL because there were no errors.
    //if error, we could call next(error).
    next(null);
})

function createMessage(request, response){
    var id = counter += 1;
    console.log('Creating message ', id);
    response.writeHead(201, {
        'Content-Type': 'text/plain',
    });
    response.end('Message ' + id);
}

router.post('/message', createMessage);

server.listen(3000, function () {
    console.log("listening on port 3000");
});
