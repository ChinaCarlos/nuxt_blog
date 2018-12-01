const router = require('koa-router')();
const Category = require('../dbs/models/category');
const User = require('../dbs/models/user');
router.prefix('/v8/category');

// 添加分类
router.post('/add', async (ctx, next) => {
  const { name, user } = ctx.request.body;
  if (!name || !user) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    const userObj = await User.findOne({ _id: user });
    if (userObj.role != 0) {
      ctx.body = {
        code: -1,
        msg: '没有添加category的权限！'
      };
      return false;
    }
    const category = await Category.findOne({ name, user });
    if (category) {
      ctx.body = {
        code: -1,
        msg: '该分类已经存在！'
      };
      return false;
    }
    let categories = new Category({
      name,
      user
    });
    let result = await categories.save();
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('save category is error ' + error);
    ctx.body = {
      code: -1,
      msg: 'save category is error'
    };
  }
});
// 删除
router.delete('/delete', async (ctx, next) => {
  let { categoryId } = ctx.request.body;
  if (!categoryId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let result = await Category.findOneAndDelete({ _id: categoryId });
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('delete category is error' + error);
    ctx.body = {
      code: -1,
      msg: 'delete category is error!'
    };
  }
});
// 修改
router.put('/update', async (ctx, next) => {
  const { categoryId, name, user } = ctx.request.body;
  if (!name || !categoryId || !user) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    const userObj = await User.findOne({ _id: user });
    if (userObj.role != 0) {
      ctx.body = {
        code: -1,
        msg: '没有修改category的权限！'
      };
      return false;
    }
    let result = await Category.findOneAndUpdate({ _id: categoryId }, { name });
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('update category is error!');
    ctx.body = {
      code: -1,
      msg: 'update category is error!'
    };
  }
});

// 查看
router.get('/list', async (ctx, next) => {
  let {
    userId = '',
    page = 1,
    size = 10,
    keywords = '',
    sort = -1
  } = ctx.query;
  page = Number(page) || 1;
  size = Number(size) || 10;
  page = Number(page - 1) * size || 0;
  sort = Number(sort);
  let reg = new RegExp(keywords, 'i');
  let filter = null;
  if (!userId) {
    filter = {
      $or: [{ name: { $regex: reg } }]
    };
  } else {
    filter = {
      user: userId,
      $or: [{ name: { $regex: reg } }]
    };
  }
  try {
    const data = await Category.find(filter)
      .populate({
        path: 'user',
        select: 'name id '
      })
      .skip(page)
      .limit(size)
      .sort({ createAt: sort });
    ctx.body = {
      code: 0,
      data
    };
  } catch (error) {
    console.log('get category list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});
module.exports = router;
