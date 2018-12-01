const router = require('koa-router')();
const Article = require('../dbs/models/article');

router.prefix('/v8/article');

// 添加文章
router.post('/add', async (ctx, next) => {
  // 这里的category, tags 是数组
  const {
    author,
    title,
    content,
    category = [],
    tags = [],
    wrapper = '',
    published = false
  } = ctx.request.body;
  if (!author || !title || !content || !(category.length === 0)) {
    ctx.body = {
      code: 0,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let article = new Article({
      author,
      title,
      content,
      category,
      tags,
      wrapper,
      published
    });
    let result = await article.save();
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('save article is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'save article is error!'
    };
  }
});
// 删除文章
router.delete('/delete', async (ctx, next) => {
  let { articleId } = ctx.request.body;
  if (!articleId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let result = await Article.findOneAndDelete({ _id: articleId });
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
// 修改文章
router.put('/update', async (ctx, next) => {
  const {
    author,
    title,
    content,
    category = [],
    wrapper = '',
    tags = [],
    published = false,
    articleId
  } = ctx.request.body;
  if (!author || !title || !content || !articleId || !(category.length === 0)) {
    ctx.body = {
      code: 0,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let result = await Article.findOneAndUpdate(
      { _id: articleId },
      {
        author,
        title,
        content,
        category,
        tags,
        wrapper,
        published
      }
    );
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('save article is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'save article is error!'
    };
  }
});
// 查看文章详情
router.get('/detail:id', async (ctx, next) => {});
// 查看文章列表
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
      $or: [
        { title: { $regex: reg } },
        { author: { $regex: reg } },
        { content: { $regex: reg } }
      ]
    };
  } else {
    filter = {
      user: userId,
      $or: [
        { title: { $regex: reg } },
        { author: { $regex: reg } },
        { content: { $regex: reg } }
      ]
    };
  }
  try {
    let data = await Article.find(filter)
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
    console.log('get article list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});

module.exports = router;
