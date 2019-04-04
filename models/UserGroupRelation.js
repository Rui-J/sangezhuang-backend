const db = require('../utils/db')

module.exports = db.defineModel('user-group-relation', {
  id: {
    type: db.INTEGER,
    autoIncrement: true
  },
  user_id: db.INTEGER,
  group_id: db.INTEGER,
});