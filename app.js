const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const fs = require('fs');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const path = require('path');

const app = express();



var config = require("./config/config.js")()

console.log(config.port);



console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

/** 
 * Serve up the .ejs files
 * 
 * This dynamically routes to any .ejs file that exists, otherwise it routes to 
 * the /404.ejs file.
 * 
 * eg: http://your.site.com/kidney/beans, serves the ejs file /public/kidney/beans.ejs
 * or serves /public/404.ejs if that file does not exist.
 * 
 * All user input will be sanitized. If you have a URL or Query param that is getting mutated unexpectedly, this is why.
 */
router.get('/*', function(req, res, next) {
  // Pass any query params they put in the URL on into the EJS template for use
  const sanitizedQueryParams = Object.keys(req.query).reduce(function(sanitizedQueryParams, param) {
      sanitizedQueryParams[req.sanitize(param)] = req.sanitize(req.query[param]);
      return sanitizedQueryParams;
  }, {});
  const sanitizedURL = req.sanitize(req.params[0]) || 'index';
  fs.stat(path.resolve(`public/${sanitizedURL}.ejs`), function(err, data) {
    if (err) {
      res.render('404', { page: sanitizedURL, ...demoConfig, sanitizedQueryParams: sanitizedQueryParams }, (err, html) => {
        if (req.url.match(/.css$/)) {
          res.set('Content-Type', 'text/css');
        }
        res.send(html);
      });
    } else {
      res.render(sanitizedURL, { ...demoConfig, sanitizedQueryParams: sanitizedQueryParams });
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
