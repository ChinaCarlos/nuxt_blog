const router = require('koa-router')();
const Category = require('../dbs/models/category');
const Tag = require('../dbs/models/tag');
const User = require('../dbs/models/user');
const Article = require('../dbs/models/article');
const Comment = require('../dbs/models/comment');
router.prefix('/api/public/index');

router.get('/articles', async (ctx, next) => {
  let { userId, page = 1, category, size = 10, keywords = '' } = ctx.query;
  page = Number(page) || 1;
  size = Number(size) || 10;
  page = Number(page - 1) * size || 0;
  let reg = new RegExp(keywords, 'i');
  let filter = {
    $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }]
  };
  if (userId) {
    filter = Object.assign(filter, { author: userId });
  }
  if (category && category != 'all') {
    filter = Object.assign(filter, { category });
  }
  try {
    let data = await Article.find(filter)
      .populate({
        path: 'user',
        select: 'name id '
      })
      .populate({
        path: 'category',
        select: 'id name'
      })
      .populate({
        path: 'tags',
        select: 'name id'
      })
      .populate({
        path: 'author',
        select: 'name id'
      })
      .skip(page)
      .limit(size);
    const total = await Article.find(filter);
    ctx.body = {
      code: 0,
      data,
      total: total.length,
      page: page + 1,
      size
    };
  } catch (error) {
    console.log('get index page article list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});

router.get('/category', async (ctx, next) => {
  try {
    let data = await Category.find({});
    ctx.body = {
      code: 0,
      data
    };
  } catch (error) {
    console.log('get category is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'get index page category data is error!'
    };
  }
});

module.exports = router;
