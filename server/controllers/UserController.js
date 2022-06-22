const ApiError = require('../errors/apiError');
const User = require('../models/user');
const { hashPassword } = require("../services/passwordService");
const { getAllUsers, getOneUser, createUser, changeUser, deleteUser } = require("../services/userService");

class UserController {

  static async getAll(req, res, next) {
    try {
      const users = await getAllUsers();

      return res.status(200).json(users);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await getOneUser(id);

      return res.status(200).json(user);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  static async create(req, res, next) {
    try {
      const { username, password, roles } = req.body;

      const passHash = await hashPassword(password)
      if (!roles) {
        roles = ['user']
      }

      const user = await createUser(username, passHash, roles);
      return res.status(200).json(user);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  static async change(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;
      body.password = await hashPassword(body.password);
      const user = await changeUser(id, req.body);
      if (user) {
        return res.status(200).json(user);
      }

      return next(ApiError.badRequestError('Валюту не знайдено'))
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }

  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await deleteUser(id);

      return res.status(200).json(user);
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

}

module.exports = UserController
