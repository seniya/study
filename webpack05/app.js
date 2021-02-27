const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const history = require('connect-history-api-fallback')

const http = require('http');
var compression = require('compression')

var app = express();
app.use(compression())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);

app.use(history())
app.use(express.static(path.join(__dirname, 'dist')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({ msg: err.message })
  console.error(err.message)
});

const debug = require('debug')('be:server');
const { onError, port } = require('./util/common')
console.log('port : ', port)

app.set('port', port);

const addr = server.address();

server.listen(port);
server.on('error', onError);
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});