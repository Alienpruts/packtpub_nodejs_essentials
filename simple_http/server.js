/**
 * Created by bert on 3/21/16.
 */
var Http = require('http');
var Router = require('router');
var BodyParser = require('body-parser');

var counter = 0;
var messages = {};

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

//read all requests as plain text.
// method in book is deprecated, using json instead.
// http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
router.use(BodyParser.json());

function createMessage(request, response){
    var id = counter += 1;
    var message = request.body['message'];
    console.log('Creating message ', id, message);
    messages[id] = message;

    response.writeHead(201, {
        'Content-Type': 'text/plain',
        'Location': '/message/' + id,
    });
    response.end(message);
}

function readMessage(request, response) {
    var id = request.params.id;
    var message = messages[id];

    if (typeof message !== 'string') {
        console.log('Message not found', id);

        response.writeHead(404);
        response.end('\n');
        return;
    }

    console.log('Reading message', id, message);

    response.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    response.end(message);
}

function deleteMessage(request, response) {
    var id = request.params.id;
    var message = messages[id];

    if (typeof message !== 'string') {
        console.log('Message not found', id);

        response.writeHead(404);
        response.end('\n');
        return;
    }
    console.log('Deleting message', id);

    messages[id] = undefined;

    response.writeHead(204, {});
    response.end('');

}

router.post('/message', createMessage);
router.get('/message/:id', readMessage);
router.delete('/message/:id', deleteMessage);

server.listen(3000, function () {
    console.log("listening on port 3000");
});
