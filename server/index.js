const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
// 集成日志
// const logUtil = require('../utils/log_util');
// 自定义api接口
const city = require('./api/city');
const user = require('./api/user');
const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  // 集成前端日志
  // app.use(async (ctx, next) => {
  //   //响应开始时间
  //   const start = new Date();
  //   //响应间隔时间
  //   var ms;
  //   try {
  //     //开始进入到下一个中间件
  //     await next();

  //     ms = new Date() - start;
  //     //记录响应日志
  //     logUtil.logResponse(ctx, ms);
  //   } catch (error) {
  //     ms = new Date() - start;
  //     //记录异常日志
  //     logUtil.logError(ctx, error, ms);
  //   }
  // });
  // 使用自定义API 接口路由
  app.use(city.routes()).use(city.allowedMethods());
  app.use(user.routes(), user.allowedMethods());

  app.use(ctx => {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
