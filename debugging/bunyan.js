/**
 * Created by bert on 3/24/16.
 */
var Bunyan = require('bunyan');
var logger;

logger = Bunyan.createLogger({
    name: 'example-8',
});

logger.trace('Trace');
logger.debug('Debug');
logger.info('Info');
logger.warn('Warn');
logger.error('Error');
logger.fatal('Fatal');

logger.fatal('We have a fatal, ABORT ABORT');

process.exit(1);