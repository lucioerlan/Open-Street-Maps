const unauthorizedMiddleware = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 401,
      errors: [{ message: 'Unauthorized' }],
    });
  }
  next();
};

module.exports = { unauthorizedMiddleware };
