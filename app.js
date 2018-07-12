const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

/** 
 * Serve up the .ejs files
 * 
 * This dynamically routes to any .ejs file that exists, otherwise it routes to 
 * the /index.ejs file.
 * 
 * So, if you want http://your.site.com/kidney/beans, you'd make a corresponding
 * ejs file /public/kidney/beans.ejs
 */
router.get('/*', function(req, res, next) {
  fs.stat(path.resolve(`public/${req.params[0]}.ejs`), function(err, data) {
    if (err) {
      res.render('index', { title: 'Default' });
    } else {
      res.render(req.params[0], { title: 'Explicit' });
    }
  });
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
