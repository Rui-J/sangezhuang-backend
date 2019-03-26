const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')

const jsonwebtoken = require('./middleware/jsonwebtoken')
const formatBody = require('./middleware/formatBody')
const routers = require('./routes/index')

const app = new Koa();

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

app.use(formatBody());

app.use(jsonwebtoken());
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())


app.listen('3000');
console.log('app started at port 3000...');