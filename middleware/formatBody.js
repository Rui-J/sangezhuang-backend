const code2Msg = {
  0: '成功',
  100: '未登录',
  120: '账号或密码错误',
  121: '账号已存在',
  400: '参数错误',
  401: '未认证',
  404: '未找到',
  901: '不支持',
}

function formatBody(options) {
  let {
    code,
    msg,
    data
  } = options
  if (!code) {
    code = 0;
  }
  if (!msg) {
    msg = code2Msg[code];
  }
  if (!data) {
    data = {}
  }
  return {
    code,
    msg,
    data
  }
}

module.exports = function () {
  return async (ctx, next) => {
    await next();
    ctx.body = formatBody(ctx.body)
  }
}