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

const expressSession = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const auth = require('./config/auth');

const config = require('./config/config.js')();



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    auth.findByUsername(config.users, username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  auth.findById(config.users, id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


const app = express();


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
console.debug(`${path.join(__dirname, 'app.js')}:41 ] config: `, util.inspect(config, { showHidden: false, depth: 1, colors: true }));

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
// Paths looked up in sequential order to which they are added, earlier takes precedence over later
const appUse = [
	// logger('dev'),
	express.json(),
	express.urlencoded({ extended: false }),
	expressSanitizer(),
	cookieParser(),
	expressSession({ secret: 'Salsa Farse', resave: false, saveUninitialized: false }),
	passport.initialize(),
	passport.session()
];

const sourceMap = (typeof config.sourceMap !== 'undefined') ? config.sourceMap : true;
const scssDebug = process.env.NODE_ENV !== "production";
// SASS loads things in a first-found-in-array manner
if (config.brandTheme) {
	appUse.push(
		sassMiddleware({
			debug: scssDebug,
			sourceMap,
			outputStyle: 'expanded',
			src: path.join(__dirname, 'brand-themes', config.brandTheme)
		}),
		express.static(path.join(__dirname, 'brand-themes', config.brandTheme))
	);
}

if (config.productTemplate) {
	if (config.demoVenue) {
		appUse.push(
			sassMiddleware({
				debug: scssDebug,
				sourceMap,
				outputStyle: 'expanded',
				src: path.join(__dirname, 'demo-overrides', config.productTemplate, config.demoVenue)
			}),
			express.static(path.join(__dirname, 'demo-overrides', config.productTemplate, config.demoVenue))
		);
	}

	appUse.push(
		sassMiddleware({
			debug: scssDebug,
			sourceMap,
			outputStyle: 'expanded',
			src: path.join(__dirname, 'product-templates', config.productTemplate)
		}),
		express.static(path.join(__dirname, 'product-templates', config.productTemplate))
	);
}

appUse.push(
	sassMiddleware({
		debug: scssDebug,
		sourceMap,
		outputStyle: 'expanded',
		src: path.join(__dirname, 'engine')
	}),
	express.static(path.join(__dirname, 'engine'))
);

appUse.push(
	sassMiddleware({
		debug: scssDebug,
		sourceMap,
		outputStyle: 'expanded',
		src: path.join(__dirname, 'magick-flows-web-root')
	}),
	express.static(path.join(__dirname, 'magick-flows-web-root'))
);


appUse.push(
	express.static(path.join(__dirname, 'slides'))
);

app.use(appUse);

const router = express.Router();

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

app.get('/logout',
	function(req, res){
		req.logout();
		res.redirect('/');
	}
);

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
	let fileName = (sanitizedURL.match(/\/$/)) ? `${sanitizedURL}index.ejs` : `${sanitizedURL}.ejs`;
	// Okay, so, the server's glee at finding and including stuff can bite us when it attempts to find `file.css.ejs`. Just silly. Here we tell it in static asset casses to just look for the asset, not an .esj file.
	if ( fileName.endsWith('.css.ejs') || fileName.endsWith('.js.ejs') || fileName.endsWith('.png.ejs') || fileName.endsWith('.png.ejs') ) {
		fileName = fileName.replace('.ejs', '');
	}
	let fileNameSlug = fileName;
	if ( fileNameSlug.endsWith('.ejs') ) {
		fileNameSlug = fileNameSlug.replace('.ejs', '');
	}



	const state = sanitizedQueryParams.state || 'initial';
	config.state = state;

	let error = true;
	// Check to see if the file exists in any of the three possible view directories. If not, error.
	// Note that this doesn't actually decide where files are served from, it just _checks to see if
	// the file exists in a place_. If you want to add a new place that files can be served from, all
	// of that config stuff happens in config.js in the "view engine setup" area.
	fs.access(path.join(__dirname, 'demo-overrides', (config.productTemplate) ? config.productTemplate : '', (config.demoVenue) ? config.demoVenue : '', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {

		// console.log(`${path.join(__dirname, 'app.js')}:164 ] err: `, util.inspect(err, { showHidden: true, depth: null, colors: true }));

		if (!err) error = false;
		fs.access(path.join(__dirname, 'product-templates', (config.productTemplate) ? config.productTemplate : '', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {

			// console.log(`[ ${path.join(__dirname, 'app.js')}:169 ] err: `, util.inspect(err, { showHidden: true, depth: null, colors: true }));

			if (!err) error = false;


			fs.access(path.join(__dirname, 'engine', fileName), fs.constants.F_OK | fs.constants.R_OK, (err) => {

				// console.log(`[ ${path.join(__dirname, 'app.js')}:176 ] err: `, util.inspect(err, { showHidden: true, depth: null, colors: true }));

				if (!err) error = false;
				if (error) {
					// find out if it's a slug in our magick-flows

					let thisUrlSlug = fileName.replace('.ejs', '');

					// console.log(`${path.join(__dirname, 'app.js')}:184 ] fileName: `, util.inspect(fileName, { showHidden: true, depth: null, colors: true }));
					// console.log(`${path.join(__dirname, 'app.js')}:185 ] thisUrlSlug: `, util.inspect(thisUrlSlug, { showHidden: true, depth: null, colors: true }));
					// console.log(`${path.join(__dirname, 'app.js')}:187 ] config.magickFlows.urlSlugs.includes(thisUrlSlug): `, util.inspect(config.magickFlows.urlSlugs.includes(thisUrlSlug), { showHidden: true, depth: null, colors: true }));

					if (config.magickFlows.urlSlugs.includes(thisUrlSlug) ) {
						config.urlSlug = thisUrlSlug;
						// siteSection hard-coded to be "flow", prolly gonna try and change it to be "magic-flow", but not sure...
						console.group(`
============================================================
Demuxe: app.js will serve up a Magick Flow for URL ${thisUrlSlug}
------------------------------------------------------------
						`);
						res.render('wrapper-for-magick-flows', { ...config, user: req.user, siteSection: 'magick-flows', sanitizedQueryParams: sanitizedQueryParams, classnames: classnames, sizeOf: sizeOf, util: util });
						console.groupEnd();

					} else {

						// For CSS and images we bypass the 404.ejs file entirely and just serve up the error from here.
						if (req.url.match(/.*\.css$/)) {
							res.status(404);
							res.set('Content-Type', 'text/css');
							res.send(`
								body.has-debug:after {
									display: block;
									font-size: 22px;
									color: #fff;
									background-color: #800;
									padding: 10px;
									height: 50px;
									width: 100%;
									content: "404. Page: ${fileName} Not Found." !important;
									text-align: center;
									position: absolute;
									top: 20%;
									left: 25%;
								}
							`);
						} else if (req.url.match(/.*\.png$/)) {
							res.set('Content-Type', 'image/png');
							res.status(404);
							// We should figure out if this is, like, a thing. I had an idea here that doesn't hurt stuff, but, it may be nice to exploit this to serve up a generic image?
							res.send(`data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`);
						} else {

							res.render('404', { page: fileName, ...config, user: req.user, sanitizedQueryParams: sanitizedQueryParams }, (err, html) => {

								if (req.url.match(/\.js$/)) {
									res.set('Content-Type', 'application/javascript');
									res.send(html);
								} else {
									res.set('X-error', err);
									res.set('X-original-filename', fileName);
									res.send(html);
								}
							});
						}
					}
				} else {
					res.render(fileName, { ...config, user: req.user, siteSection: fileNameSlug, sanitizedQueryParams: sanitizedQueryParams, classnames: classnames, sizeOf: sizeOf, util: util, path: path });
				}
			});
		});
	});
});
app.use('/', ensureLoggedIn('/login'), router);


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
