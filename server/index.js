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
const http = require('http').Server(app);
const io = require('socket.io')(http);

// promisify redis method
const hget = promisify(client.hget).bind(client);
const hset = promisify(client.hset).bind(client);

// number of connected users
let numUsers = 0;

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
      return ctx.body = JSON.stringify({
        login: 'fail',
        msg: '密码不正确'
      });
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

  ctx.body = JSON.stringify({
    login: 'success',
    msg: '登录成功'
  });
}

async function home(ctx) {
  await ctx.render('index');
}

// socket.io server side
io.on('connection', (socket) => {
  numUsers++;

  console.log(`${numUsers} is connected...`);

  socket.on('chat message', (msg) => {
    console.log(msg)
    // io.emit('chat message', {
    //   username: socket.username,
    //   msg: msg
    // });
  });

  socket.on('disconnect', () => {
    numUsers--;

    console.log(`${numUsers} is connected...`);
  });
});

app.listen(config.server.port, () => {
  console.log(`server is listening on port http://localhost:${config.server.port}`);
});