const db = require('../utils/db')

module.exports = db.defineModel('groups', {
  id: {
    type: db.INTEGER,
    autoIncrement: true
  },
  name: db.STRING(100),
  creator_id: db.INTEGER,
  description: db.STRING(200),
});