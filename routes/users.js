const Router = require('koa-router')
const http = require('http')
const User = require('../controllers/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = new Router({
  prefix: "users"
});
// function sendValiCode() {
//   return new Promise((resolve, reject) => {
//     let vailCode = '';
//     for (let index = 0; index < 4; index++) {
//       vailCode += Math.floor(Math.random() * 10)
//     }
//     let options = {
//       host: 'sc.ftqq.com',
//       path: `/SCU42575T9981abe4c8fbed8d9d24b7e3c910d00f5c45a7e70e246.send?text='验证码'&desp:${vailCode}`,
//     };
//     const req = http.request(options, (res) => {
//       console.log(res)
//       res.on('end', () => {
//         console.log("end")
//         resolve(vailCode)
//       });
//     })
//     req.on('error', (e) => {
//       console.log("error")
//       reject(e)
//     });
//     req.end();
//   })
// }
router.post('/getValiCode', async (ctx) => {
  // ctx.body = await sendValiCode()
  ctx.body = {
    data: {
      valiCode: 1111
    }
  }
}).post('/signup', async (ctx) => {
  // 注册
  let {
    name,
    phone,
    password,
  } = ctx.request.body
  if (!phone || !password || !name) {
    ctx.body = {
      code: 400,
    }
  } else {
    let data1 = await User.find({
      phone,
    })
    if (data1) {
      ctx.body = {
        code: 121,
      }
    } else {
      let data = await User.add({
        phone,
        password,
        name
      })
      ctx.body = {
        data
      }
    }
  }
}).post('/signin', async (ctx) => {
  // 登陆
  let {
    phone,
    password,
  } = ctx.request.body
  if (!phone || !password) {
    ctx.body = {
      code: 400,
    }
    return;
  }
  let data = await User.find({
    phone,
  })
  //登录成功
  if (data && data.password === password) {
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
    }, config.privateKey);
    ctx.set('authorization', token);
    ctx.body = {
      data
    }
  } else {
    ctx.body = {
      code: 120,
    }
  }
})
// 刷新token
router.get('/refreshRoken', async (ctx) => {
  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
  }, config.privateKey);
  ctx.set('authorization', token);
  ctx.body = {}
})

module.exports = router;