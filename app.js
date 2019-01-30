console.group(`
============================================================
Demuxe: Running \`app.js\` now...
------------------------------------------------------------
`);
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const ejs = require('ejs');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const fs = require('fs');
const util = require('util');
const logger = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const classnames = require('classnames');
const sizeOf = require('image-size');

const config = require('./config/config.js')();

const app = express();


if (process.env.DEBUG === "true") {
	console.debug = console.log;
}

console.group(`
============================================================
Demuxe: Express Server up and running...
------------------------------------------------------------
`);

console.log('Express server started');
console.log(`port: ${config.port}`);
console.log(`process.env.NODE_ENV ${process.env.NODE_ENV}`);
console.log(`brandTheme: ${config.brandTheme}`);
console.log(`productTemplate: ${config.productTemplate}`);

console.debug('config data');
console.debug(`[ app.js:39 ] config: `, util.inspect(config, { showHidden: false, depth: 1, colors: true }));

console.groupEnd();

// view engine setup
// https://expressjs.com/en/4x/api.html#app.set
// views are looked up in the order they occur in the array (earlier takes precedence over later --cascade flows reverse of the way it does in CSS)
const appViews = config.appViews;
// if (config.productTemplate) {
// 	appViews.push(path.join(__dirname, 'product-templates', config.productTemplate));
// } 
// appViews.push(path.join(__dirname, 'engine'));
app.set('views', appViews);

app.set('view engine', 'ejs');
app.set('view options', { root: '/Users/cmcculloh/projects/demuxe/demo-overrides' });
app.set('view options', {compileDebug: true});
app.set('view options', {compileDebug: true, outputFunctionName: 'echo'});

// https://expressjs.com/en/4x/api.html#app.use
const appUse = [
	// logger('dev'),
	express.json(),
	express.urlencoded({ extended: false }),
	expressSanitizer(),
	cookieParser(),
	// files are looked up in reverse order they occur in the array (later takes precedence over earlier here --cascade flows like CSS)
	sassMiddleware({
		debug: false,
		outputStyle: 'expanded',
		src: path.join(__dirname, 'engine')
	}),
	express.static(path.join(__dirname, 'engine'))
];

if (config.brandTheme) {
	appUse.push(  
		sassMiddleware({
			debug: false,
			outputStyle: 'expanded',
			src: path.join(__dirname, 'brand-themes', config.brandTheme)
		}),
		express.static(path.join(__dirname, 'brand-themes', config.brandTheme))
	);
}


if (config.productTemplate) {
	appUse.push(
		sassMiddleware({
			debug: false,
			outputStyle: 'expanded',
			src: path.join(__dirname, 'product-templates', config.productTemplate)
		}),
		express.static(path.join(__dirname, 'product-templates', config.productTemplate))
	);
}

appUse.push(
	sassMiddleware({
		debug: false,
		outputStyle: 'expanded',
		src: path.join(__dirname, 'demo-overrides')
	}),
	express.static(path.join(__dirname, 'demo-overrides'))
);

appUse.push(
	express.static(path.join(__dirname, 'slides'))
);

app.use(appUse);

const router = express.Router();

/** 
 * Serve up the .ejs files
 * 
 * This dynamically routes to any .ejs file that exists, otherwise it routes to 
 * the /404.ejs file.
 * 
 * eg: http://your.site.com/kidney/beans, serves the ejs file /demo-overrides/kidney/beans.ejs
 * or serves /demo-overrides/404.ejs if that file does not exist.
 * 
 * If a non-existent static (js/css/html/svg/png/etc) file is requested, it will fall through the
 * express.static middleware into this. This will handle it and serve an appropriate 404 error.
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
	const fileName = (sanitizedURL.match(/\/$/)) ? `${sanitizedURL}index.ejs` : `${sanitizedURL}.ejs`;

	const state = sanitizedQueryParams.state || 'initial';
	config.state = state;

	let error = true;
	// Check to see if the file exists in any of the three possible view directories. If not, error.
	// Note that this doesn't actually decide where files are served from, it just _checks to see if
	// the file exists in a place_. If you want to add a new place that files can be served from, all
	// of that config stuff happens in config.js in the "view engine setup" area.
	fs.access(path.join(__dirname, 'demo-overrides', (config.productTemplate) ? config.productTemplate : '', (config.demoVenue) ? config.demoVenue : '', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {
		console.log(path.join(__dirname, 'demo-overrides', (config.productTemplate) ? config.productTemplate : '', (config.demoVenue) ? config.demoVenue : '', fileName));
		if (!err) error = false;
		fs.access(path.join(__dirname, 'product-templates', (config.productTemplate) ? config.productTemplate : '', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {
			if (!err) error = false;
			fs.access(path.join(__dirname, 'engine', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {
				if (!err) error = false;
				if (error) {
					// find out if it's a slug in our magick-flows
					let thisUrlSlug = fileName.replace('.ejs', '');
					if (config.magickFlows.urlSlugs.includes(thisUrlSlug) ) {
						config.urlSlug = thisUrlSlug;
						// siteSection hard-coded to be "flow", prolly gonna try and change it to be "magic-flow", but not sure...
						console.group(`
============================================================
Demuxe: app.js will serve up a Magick Flow for URL ${thisUrlSlug}
------------------------------------------------------------
						`);
						res.render('wrapper-for-magick-flows', { ...config, siteSection: 'magick-flows', sanitizedQueryParams: sanitizedQueryParams, classnames: classnames, sizeOf: sizeOf, util: util });
						console.groupEnd();
						
					} else {
						res.render('404', { page: fileName, ...config, sanitizedQueryParams: sanitizedQueryParams }, (err, html) => {
							if (req.url.match(/\.css$/)) {
								res.set('Content-Type', 'text/css');
							}
							if (req.url.match(/\.js$/)) {
								res.set('Content-Type', 'application/javascript');
								res.set('X-Your-Mom', config);
							}
							res.send(html);
						});
					}
				} else {
					console.log('about to render', fileName, path);
					res.render(fileName, { ...config, sanitizedQueryParams: sanitizedQueryParams, classnames: classnames, sizeOf: sizeOf, util: util, path: path });
				}
			});
		});
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

console.log(`...end \`app.js\`
------------------------------------------------------------
`);
console.groupEnd();
