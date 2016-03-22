/**
 * Created by bert on 3/22/16.
 */

var request = require('request');

request({
    method: 'POST',
    uri: 'http://localhost:3000/message',
    body: {'message': 'bert'},
    json: true,
}, function (error, response, body) {
    //console.log('code: ' + response.statusCode);
    //console.log(body);
    //console.log(response);
    console.log(error);
});
