/**
 * Created by bert on 3/24/16.
 */
var Bunyan = require('bunyan');
var logger;

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

//logger.info(process.versions);
logger.info('Application started');

/*
logger.trace('Trace');
logger.debug('Debug');
logger.info('Info');
logger.warn('Warn');
logger.error('Error');
logger.fatal('Fatal');

logger.fatal('We have a fatal, ABORT ABORT');
*/

/*try {
    ref.go();
} catch (error) {
    logger.error(error);
}*/

try {
    a = function (callback) {
        return function () {
            callback();
        };
    };
    b = function (callback) {
        return function () {
            callback();
        };
    };
    c = function (callback) {
        return function () {
            throw new Error("I'm just messing with ya :) ");
        };
    };
    a(b(c()))();
} catch (error) {
    logger.error(error);
}

//process.exit(1);