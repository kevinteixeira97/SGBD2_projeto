var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');






var connection = require("./config/db"); //mongodb connection

var medicosRouter = require('./routes/medicos');
var utentesRouter = require('./routes/utentes');
var especialidadesRouter = require('./routes/especialidades');
var readRouter = require('./routes/read');
var createRouter = require('./routes/create');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');
var indexRouter = require('./routes/index');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/medicos', medicosRouter);
app.use('/utentes', utentesRouter);
app.use('/especialidades', especialidadesRouter);
app.use('/read', readRouter);
app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




var methodOverride = require('method-override')
app.use(methodOverride('_method'))

module.exports = app;
