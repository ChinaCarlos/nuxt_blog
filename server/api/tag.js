const router = require('koa-router')();
const Tag = require('../dbs/models/tag');
router.prefix('/api/v8/tag');

// 添加tag
router.post('/add', async (ctx, next) => {
  const { name, user } = ctx.request.body;
  if (!name || !user) {
    ctx.body = {
      code: -1,
      msg: '提交信息不合法！'
    };
  }
  try {
    //   查找给标签是否存在
    const tags = await Tag.findOne({
      name,
      user
    });
    if (tags) {
      ctx.body = {
        code: -1,
        msg: '该标签已存在！'
      };
      return false;
    }
    // 添加新标签
    const tag = new Tag({
      name,
      user
    });
    const result = await tag.save();
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('save tag is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'save tag is error!'
    };
  }
});
// 删除tag 这里不应真删除
router.delete('/delete', async (ctx, next) => {
  const { tagId } = ctx.request.body;
  if (!tagId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let result = await Tag.findOneAndDelete({ _id: tagId });
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('delete tagId is error' + error);
    ctx.body = {
      code: -1,
      msg: '删除tag失败！'
    };
  }
});
// 修改tag
router.put('/update', async (ctx, next) => {
  const { name, tagId } = ctx.request.body;
  if (!name) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
  } else {
    try {
      const result = await Tag.findOneAndUpdate({ _id: tagId }, { name });
      ctx.body = {
        code: 0,
        result
      };
    } catch (error) {
      console.log('update tag is error' + error);
      ctx.body = {
        code: -1,
        msg: '更新tag失败！'
      };
    }
  }
});
// 查看tag
router.get('/list', async (ctx, next) => {
  let { userId, page = 1, size = 10, keywords = '', sort = -1 } = ctx.query;
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
    const data = await Tag.find(filter)
      .populate({
        path: 'user',
        select: 'name id '
      })
      .skip(page)
      .limit(size)
      .sort({ createAt: sort });
    const total = await Tag.find(filter);
    ctx.body = {
      code: 0,
      data,
      total: total.length,
      page: page + 1,
      size
    };
  } catch (error) {
    console.log('get tags list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});
module.exports = router;
