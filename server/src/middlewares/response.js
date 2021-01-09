/**
 * Response injection middleware
 */
const responseMiddleware = (req, res, next) => {
  /**
   * Response injection middleware
   */
  res.parseReturn = ({ errors = null, status = 200, data = null }) =>
    res.status(status).json({
      errors,
      status,
      data,
    });
  next();
};

module.exports = { responseMiddleware };
