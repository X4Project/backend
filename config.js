require('dotenv').config();

module.exports = {
  SUPPRESS_NO_CONFIG_WARNING: process.env.SUPPRESS_NO_CONFIG_WARNING,
  PORT: process.env.PORT,
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
