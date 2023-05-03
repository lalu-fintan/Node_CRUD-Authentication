const { constance } = require("../constance");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constance.VALIDATION_ERROR:
      res.json({
        title: "Not Found",

        message: err.message,
        stackTrace: errorHandler.stack,
      });
      break;
    case constance.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: errorHandler.stack,
      });
      break;
    case constance.UNAUTHERIZED:
      res.json({
        title: "Un autherized",
        message: err.message,
        stackTrace: errorHandler.stack,
      });
      break;
    case constance.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: errorHandler.stack,
      });
      break;
    case constance.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: errorHandler.stack,
      });
      break;
    default:
      console.log("No error all good!");
      break;
  }
};
module.exports = errorHandler;
