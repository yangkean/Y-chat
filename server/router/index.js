const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body')({multipart:true}); // enable parse multipart bodies
const redis = require('redis');
const promisify = require('util').promisify;
const client = redis.createClient();

// promisify redis method
const hget = promisify(client.hget).bind(client);
const hset = promisify(client.hset).bind(client);

router.get('/', index)
      .post('/', koaBody, signin)
      .get('/home', home);

async function index(ctx) {
  await ctx.render('index');
}

async function signin(ctx) {
  const username = ctx.request.body.fields.username;
  const pwd = ctx.request.body.fields.pwd;

  const user = await hget('y-chat:user', username);

  if(user) {
    const redisPwd = JSON.parse(user).pwd;

    if(redisPwd !== pwd) {
      return ctx.body = JSON.stringify({
        login: 'fail',
        msg: '密码不正确'
      });
    }
  } else if(username && pwd) {
    const value = JSON.stringify({
      username: username,
      pwd: pwd 
    });

    await hset('y-chat:user', username, value);
  } else {
    return ctx.body = JSON.stringify({
      login: 'fail',
      msg: '请输入用户名或密码'
    });
  }

  ctx.cookies.set('user', `${username}:${pwd}`, {
    maxAge: 2592000,
    domain: 'localhost',
  });

  // HTTP 头部字段在 RFC 7230 sec 3.2 有限制，需把中文转义为 Unicode 字符
  const userInfo = encodeURI(JSON.stringify({
    username,
    groups: {
      family: ['小红', '小明', '小刚'],
      friend: ['sam', 'tom'],
      colleague: ['二狗子', '呆瓜'],
      classmate: ['上天', '入地']
    }
  }));

  ctx.cookies.set('userInfo', userInfo, {
    maxAge: 2592000,
    domain: 'localhost',
    httpOnly: false,
  });

  ctx.body = JSON.stringify({
    login: 'success',
    msg: '登录成功'
  });
}

async function home(ctx) {
  await ctx.render('index');
}

module.exports = router;