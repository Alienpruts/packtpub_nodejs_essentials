/**
 * Created by bert on 3/30/16.
 */
var Q = require('q');

function parseJSONAndUse(input) {
    var json = null;

    try {
        json = JSON.parse(input);
        console.log(json);
    } catch (error) {
        return Q.reject(new Error("Couldn't parse JSON"));
    }

    return Q(use(json));
}

console.log(parseJSONAndUse('it will not work'));