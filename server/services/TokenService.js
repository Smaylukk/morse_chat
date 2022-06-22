const jwt = require("jsonwebtoken");
const config = require("../config/token");
const ApiError = require("../errors/ApiError");

const sign = async (playload, secretToken, options) => {
  try {
    const token = jwt.sign(playload, secretToken, options);
    return token;
  } catch (err) {
    throw ApiError.internalError(err.message);
  }
};

const createAccessToken = async user => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      roles: user.roles,
    };

    const options = {
      expiresIn: config.expireAccess
    };

    const token = await sign(payload, config.secretAccess, options);

    return token;
  } catch (err) {
    throw ApiError.internalError(err.message);
  }
};

const verifyAccessToken = async token => {
  try {
    const data = jwt.verify(token, config.secretAccess);

    return data;
  } catch (err) {
    return false;
  }
};

module.exports = {
  sign,
  createAccessToken,
  verifyAccessToken,
};
