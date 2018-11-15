const Router = require('koa-router');
const Redis = require('koa-redis');
const nodeMailer = require('nodemailer');
const User = require('../dbs/models/user');
const axios = require('axios');
const Passport = require('../utils/passport');
const { cryptoPassword } = require('../utils/crypto');
const router = new Router({
  prefix: '/api/user'
});
// redis
let Store = new Redis().client;
router.get('/list', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: ['张三', '李四']
  };
});
router.post('/signup', async (ctx, next) => {
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: 0,
          msg: '验证码已过期！'
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码错误！'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码!'
    };
  }
  let user = await User.find({ username });
  if (user.length > 0) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    };
    return;
  }
  let nuser = await User.create({
    username,
    password,
    email
  });
  if (nuser) {
    let res = await axios.post('/api/user/signin', {
      username,
      password
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '登录成功！',
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    };
  }
});

// 登录
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功!',
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info
        };
      }
    }
  })(ctx, next);
});
// 验证码
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
  if (saveExpire && newDate().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁！有病啊！'
    };
    return false;
  }
});
// 模拟登陆
router.post('/register', async (ctx, next) => {
  // 获取提交的信息
  const { name, password, email } = ctx.request.body;
  const cryptoPwd = cryptoPassword(password, email);
  const user = new User({
    name,
    password: cryptoPwd,
    email
  });
  try {
    await user.save();
    const result = await User.findOne({ name });
    ctx.body = {
      id: result._id,
      name: result.name,
      email: result.email
    };
  } catch (error) {
    console.log('save user error!');
    ctx.body = {
      code: 0,
      msg: 'nofound user info'
    };
  }
});
module.exports = router;
