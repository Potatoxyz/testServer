var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/pages/index');
var server = require('./routes/server/server');
var app = express();

//配置日志记录
var log4js = require("./log/log.config.js");
log4js.configure();
app.use(log4js.useLog());



//自定义配置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,cache-control");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS")
    {res.status(200).send('');}/*让options请求快速返回*/
    else  {next()}
});


// view engine setup
app.set('views', path.join(__dirname, 'myView'));

// app.set('view engine', 'jade');
//更换模板引擎
app.engine('html', require('express-art-template'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
配置路径
*/
app.use('/', index);
app.use('/server', server);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //页面返回
  // res.render('error.html');
  var r={IsSuccess:false,Content:[],ErrorMessage:'请求地址不存在！'};
  res.send(r);
  res.end();
});

module.exports = app;
