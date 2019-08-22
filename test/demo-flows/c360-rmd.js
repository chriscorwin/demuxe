const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;
const XSHORT = 10;
const SHORT = 100;
const MEDIUM = 2000;
const LONG = 3000;
const XLONG = 6000;

module.exports = {
	id: 'c360-rmd',
	name: 'c360.rmd',
	description: 'c360 Release Marketing Demo Flow',
	headless: false,
	debug: true,
	resolution: { width: 1280, height: 720 },
	imageSnapshotPath: './test/screenshots/c360-rmd/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: true,
	steps: [
		{
			goto: `${testhost}pacers`,
			waitFor: 'body',
			name: '0001.magick-flow'
		},
	]
};
