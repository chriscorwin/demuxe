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
			goto: `${testhost}c360-rmd`,
			waitFor: 'body',
			name: '0000.magick-flow',
			description: 'Go to http://localhost:3000/c360-rmd'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0010.magick-flow',
			description: 'Click "Add Sources" button'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0020.magick-flow',
			description: 'Click "Data Mapping" link in left nav'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0030.magick-flow',
			description: 'Click pencil next to "Contact Point Address"'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0040.magick-flow',
			description: 'Click "Close" button in drawer'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0050.magick-flow',
			description: 'Click chevron next to "Account" (on right)'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0060.magick-flow',
			description: 'Click "Data Stewardship" link in left nav'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0070.magick-flow',
			description: 'Click "Profile Rules" link in left nav'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0080.magick-flow',
			description: 'Click "Data Jobs" link in left nav'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0090.magick-flow',
			description: 'Click "Next"'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '0100.magick-flow',
			description: 'Click "Dashboards" link in left nav'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '1000.magick-flow',
			description: 'Tab Switch to Service Desk (or just click anywhere)'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '1010.magick-flow',
			description: 'TODO: Where do you click?'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '1020.magick-flow',
			description: 'TODO: Where do you click?'
		},
		{
			click: `body`,
			waitFor: 'body',
			name: '1030.magick-flow',
			description: 'TODO: Where do you click?'
		}
	]
};
