const Router = require('koa-router');
const Redis = require('koa-redis');
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
// Redis
const Store = new Redis().client;

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
    if (result.name && result) {
      const cryptoPwd = cryptoPassword(password, email);
      if (result.password === cryptoPwd) {
        // 登录成功,生成token
        ctx.body = {
          code: 0,
          token: getToken(email)
        };
      } else {
        ctx.body = {
          code: -1,
          msg: '邮箱或密码错误！'
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '该用户不存在！'
      };
    }
  }
});
// 用户注册
router.post('/signUp', async (ctx, next) => {
  const { name, email, password, code } = ctx.request.body;
  if (!name || !email || !password || !code) {
    ctx.body = {
      code: -1,
      msg: '注册信息不完整！'
    };
  }
  // 判断邮箱验证码是否正确

  let verifyCodeRedis = await Store.hget('nodemailer', email);
  if (code.toString() != verifyCodeRedis.toString()) {
    ctx.body = {
      code: -1,
      msg: '邮箱验证码不一致！'
    };
    return false;
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
      password: cryptoPassword(password, email),
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
  try {
    await sendEmail(email, verifyCode);
  } catch (error) {
    console.log('发送邮箱验证码失败!' + error);
    ctx.body = {
      code: -1,
      msg: '发送邮箱验证码失败!'
    };
    return false;
  }
  try {
    // 家发送的验证码保存到reids 中
    let verifyCodeRedis = await Store.hset('nodemailer', email, verifyCode);
  } catch (error) {
    console.log('redis 存储邮箱验证码到Redis中失败！' + error);
    ctx.body = {
      code: -1,
      msg: 'redis 存储邮箱验证码失败！'
    };
    return false;
  }
  // 将邮箱验证码存储到redis中

  ctx.body = {
    code: 0,
    msg: '验证码发送成功！'
  };
});

module.exports = router;
