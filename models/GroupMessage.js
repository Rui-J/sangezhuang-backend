const db = require('../utils/db')

module.exports = db.defineModel('groups-message', {
  id: {
    type: db.INTEGER,
    autoIncrement: true
  },
  from: db.INTEGER,
  to: db.INTEGER,
  text: db.STRING(500),
  time:db.INTEGER(11),
});