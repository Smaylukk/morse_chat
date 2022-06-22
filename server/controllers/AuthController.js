const ApiError = require("../errors/ApiError")
const {User} = require('../models/User');
const { hashPassword, checkPassword } = require("../services/PasswordService");
const { createAccessToken, verifyAccessToken } = require("../services/TokenService");
const UserService = require("../services/UserService");

class AuthController {

  static async signUp(req, res, next){
    try {
      const {username, password} = req.body
  
      const candidate = await UserService.getUserByName(username);
      if (candidate) {
        return next(ApiError.badRequestError(`Користувач з username ${username} вже створений`));
      }
  
      const roles = ['user'];
      const passHash = await hashPassword(password)
      const user = await UserService.createUser(username, passHash, roles);
  
      const token = await createAccessToken(user);
  
      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }

  static async signIn(req, res, next){
    try {
      const { username, password } = req.body

      const user = await UserService.getUserByName(username);
      if (!user) {
        return next(ApiError.badRequestError(`Користувача не знайдено`));
      }

      if (!user.banned) {
        return next(ApiError.badRequestError(`Користувача забанено`));
      }

      const isPassValid = await checkPassword(password, user.password);
      if (!isPassValid) {
        return next(ApiError.badRequestError(`Email чи пароль неправильний`));
      }

      const token = await createAccessToken(user);  

      return res.json(token);
    } catch (error) {
      return next(ApiError.badRequestError(error.message))
    }
  }

  static async check(req, res, next) {
    try {
      const token = req.user;

      if (token) {
        const user = await UserService.getOneUser(token.id);
        const newtoken = await createAccessToken(user);

        return res.json(newtoken);
      } else {
        next(ApiError.unautorizeError('Помилка перевірки авторизації'));
      }
    } catch (error) {
      next(ApiError.internalError('Непередбачувана помилка - ' + error));
    }
  }
}

module.exports = AuthController