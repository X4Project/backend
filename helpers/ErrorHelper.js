const httpStatus = require('http-status');
const createError = require('http-errors');

const response = (
  httpStatusCode,
  responseClient,
  responseServer,
  messageErrorCode = 1
) => {
  return {
    httpStatusCode,
    responseClient,
    responseServer,
    messageErrorCode
  };
};

const ResponseMessage = {
  BadRequest: (res, serverError) => {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(
        response(
          httpStatus.BAD_REQUEST,
          createError(httpStatus.BAD_REQUEST),
          serverError
        )
      );
  },
  NoContent: (res, serverError) => {
    res
      .status(httpStatus.NO_CONTENT)
      .json(
        response(
          httpStatus.NO_CONTENT,
          createError(httpStatus.NO_CONTENT),
          serverError
        )
      );
  },
  Unauthorized: (res, serverError) => {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(
        response(
          httpStatus.UNAUTHORIZED,
          createError(httpStatus.UNAUTHORIZED),
          serverError
        )
      );
  },
  Forbidden: (res, serverError) => {
    res
      .status(httpStatus.FORBIDDEN)
      .json(
        response(
          httpStatus.FORBIDDEN,
          createError(httpStatus.FORBIDDEN),
          serverError
        )
      );
  },
  NotFound: res => {
    res
      .status(httpStatus.NOT_FOUND)
      .json(
        response(
          httpStatus.NOT_FOUND,
          createError(httpStatus.NOT_FOUND),
          createError(httpStatus.NOT_FOUND)
        )
      );
  },
  MethodNotAllowed: (res, serverError) => {
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
  InternalServerError: res => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        response(
          httpStatus.INTERNAL_SERVER_ERROR,
          createError(httpStatus.INTERNAL_SERVER_ERROR),
          createError(httpStatus.INTERNAL_SERVER_ERROR)
        )
      );
  },
  Conflict: (res, serverError) => {
    res
      .status(httpStatus.CONFLICT)
      .json(
        response(
          httpStatus.CONFLICT,
          createError(httpStatus.CONFLICT),
          serverError
        )
      );
  }
};

module.exports = ResponseMessage;
