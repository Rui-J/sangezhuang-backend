const Sequelize = require('sequelize');
const config = require('../config');
// const uuidv4 = require('uuid/v4');


console.log('init sequelize...');

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    'underscored': true,
    'charset': 'utf8mb4'
  },
  timestamps: true
});


const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  let attrs = {};
  Object.keys(attributes).forEach((key) => {
    let value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  })

  attrs.id = Object.assign({
    type: ID_TYPE,
    primaryKey: true
  }, attrs.id || {});
  // console.log(attrs)
  return sequelize.define(name, attrs, {
    tableName: name,
    version: true
  })
}


const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
  defineModel: defineModel,
  sync: () => {
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({
        force: true
      });
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;

module.exports = exp;