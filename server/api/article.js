const router = require('koa-router')();
const Article = require('../dbs/models/article');

router.prefix('/v8/article');

// 添加文章
router.post('/add', async (ctx, next) => {});
// 删除文章
router.delete('/delete', async (ctx, next) => {});
// 修改文章
router.put('/update', async (ctx, next) => {});
// 查看文章详情
router.get('/detail:id', async (ctx, next) => {});
// 查看文章列表
router.get('/list', async (ctx, next) => {});

module.exports = router;
