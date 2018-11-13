const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const KoaJwt = require('koa-jwt');
const cert = 'nuxt_blog';

const router = new Router({
  prefix: '/api/login'
});

router.post('/', async (ctx, next) => {
  const payload = ctx.request.body;
  if (!payload.username) {
    ctx.body = {
      code: -1,
      msg: '登录出错'
    };
  }
  const token = jwt.sign(payload, cert, {
    expiresIn: '1h'
  });
  ctx.body = {
    code: 0,
    token
  };
});

module.exports = router;
