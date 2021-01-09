const { createLogger, format, transports } = require('winston');

const { combine, timestamp, simple } = format;
const { datetimeNow } = require('../utils/current');
require('dotenv').config();

/**
 * Gets the logger instance
 * @returns {LoggerInstance} winLogger
 */

const timezonedTime = () => {
  return datetimeNow();
};

const logger = createLogger({
  format: combine(timestamp({ format: timezonedTime }), simple()),
  transports: [
    new transports.Console({
      colorize: true,
    }),
    new transports.File({
      filename: 'tracking.log',
      maxsize: '100mb',
    }),
  ],
});

module.exports = {
  logger,
};
