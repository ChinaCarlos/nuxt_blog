const Router = require('koa-router');

const router = new Router({
  prefix: '/api/user'
});

router.get('/list', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: ['张三', '李四']
  };
});

module.exports = router;
