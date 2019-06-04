
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'is_cnx19keynote_michael-page',
	name: 'is.cnx19keynote.michael-page',
	description: 'Interaction Studio Connections 2019 Keynote Michael Page',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/is_cnx19keynote_michael-page/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: false,
	steps: [
		{
			goto: testhost + '',
			waitFor: 2000,
			name: '0001.welcome'
		},
		// These don't work because it can't see inside of the SVG for some reason
		// {
		// 	hover: '#Michael-Page-hover-target',
		// 	waitFor: 200,
		// 	name: '0002.welcome.hover'
		// },
		// {
		// 	click: '#Michael-Page-hover-target',
		// 	waitFor: 'body',
		// 	name: '0010.lifecycles'
		// },
		{
			goto: testhost + 'lifecycles',
			waitFor: 'body',
			name: '0010.lifecycles'
		},
		{
			waitFor: 2000,
			name: '0011.lifecycles.loaded'
		},
		{
			click: '#touchpointsSelection',
			waitFor: 500,
			name: '0012.lifecycles.click-combobox'
		},
		{
			click: '#touchpointsSelection-dropdown li:nth-of-type(3)',
			waitFor: 'body',
			name: '0020.channels'
		},
		{
			waitFor: 2000,
			name: '0021.channels.loaded'
		},
		{
			click: '#test-and-publish',
			waitFor: 'body',
			name: '0030.test-and-publish'
		}
	]
};