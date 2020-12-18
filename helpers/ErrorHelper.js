const httpStatus = require('http-status');
const createError = require('http-errors');

const response = (httpStatusCode, errorMessage, errorCode, data) => {
  return {
    httpStatusCode,
    errorMessage,
    errorCode,
    data
  };
};

const ResponseMessage = {
  SuccessResponse: (res, data, statusCode = 200) => {
    res.status(statusCode).json(response(statusCode, null, null, data));
  },
  BadRequest: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response(httpStatus.BAD_REQUEST, serverError, errorCode, data));
  },
  NoContent: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.NO_CONTENT)
      .json(response(httpStatus.NO_CONTENT, serverError, errorCode, data));
  },
  Unauthorized: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(response(httpStatus.UNAUTHORIZED, serverError, errorCode, data));
  },
  Forbidden: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.FORBIDDEN)
      .json(response(httpStatus.FORBIDDEN, serverError, errorCode, data));
  },
  NotFound: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.NOT_FOUND)
      .json(response(httpStatus.NOT_FOUND, serverError, errorCode, data));
  },
  MethodNotAllowed: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .json(
        response(httpStatus.METHOD_NOT_ALLOWED, serverError, errorCode, data)
      );
  },
  InternalServerError: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        response(httpStatus.INTERNAL_SERVER_ERROR, serverError, errorCode, data)
      );
  },
  Conflict: (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.CONFLICT)
      .json(response(httpStatus.CONFLICT, serverError, errorCode, data));
  }
};

module.exports = ResponseMessage;
