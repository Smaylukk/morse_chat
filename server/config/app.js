const dotenv = require("dotenv");
const path = require("path");

const root = path.join.bind(this, __dirname, "../");
dotenv.config({ path: root(".env") });

if (!process.env.PORT) {
  throw new Error("Can`t find .env config varibles for work app");
}

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  wsport: process.env.WS_PORT,
};
