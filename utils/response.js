class Responses {
  handleSuccess(statusCode, message, res, data = null) {
    return res.status(statusCode).json(
      data
        ? {
            status: 'success',
            message,
            data,
          }
        : {
            status: 'success',
            message,
          }
    );
  }

  handleError(statusCode, message, res) {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}

export default new Responses();
