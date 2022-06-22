const User = require('../models/User')
const ApiError = require("../errors/ApiError")

class UserService {

  static async getAllUsers() {
    try {
      const users = await User.find();

      return users;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async getOneUser(id) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async getUserByName(username) {
    try {
      const user = await User.findOne({ username });

      return user;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async createUser(username, password, roles) {
    try {
      const user = await User.create({ username, password, roles });
      
      return user;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async createAdmin(username, password) {
    try {
      const roles = ["admin", "user"];
      const user = await User.create({ username, password, roles, predefined: true });
      
      return user;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async changeUser(id, params) {
    try {
      const user = await User.findById(id);
      if (user) {
        if ('password' in params) {
          user.password = params.password;
        }

        if ('roles' in params) {
          user.roles = params.roles;
        }

        if ('banned' in params) {
          user.banned = params.banned;
        }

        await user.save();

        return user;
      }

      return null;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id);

      return user;
    } catch (err) {
      throw ApiError.internalError(err.message);
    }
  }

}

module.exports = UserService