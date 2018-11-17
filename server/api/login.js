const Router = require('koa-router');
const User = require('../dbs/models/user');
const sendEmail = require('../utils/emailUtil');
const {
  cryptoPassword,
  getToken,
  getRandomCode
} = require('../utils/certUtil');
const { dbFindOne, insertData } = require('../utils/dbUtil');

const router = new Router({
  prefix: '/api/users'
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
router.post('/signUp', async (ctx, next) => {
  const { name, email, password, code = '' } = ctx.request.body;
  if (!name || !email || !password || !code) {
    ctx.body = {
      code: -1,
      msg: '注册信息不完整！'
    };
  }
  // 先通过邮箱来判断该邮箱是否被注册
  const result = await dbFindOne(User, { email });
  if (result) {
    ctx.body = {
      code: -1,
      msg: '该邮箱已经被注册了！'
    };
  } else {
    const insertDatas = await insertData(User, {
      name,
      email,
      password,
      role: 1,
      createdTime: new Date()
    });
    ctx.body = {
      code: 0,
      name: insertDatas.name,
      email: insertDatas.email,
      id: insertDatas._id,
      avatar: insertDatas.avatar,
      role: insertDatas.role
    };
  }
});

router.post('/sendCode', async (ctx, next) => {
  const { email } = ctx.request.body;
  const verifyCode = getRandomCode();
  await sendEmail(email, verifyCode);
  ctx.body = {
    code: 0,
    msg: '验证码发送成功！'
  };
});

module.exports = router;
