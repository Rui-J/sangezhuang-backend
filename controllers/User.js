const User = require('../models/User')

const add = (data) => {
  return User.create(data)
}

const del = (data) => {
  return User.destroy(data)
}

const update = (data) => {
  return User.update(data)
}

const find = (data) => {
  return User.findOne({
    where: data
  })
}

module.exports = {
  add,
  del,
  update,
  find
}