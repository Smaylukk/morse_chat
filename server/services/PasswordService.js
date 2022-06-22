const bcrypt = require("bcryptjs");
const ApiError = require("../errors/apiError");

const checkPassword = async (password, passwordHash) => {
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch (err) {
    throw ApiError.internalError(err.message);
  }
};

const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (err) {
    throw ApiError.internalError(err.message);
  }
};

module.exports = {
  checkPassword,
  hashPassword
};
