const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  res.status(status).send({
    message: err.message,
  });
  next();
};

module.exports = errorHandler;
