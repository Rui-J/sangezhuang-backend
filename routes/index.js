const Router = require('koa-router')
const fs = require('fs');

const router = new Router();

// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname);
files.forEach((item) => {
  if (item.endsWith('.js') && item != 'index.js') {
    let _route = require('./' + item);
    router.use('/api/v1/', _route.routes(), _route.allowedMethods())
  }
})

module.exports = router;