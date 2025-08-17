require('ts-node/register');
const { development, test, production } = require('./src/config/database.ts');

module.exports = {
  development,
  test,
  production,
};