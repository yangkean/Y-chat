const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const cors = require('kcors');
const config = require('../config/');
const app = new Koa();
const router = require('./router/');
const server = require('http').createServer(app.callback());
const onConnection = require('./socket/');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const io = require('socket.io')(server);

emitter.setMaxListeners(50);

app.use(cors({
  credentials: true
}));

app.use(serve(path.join(__dirname, '../dist')));

app.use(views(path.join(__dirname, '../dist/views'), {
  extension: 'html'
}));

app.use(router.routes());

io.on('connection', onConnection(io));

server.listen(config.server.port, () => {
  console.log(`server is listening on port http://localhost:${config.server.port}`);
});
