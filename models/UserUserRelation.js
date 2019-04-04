const db = require('../utils/db')

module.exports = db.defineModel('user-user-relation', {
  id: {
    type: db.INTEGER,
    autoIncrement: true
  },
  user_id: db.INTEGER,
  from_user: db.INTEGER,
  remark: db.STRING(100),
});