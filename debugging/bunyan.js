/**
 * Created by bert on 3/24/16.
 */
var Bunyan = require('bunyan');
var logger;

logger = Bunyan.createLogger({
    name: 'example-8',
});

logger.info('Hello Logging');