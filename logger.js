const { createLogger, format, transports } = require('winston');
const { config } = require('./config.js');

const logger = createLogger({
    level: config.get('loglevel'),
    format: format.combine(
      format.colorize(),
      format.splat(),
      format.simple(),
    ),
    transports: [new transports.Console()]
});

module.exports = logger;