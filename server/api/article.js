const router = require('koa-router')();
const Article = require('../dbs/models/article');

router.prefix('/api/v8/article');

// 添加文章
router.post('/add', async (ctx, next) => {
  // tags 是数组
  const {
    author,
    title,
    content,
    category,
    markdown,
    tags = [],
    wrapper = '',
    published = false
  } = ctx.request.body;
  if (!author || !title || !content || !category || !markdown) {
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
      markdown,
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
    title,
    content,
    category,
    wrapper = '',
    tags = [],
    published = false,
    articleId,
    markdown
  } = ctx.request.body;
  if (!title || !content || !articleId || !category || !markdown) {
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
        title,
        content,
        category,
        tags,
        wrapper,
        published,
        markdown,
        updatedAt: new Date()
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
  let {
    userId,
    page = 1,
    category,
    size = 10,
    keywords = '',
    sort = -1
  } = ctx.query;
  page = Number(page) || 1;
  size = Number(size) || 10;
  page = Number(page - 1) * size || 0;
  sort = Number(sort);
  let reg = new RegExp(keywords, 'i');
  let filter = {
    $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }]
  };
  if (userId) {
    filter = Object.assign(filter, { author: userId });
  }
  if (category) {
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
      .limit(size)
      .sort({ createAt: sort });
    const total = await Article.find(filter);
    ctx.body = {
      code: 0,
      data,
      total: total.length,
      page: page + 1,
      size
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
