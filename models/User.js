const db = require('../utils/db')

module.exports = db.defineModel('users', {
  id: {
    type: db.INTEGER,
    autoIncrement: true
  },
  name: db.STRING(100),
  password: db.STRING(100),
  phone: {
    type: db.STRING(100),
    unique: true
  },
  gender: {
    type: db.BOOLEAN,
    allowNull: true
  }
});