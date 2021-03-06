var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
//var apps = require('./app/app');
var courses = require('./routes/courses');
var app = express();
var port = process.env.PORT || 3002;


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/TestDatabase', function (err) {
    if(err){
        console.log('connection fail for mongodb...');
    } else{
        console.log('connection success! ');
    }

});






// view engine setup
app.set('views', path.join(__dirname, 'views/test_pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));

app.use('/user', users);
app.use('/', routes);
app.use('/courses',courses);
app.use(session({
    //防止篡改cookie
    secret: 'Myblog',
    key : 'blog',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new mongoStore({
        url: 'mongodb://localhost/TestDatabase',
        //把session保存到mongodb的collection的sessions里
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// Use native Node promises



app.use(require('connect-multiparty'));
if('development' === app.get('env')){
    app.set('showStackEror', true);
    app.use(logger(':method :url :status'));//print the request
    app.locals.pretty =true; //set format when browsing data
    mongoose.set('debug', true);//print database
}



app.listen(port);
module.exports = app;
