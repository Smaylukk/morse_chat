const User = require("../models/user");
const { hashPassword } = require("./passwordService");
const UserService = require("./userService")

const appStart = async () => {
  const user = await UserService.getUserByName("admin");

  if (!user) {
    return await createAdmin();
  }
}

const createAdmin = async () => {
  const password = await hashPassword("admin");
  const user = await UserService.createAdmin("admin", password);

  return user;
}

module.exports = appStart;
