const { responseMiddleware } = require('./response');
const { unauthorizedMiddleware } = require('./unauthorized');
const { securityMiddleware } = require('./security');
const { logger } = require('./logger');

module.exports = {
  responseMiddleware,
  unauthorizedMiddleware,
  securityMiddleware,
  logger
};
