const devError = (err, res) => {
  return (status, statusCode, message, stack) => {
    res.status(statusCode).json({
      status,
      message,
      stack,
    });
  };
};

const prodError = (err, res) => {
  return (status, statusCode, message) => {
    res.status(statusCode).json({
      status,
      message,
    });
  };
};

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'Error';
  const message = err.message || 'Server Error';
  const stack = err.stack;

  if (process.env.NODE_ENV === 'development') {
    devError(err, res)(status, statusCode, message, stack);
  }
  if (process.env.NODE_ENV === 'production') {
    prodError(err, res)(status, statusCode, message);
  }
};
