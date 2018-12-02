const router = require('koa-router')();
const Comment = require('../dbs/models/comment');
const Article = require('../dbs/models/article');

router.prefix('/api/v8/comment');

// 增加评论
router.post('/add', async (ctx, next) => {
  const { userId, articleId, content, replyId } = ctx.request.body;
  let commentData = null;
  if (!userId || !articleId || !content) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  if (!replyId) {
    commentData = {
      user: userId,
      article: articleId,
      content
    };
  } else {
    commentData = {
      user: userId,
      article: articleId,
      content,
      reply: replyId
    };
  }
  try {
    let comment = new Comment(commentData);
    let result = await comment.save();
    await Article.findOneAndUpdate(
      { _id: articleId },
      { $push: { comments: comment } },
      { safe: true, upsert: true }
    );
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('save comment is error' + error);
    ctx.body = {
      code: -1,
      msg: 'save comment is error!'
    };
  }
});
// 删除评论
router.delete('/delete', async (ctx, next) => {
  const { commentId, articleId } = ctx.request.body;
  if (!commentId || !articleId) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  try {
    let result = await Comment.findOneAndDelete({ _id: commentId });
    await Article.findOneAndUpdate(
      { _id: articleId },
      { $pull: { comments: commentId } },
      { safe: true, upsert: true }
    );
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('delete comment is error!' + error);
    ctx.boy = {
      code: -1,
      msg: 'delete comment is error!'
    };
  }
});
// 查看评论
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
      $or: [{ content: { $regex: reg } }]
    };
  } else {
    filter = {
      user: userId,
      $or: [{ content: { $regex: reg } }]
    };
  }
  try {
    const data = await Comment.find(filter)
      .populate({
        path: 'user',
        select: 'name id '
      })
      .populate({
        path: 'article',
        select: 'id title author'
      })
      .skip(page)
      .limit(size)
      .sort({ createAt: sort });
    ctx.body = {
      code: 0,
      data
    };
  } catch (error) {
    console.log('get comment list is error!' + error);
    ctx.body = {
      code: -1,
      msg: '请求参数错误！'
    };
  }
});
// 修改评论
router.put('/update', async (ctx, next) => {
  const { commentId, content, replyId } = ctx.request.body;
  let commentData = null;
  if (!commentId || !content) {
    ctx.body = {
      code: -1,
      msg: '参数错误！'
    };
    return false;
  }
  if (!replyId) {
    commentData = {
      content,
      updatedAt: new Date()
    };
  } else {
    commentData = {
      content,
      reply: replyId,
      updatedAt: new Date()
    };
  }
  try {
    let result = await Comment.findOneAndUpdate(
      { _id: commentId },
      commentData
    );
    ctx.body = {
      code: 0,
      result
    };
  } catch (error) {
    console.log('update comment is error' + error);
    ctx.body = {
      code: -1,
      msg: 'update comment is error!'
    };
  }
});

module.exports = router;
