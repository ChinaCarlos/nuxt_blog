const Router = require('koa-router');
const Redis = require('koa-redis');
const User = require('../dbs/models/user');
const Category = require('../dbs/models/category');
const Tag = require('../dbs/models/tag');
const Article = require('../dbs/models/article');
const Comment = require('../dbs/models/comment');
const sendEmail = require('../utils/emailUtil');
const {
  cryptoPassword,
  getToken,
  getRandomCode
} = require('../utils/certUtil');
const { dbFindOne, insertData } = require('../utils/dbUtil');

const router = new Router({
  prefix: '/public/users'
});
// Redis
const Store = new Redis().client;

// 用户登录
router.post('/signIn', async (ctx, next) => {
  const { email = '', password = '' } = ctx.request.body;
  // 判断传过来的信息是否合法
  if (!email || !password) {
    ctx.body = {
      code: -1,
      msg: '登录信息不完整！'
    };
  } else {
    // 判读数据库是否存在该用户

    const result = await dbFindOne(User, { email });
    if (result) {
      const cryptoPwd = cryptoPassword(password, email);
      if (result.password === cryptoPwd) {
        // 登录成功,生成token
        ctx.body = {
          code: 0,
          msg: '登录成功！',
          token: getToken(email),
          user: {
            id: result._id,
            role: result.role,
            name: result.name,
            email: result.email,
            avatar: result.avatar || ''
          }
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
// 发送邮箱验证码
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
    // 家发送的验证码保存到redis 中
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
// 查询一个用户所有基础信息，用于登录后首页展示
router.get('/info', async (ctx, next) => {
  const { userId } = ctx.query;
  if (!userId) {
    ctx.body = {
      code: -1,
      msg: '参数错误!'
    };
    return false;
  }
  try {
    let user = await User.findOne({ _id: userId });
    let tags = await Tag.find({ user: userId });
    // 所用用户只有管理员能修改category ，category所有用户都一样的
    let categories = await Category.find({});
    let articles = await Article.find({ author: userId });
    let comments = await Comment.find({ user: userId });
    ctx.body = {
      user: {
        id: user._id,
        name: user.name || '',
        avatar: user.avatar || '',
        role: user.role,
        email: user.email
      },
      tags,
      categories,
      articles,
      comments
    };
  } catch (error) {
    console.log('get user info is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'get user info is error!'
    };
  }
});
// 后台 用户管理 获取所用户列表
router.get('/list', async (ctx, next) => {
  let {
    page = 1,
    size = 10,
    keywords = '',
    sort = -1,
    userId = ''
  } = ctx.query;
  page = Number(page) || 1;
  size = Number(size) || 10;
  page = Number(page - 1) * size || 0;
  sort = Number(sort);
  if (!userId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  let userObj = await User.findOne({ _id: userId });
  if (!userObj || !(userObj.role === 0)) {
    ctx.body = {
      code: -1,
      msg: '该接口暂无权限使用！'
    };
    return false;
  }
  let reg = new RegExp(keywords, 'i');
  let filter = null;
  filter = {
    $or: [{ name: { $regex: reg } }, { email: { $regex: reg } }]
  };
  try {
    const data = await User.find(filter)
      .skip(page)
      .limit(size)
      .sort({ createAt: sort });
    const total = await User.find(filter);
    ctx.body = {
      code: 0,
      data,
      total: total.length,
      page: page + 1,
      size
    };
  } catch (error) {
    console.log('get user list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});
// 修改用户信息
router.put('/update', async (ctx, next) => {
  const { userId, name = '', avatar = '', email = '' } = ctx.request.body;
  if (!userId || !name || !email) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    await User.findOneAndUpdate({ _id: userId }, { name, avatar, email });
    let user = await User.findOne({ _id: userId });
    ctx.body = {
      code: 0,
      user: {
        name: user.name,
        avatar: user.avatar,
        email: user.email
      }
    };
  } catch (error) {
    console.log('update user info is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'update user info is error!'
    };
  }
});
// 删除用户 (先确认其权限)
router.delete('/delete', async (ctx, next) => {
  const { userId } = ctx.request.body;
  if (!userId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  // 从token 获取当前的登录用户id
  let token = ctx.request.header.authorization;
  if (!token) {
    ctx.body = {
      code: -1,
      msg: '请先登录确认身份'
    };
    return false;
  }
  try {
    let user = await User.findOne({ _id: userId });
    if (user && user.role === 0) {
      let userObj = await findOneAndDelete({ _id: userId });
      ctx.body = {
        code: 0,
        msg: '删除成功！'
      };
    } else {
      ctx.body = {
        code: -1,
        msg: '暂时没有该权限调用此接口！'
      };
    }
  } catch (error) {
    console.log('delete user is error!' + error);
    ctx.body = {
      code: 0,
      msg: 'delete user is error!'
    };
  }
});
module.exports = router;
