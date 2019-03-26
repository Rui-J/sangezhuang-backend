const jwt = require('jsonwebtoken')
const config = require('../config')

let {
  privateKey,
  noAuth
} = config;
// Authorization
async function jsonwebtoken(ctx, next) {
  if (!noAuth.includes(ctx.url)) {
    let token = ctx.header.authorization
    if (token) {
      try {
        await jwt.verify(token, privateKey)
        await next()
      } catch (error) {
        ctx.body = {
          code: 401
        }
      }
    } else {
      ctx.body = {
        code: 401
      }
    }
  } else {
    await next()
  }
}

module.exports = function (param) {
  return jsonwebtoken
}