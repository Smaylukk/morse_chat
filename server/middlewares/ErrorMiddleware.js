const ApiError = require("../errors/ApiError");

module.exports = function(error, req, res, next){
  if (error instanceof ApiError) {
    return res.status(error.status).json({ status: error.status, message: error.message});
  }

  return res.status(500).json({ message: `Непередбачувана помилка - ${error}` });
}