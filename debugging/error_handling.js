/**
 * Created by bert on 3/30/16.
 */
var Bunyan = require('bunyan');
var logger;
var Q = require('q');
var fs = require('fs');
var Domain = require('domain');
var domain;

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

// Using Domain for 'sandboxing' errors (and code)
domain = Domain.create();

domain.on('error', function (error) {
    logger.error('Domain error', error.message);
});


// Testing calling code for error handling.
console.log(parseJSONAndUse('it will not work'));

// Testing code for throwing uncaught exception.
fs.readFile('idonotexist.txt', function (error, data) {
    if (error) {
        throw error;
    }
});

// Run testing code inside domain for error handling.
domain.run(function () {
    logger.info('Is domain identical?', process.domain === domain);
    throw new Error('Error happened');
});

