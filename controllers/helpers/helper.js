exports.serverResponse = (res, status, code, token, results) => {
  res.status(code).json({
    status,
    items: results.length,
    token,
    data: {
      results,
    },
  });
};

exports.catchServerError = (err, status, statusCode, message) => {
  err.status = status;
  err.statusCode = statusCode;
  err.message = message;
};

exports.serverError = (status, statusCode, message) => {
  return (err = {
    status,
    statusCode,
    message,
  });
};
