const fs = require('fs');
const path = require('path');

const createAllTables = () => {
  let files = fs.readdirSync(path.resolve(__dirname, '../models'));
  files.forEach((item) => {
    if (item.endsWith('.js')) {
      require(path.resolve(__dirname, '../models', item)).sync()
    }
  })
}

createAllTables()