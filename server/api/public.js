const router = require('koa-router')();
const Category = require('../dbs/models/category');
const Tag = require('../dbs/models/tag');
const User = require('../dbs/models/user');
const Article = require('../dbs/models/article');
const Comment = require('../dbs/models/comment');
router.prefix('/api/v8/public')

router.get('/index', async (ctx, next) => {
  try {
   ctx.body = {
     code:0,
     msg: '首页数据获取成功！',
     data: []
   }
  } catch(error){
    console.log('get index page data is error!' + error);
    ctx.body = {
      code: -1,
      msg: 'get index page data is error!'
    }
  }
})


module.exports = router;
