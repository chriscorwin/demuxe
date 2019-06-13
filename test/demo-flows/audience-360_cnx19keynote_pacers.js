const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;
const XSHORT = 10;
const SHORT = 100;
const MEDIUM = 2000;
const LONG = 3000;
const XLONG = 6000;

module.exports = {
	id: 'audience-360_cnx19keynote_pacers',
	name: 'audience-360.cnx19keynote.pacers',
	description: 'audience-360 DF 19 Pacers Keynote Demo Flow',
	headless: false,
	debug: true,
	resolution: { width: 1280, height: 720 },
	imageSnapshotPath: './test/screenshots/audience-360_cnx19keynote_pacers/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: false,
	steps: [
		{
			goto: `${testhost}pacers`,
			waitFor: 'body',
			name: '0001.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0002.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0003.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0003.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0004.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0005.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0006.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0007.magick-flow'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0100.import-data'
		},
		{
			waitFor: LONG,
			name: '0101.import-data'
		},
		{
			waitFor: XLONG,
			name: '0102.import-data'
		},
		{
			click: '#home-nav-link',
			waitFor: 'body',
			name: '0200.dashboard.modal'
		},
		{
			evaluate: () => {
				kickoff();
			},
			waitFor: XSHORT,
			name: '0210.dashboard'
		},
		{
			waitFor: MEDIUM,
			name: '0211.dashboard'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0212.dashboard.scroll1'
		},
		{
			waitFor: MEDIUM,
			name: '0213.dashboard.scroll1'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight * 2);
			},
			waitFor: XSHORT,
			name: '0214.dashboard.scroll2'
		},
		{
			waitFor: MEDIUM,
			name: '0215.dashboard.scroll2'
		},
		{
			evaluate: () => {
				navigatePage('/pacers#13');
			},
			waitFor: 'body',
			name: '0300.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0301.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0302.magick-flow'
		},
		{
			waitFor: SHORT,
			name: '0303.magick-flow'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0304.magick-flow'
		}
	]
};
