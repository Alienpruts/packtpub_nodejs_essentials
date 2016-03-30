/**
 * Created by bert on 3/30/16.
 */
var Bunyan = require('bunyan');
var logger;
var Q = require('q');
var fs = require('fs');

logger = Bunyan.createLogger({
    name: 'example-8',
    streams: [
        // to file.
        {
            level: Bunyan.INFO,
            path: './log.log',
        },
        // To display stdout.
        {
            level: Bunyan.INFO,
            stream: process.stdout,
        }
    ],
});

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

// Error handler example.
process.on('uncaughtException', function errorProcessHandler(error) {
    logger.fatal(error);
    logger.fatal('Fatal error encountered, exiting now');
    process.exit(1);
});

// Testing calling code for error handling.
console.log(parseJSONAndUse('it will not work'));

// Testing code for throwing uncaught exception.
fs.readFile('idonotexist.txt', function (error, data) {
    if (error) {
        throw error;
    }
});
