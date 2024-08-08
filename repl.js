const repl = require('repl');
const { Sequelize } = require('sequelize');
const models = require('./models');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const replServer = repl.start({
  prompt: 'sequelize > ',
});

replServer.context.models = models;
replServer.context.sequelize = sequelize;

console.log('Sequelize models and instance are loaded in the REPL context.');
console.log(
  'You can access models using `models` and the Sequelize instance using `sequelize`.'
);
