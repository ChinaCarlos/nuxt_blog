const router = require('koa-router')();
const Article = require('../dbs/models/article');

router.prefix('/v8/article');

// 添加文章
router.post('/add', async (ctx, next) => {
  const { author, title, content, category, tags } = ctx.request.body;
  if (!author || !title || !content || !category || !tags) {
    ctx.body = {
      code: 0,
      msg: '参数错误！'
    };
  } else {
    try {
      let article = new Article({
        author,
        title,
        content,
        category,
        tags
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
  }
});
// 删除文章
router.delete('/delete', async (ctx, next) => {});
// 修改文章
router.put('/update', async (ctx, next) => {});
// 查看文章详情
router.get('/detail:id', async (ctx, next) => {});
// 查看文章列表
router.get('/list', async (ctx, next) => {});

module.exports = router;
