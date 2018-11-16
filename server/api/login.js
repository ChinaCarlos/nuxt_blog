const Router = require('koa-router');
const User = require('../dbs/models/user');
const { cryptoPassword, getToken } = require('../utils/certUtil');
const { dbFindOne, insertData } = require('../utils/dbUtil');
const router = new Router({
  prefix: '/api/users'
});
router.post('/sin', async (ctx, next) => {
  ctx.body = {
    name: 'test'
  };
});
// 用户登录
router.post('/signin', async (ctx, next) => {
  const { email, password } = ctx.request.body;
  // 判断传过来的信息是否合法
  if (!email || !password) {
    ctx.body = {
      code: -1,
      msg: '登录信息不完整！'
    };
  } else {
    // 判读数据库是否存在该用户
    const result = await dbFindOne(User, { email });
    ctx.body = {
      result
    };
  }
});
// 用户注册
router.post('/signup', async (ctx, next) => {
  const { name, email, password, code = '' } = ctx.request.body;
  console.log(name, email, password);
  const insertDatas = await insertData(User, { name, email, password });
  ctx.body = {
    code: 0,
    msg: '插入成功！',
    insertDatas
  };
});

module.exports = router;
