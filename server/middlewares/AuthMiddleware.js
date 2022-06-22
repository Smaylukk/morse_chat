const ApiError = require("../errors/apiError");
const { sign, createAccessToken, verifyAccessToken } = require("../services/tokenService");

class AuthMiddleware {
  static async checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const authorization = req.headers.authorization;
      if (!authorization || authorization.indexOf('Bearer') === -1) {
        return next(ApiError.unautorizeError('Користувач не авторизований - відсутній токен'))
      }

      const token = authorization.split(' ')[1]
      if (!token) {
        return next(ApiError.unautorizeError('Користувач не авторизований - токен пустий'))
      }

      req.user = await verifyAccessToken(token);
      next();
    } catch (error) {
      return next(ApiError.internalError(`Помилка під час авторизації - ${error.message}`))
    }
  }

  static adminCheck(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const { user } = req;
      if (!user) {
        return next(ApiError.forbiddenError('У вас відсутній доступ'))
      }

      next();
    } catch (error) {
      return next(ApiError.internalError(`Помилка під час авторизації - ${error.message}`))
    }
  }
}

module.exports = AuthMiddleware;
