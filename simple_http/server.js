/**
 * Created by bert on 3/21/16.
 */
var Http = require('http');
var server = Http.createServer();

server.listen(3000, function () {
    console.log("listening on port 3000");
});
