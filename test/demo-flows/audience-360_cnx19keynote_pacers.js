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
	skipSlideCapture: true,
	steps: [
		{
			goto: `${testhost}pacers`,
			waitFor: 'body',
			name: '0001.magick-flow',
			description: 'Go to http://localhost:3000/pacers'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0002.magick-flow',
			description: 'Click the Get Started button'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0003.magick-flow',
			description: "Select Pacers Customer Community"
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0004.magick-flow',
			description: 'Select Pacers Sales'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0005.magick-flow',
			description: 'Select Service Central'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0006.magick-flow',
			description: 'Select PacersTeamStore'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0007.magick-flow',
			description: 'Select Ticketmaster'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0008.magick-flow',
			description: 'click Continue button'
		},
		{
			click: 'body',
			waitFor: '#import-in-progress-wrapper',
			name: '0100.import-data',
			description: 'click Begin Import button'
		},
		{
			waitFor: LONG,
			name: '0101.import-data',
			description: 'Watch animation'
		},
		{
			waitFor: XLONG,
			name: '0102.import-data',
			description: 'continue watching animation'
		},
		{
			click: '#home-nav-link',
			waitFor: 'body',
			name: '0200.dashboard.modal',
			description: 'click "Home" link in top nav'
		},
		{
			evaluate: () => {
				kickoff();
			},
			waitFor: XSHORT,
			name: '0210.dashboard',
			description: 'click "Got it" button'
		},
		{
			waitFor: MEDIUM,
			name: '0211.dashboard',
			description: 'watch animations'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0212.dashboard.scroll1',
			description: 'scroll down'
		},
		{
			waitFor: MEDIUM,
			name: '0213.dashboard.scroll1',
			description: 'watch animations'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight * 2);
			},
			waitFor: XSHORT,
			name: '0214.dashboard.scroll2',
			description: 'scroll down'
		},
		{
			waitFor: MEDIUM,
			name: '0215.dashboard.scroll2',
			description: 'watch animations'
		},
		{
			evaluate: () => {
				navigatePage('/pacers#13');
			},
			waitFor: 'body',
			name: '0300.magick-flow',
			description: 'Scroll back up and click "Create Segment" button in top right (Einstein Insights) panel'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0301.magick-flow',
			description: 'click the "refresh" icon'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0302.magick-flow',
			description: 'close the popover'
		},
		{
			waitFor: XSHORT,
			name: '0303.magick-flow',
			description: 'wait for animation'
		},
		{
			click: 'body',
			waitFor: MEDIUM,
			name: '0304.magick-flow',
			description: 'click "Continue to Publish" button (at top right)'
		},
		{
			click: 'body',
			waitFor: SHORT,
			name: '0305.magick-flow',
			description: 'click "Save & Confirm" button (at top right)'
		}
	]
};
