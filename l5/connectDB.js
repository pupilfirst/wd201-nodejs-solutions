const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  sequelize,
  connect,
};
