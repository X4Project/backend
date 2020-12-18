const httpStatus = require('http-status');
const createError = require('http-errors');

const response = (httpStatusCode, errorMessage, errorCode, data) => {
  return {
    httpStatusCode,
    errorCode,
    errorMessage,
    data
  };
};

const ResponseMessage = {
  SuccessResponse: (res, data, statusCode = 200) => {
    res.status(statusCode).json(response(statusCode, null, null, data));
  },
  BadRequest: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response(httpStatus.BAD_REQUEST, errorCode, serverError));
  },
  NoContent: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.NO_CONTENT)
      .json(response(httpStatus.NO_CONTENT, errorCode, serverError));
  },
  Unauthorized: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(response(httpStatus.UNAUTHORIZED, errorCode, serverError));
  },
  Forbidden: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.FORBIDDEN)
      .json(response(httpStatus.FORBIDDEN, errorCode, serverError));
  },
  NotFound: (res, serverError = '', errorCode) => {
    res
      .status(httpStatus.NOT_FOUND)
      .json(response(httpStatus.NOT_FOUND, errorCode, serverError));
  },
  MethodNotAllowed: (res, serverError = '') => {
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .json(
        response(
          httpStatus.METHOD_NOT_ALLOWED,
          createError(httpStatus.METHOD_NOT_ALLOWED),
          serverError
        )
      );
  },
  InternalServerError: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(response(httpStatus.INTERNAL_SERVER_ERROR, errorCode, serverError));
  },
  Conflict: (res, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.CONFLICT)
      .json(response(httpStatus.CONFLICT, errorCode, serverError));
  }
};

module.exports = ResponseMessage;
