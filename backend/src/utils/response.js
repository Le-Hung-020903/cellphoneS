module.exports = {
  successResponse: (res, status, message, data, options = {}) => {
    const response = {
      status,
      message,
      data,
      ...options,
    };
    return res.status(status).json(response);
  },

  errorResponse: (res, status, message, errors = {}) => {
    const response = {
      status,
      message,
      errors,
    };
    return res.status(status).json(response);
  },
};
