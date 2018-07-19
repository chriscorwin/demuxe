const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const fs = require('fs');
const logger = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const config = require('./config/config.js')();

console.log(config.port);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
app.use(cookieParser());
app.use(sassMiddleware({
	debug: true,
	outputStyle: 'expanded',
	src: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

/** 
 * Serve up the .ejs files
 * 
 * This dynamically routes to any .ejs file that exists, otherwise it routes to 
 * the /index.ejs file.
 * 
 * eg: http://your.site.com/kidney/beans, serves the ejs file /public/kidney/beans.ejs
 * or serves /public/index.ejs if that file does not exist.
 * 
 * All user input will be sanitized. If you have a URL or Query param that is getting mutated unexpectedly, this is why.
 */
router.get('/*', (req, res) => {
	// Pass any query params they put in the URL on into the EJS template for use
	const sanitizedQueryParams = Object.keys(req.query).reduce((sanitizedQueryParams, param) => {
		sanitizedQueryParams[req.sanitize(param)] = req.sanitize(req.query[param]);
		return sanitizedQueryParams;
	}, {});
	const sanitizedURL = req.sanitize(req.params[0]) || 'index';
	fs.stat(path.resolve(`public/${sanitizedURL}.ejs`), (err, data) => {
		if (err) {
			res.render('404', { page: sanitizedURL, ...config, sanitizedQueryParams: sanitizedQueryParams });
		} else {
			res.render(sanitizedURL, { ...config, sanitizedQueryParams: sanitizedQueryParams });
		}
	});
});

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
