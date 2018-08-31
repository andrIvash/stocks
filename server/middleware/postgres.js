//db
const Sequelize = require('sequelize');
const HttpError = require('./error');
const winston = require('./winston');

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

const models = {
  Town: sequelize.import('../models/town'),
};

sequelize
  .authenticate()
  .then(() => {
    winston.info('Connection to DB has been established successfully');
  })
  .catch(err => {
    winston.error(`Unable to connect to the database: ${err}`);
  });

module.exports = {
  sequelize,
  models
}; 