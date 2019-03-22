const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';
const noAuth = require('./noAuth.js')
const fs = require('fs');

let config = null;
config = require(testConfig);
config.buseUrl = '/api/v1';
config.noAuth = noAuth.map((item) => {
  return config.buseUrl + item
})
// if(process.env.NOED_ENV==='test'){
//   config = require(testConfig);
// }

module.exports = config;