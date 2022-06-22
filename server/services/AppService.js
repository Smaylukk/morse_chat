const User = require("../models/User");
const { hashPassword } = require("./PasswordService");
const UserService = require("./UserService")

const appStart = async () => {
  const user = await UserService.getUserByName("admin");

  if (!user) {
    return await createAdmin();
  }
}

const createAdmin = async () => {
  const password = await hashPassword("admin");
  const user = await UserService.createAdmin("admin", password );
  
  return user;
}

module.exports = appStart;