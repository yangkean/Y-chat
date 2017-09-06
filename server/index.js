const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const redis = require('redis');
const cors = require('kcors');
const promisify = require('util').promisify;
const config = require('../config/index');
const app = new Koa();
const router = new Router();
const client = redis.createClient();

// promisify redis method
const hget = promisify(client.hget).bind(client);
const hset = promisify(client.hset).bind(client);

app.use(koaBody());

app.use(cors());

app.use(serve(path.join(__dirname, '../dist')));

app.use(views(path.join(__dirname, '../dist/views'), {
  extension: 'html'
}));

router.get('/', index)
      .post('/', signin);

app.use(router.routes());

async function index(ctx) {
  await ctx.render('index');
}

async function signin(ctx) {
  //console.log(ctx.request)
  const username = ctx.request.body.username.trim();
  const pwd = ctx.request.body.pwd.trim();

  const user = await hget('y-chat:user', username);

  if(user) {
    const redisPwd = JSON.parse(user).pwd;

    ctx.cookies.set('user', `${username}:${pwd}`, {
      maxAge: 2592000,
    });

    if(redisPwd !== pwd) {
      await hset('y-chat:user', username, {
        username: username,
        pwd: pwd 
      });
    }

    ctx.redirect('/home');
  }
}

app.listen(config.server.port, () => {
  console.log(`server is listening on port http://localhost:${config.server.port}`);
});