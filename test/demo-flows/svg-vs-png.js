// npm run test test/test-runner.test.js svg-vs-png

const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;
const XSHORT = 10;
const SHORT = 100;
const MEDIUM = 2000;
const LONG = 3000;
const XLONG = 6000;

module.exports = {
	id: 'svg-vs-png',
	name: 'svg.vs.png',
	description: 'SVG vs PNG Demo Flow',
	headless: false,
	debug: true,
	resolution: { width: 1280, height: 720 },
	imageSnapshotPath: './test/screenshots/svg-vs-png/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: true,
	steps: [
		{
			goto: `${testhost}svg-vs-png`,
			waitFor: 'body',
			name: '0000.magick-flow',
			description: 'Go to http://localhost:3000/svg-vs-png'
		},
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0010.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0020.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0030.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0040.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0050.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0060.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0070.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0080.magick-flow'
		// },
		// {
		// 	click: `body`,
		// 	waitFor: 'body',
		// 	name: '0090.magick-flow'
		// }
	]
};
