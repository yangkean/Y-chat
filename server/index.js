const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')({multipart:true}); // enable parse multipart bodies
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

app.use(cors({
  credentials: true
}));

app.use(serve(path.join(__dirname, '../dist')));

app.use(views(path.join(__dirname, '../dist/views'), {
  extension: 'html'
}));

router.get('/', index)
      .post('/', koaBody, signin)
      .get('/home', home);

app.use(router.routes());

async function index(ctx) {
  await ctx.render('index');
}

async function signin(ctx) {
  const username = ctx.request.body.fields.username.trim();
  const pwd = ctx.request.body.fields.pwd.trim();

  const user = await hget('y-chat:user', username);

  if(user) {
    const redisPwd = JSON.parse(user).pwd;

    if(redisPwd !== pwd) {
      return ctx.body = '密码不正确';
    }
  } else {
    const value = JSON.stringify({
      username: username,
      pwd: pwd 
    });

    await hset('y-chat:user', username, value);
  }

  ctx.cookies.set('user', `${username}:${pwd}`, {
    maxAge: 2592000,
    domain: 'localhost'
  });

  ctx.redirect('/home')
}

async function home(ctx) {
  await ctx.render('index');
}

app.listen(config.server.port, () => {
  console.log(`server is listening on port http://localhost:${config.server.port}`);
});