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

console.log('Express server started');
console.log(`port: ${config.port}`);
console.log(`process.env.NODE_ENV ${process.env.NODE_ENV}`);
console.log(`brand: ${config.brand}`);

if (process.env.DEBUG === "true") {
  console.log('config data');
  console.dir(config);
}


// view engine setup
// https://expressjs.com/en/4x/api.html#app.set
// views are looked up in the order they occur in the array (earlier takes precedence over later --cascade flows reverse of the way it does in CSS)
app.set('views', [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'templates', config.template), 
  path.join(__dirname, 'engine')
]);

app.set('view engine', 'ejs');

// https://expressjs.com/en/4x/api.html#app.use
app.use([
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  expressSanitizer(),
  cookieParser(),
  // files are looked up in reverse order they occur in the array (later takes precedence over earlier here --cascade flows like CSS)
  lessMiddleware(path.join(__dirname, 'engine')),
  express.static(path.join(__dirname, 'engine')),
  lessMiddleware(path.join(__dirname, 'brand-themes', config.brand)),
  express.static(path.join(__dirname, 'brand-themes', config.brand)),
  lessMiddleware(path.join(__dirname, 'templates', config.template)),
  express.static(path.join(__dirname, 'templates', config.template)),
  lessMiddleware(path.join(__dirname, 'public')),
  express.static(path.join(__dirname, 'public'))
]);

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
 * If a non-existent static (js/css/html/svg/png/etc) file is requested, it will fall through the
 * express.static middleware into this. This will handle it and serve an appropriate 404 error.
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
  console.log(`${sanitizedURL} requested`);
  let error = true;
  // Check to see if the file exists in any of the three possible view directories. If not, error.
  fs.access(path.join(__dirname, 'public', `${sanitizedURL}.ejs`), fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (!err) error = false;
    fs.access(path.join(__dirname, 'templates', `${sanitizedURL}.ejs`), fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (!err) error = false;
      fs.access(path.join(__dirname, 'engine', `${sanitizedURL}.ejs`), fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (!err) error = false;
        if (error) {
          res.render('404', { page: sanitizedURL, ...config, sanitizedQueryParams: sanitizedQueryParams }, (err, html) => {
            if (req.url.match(/.css$/)) {
              res.set('Content-Type', 'text/css');
            }
            res.send(html);
          });
        } else {
          res.render(sanitizedURL, { ...config, sanitizedQueryParams: sanitizedQueryParams });
        }
      });
    });
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
