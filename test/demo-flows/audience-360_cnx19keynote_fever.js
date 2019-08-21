const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;
const XSHORT = 10;
const SHORT = 100;
const MEDIUM = 2000;
const LONG = 3000;
const XLONG = 6000;

module.exports = {
	id: 'audience-360_cnx19keynote_fever',
	name: 'audience-360.cnx19keynote.fever',
	description: 'audience-360 DF 19 Fever Keynote Demo Flow',
	headless: false,
	debug: true,
	resolution: { width: 1280, height: 720 },
	imageSnapshotPath: './test/screenshots/audience-360_cnx19keynote_fever/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: false,
	steps: [
		{
			goto: `${testhost}`,
			waitFor: 'body',
			name: '0000.dashboard',
			description: 'go to dashboard'
		},
		{
			evaluate: () => {
				kickoff();
			},
			waitFor: XSHORT,
			name: '0001.dashboard',
			description: `click "Let's Dive In!" button`
		},
		{
			waitFor: MEDIUM,
			name: '0002.dashboard',
			description: 'wait for animations to complete'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0003.dashboard.scroll1',
			description: 'scroll down'
		},
		{
			waitFor: MEDIUM,
			name: '0004.dashboard.scroll1',
			description: 'wait for animations to complete'
		},
		{
			evaluate: () => {
				navigatePage('/segments')
			},
			waitFor: 'body',
			name: '0100.segments',
			description: 'click "segments" in the top nav'
		},
		{
			waitFor: MEDIUM,
			name: '0101.segments',
			description: 'wait for animations to complete'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0102.segments.scroll1',
			description: 'scroll down'
		},
		{
			waitFor: MEDIUM,
			name: '0103.segments.scroll1',
			description: 'wait for animations to complete'
		},
		{
			evaluate: () => {
				navigatePage('/segments/families')
			},
			waitFor: 'body',
			name: '0100.families',
			description: 'click "Lottie Garner" in "People" table at bottom left'
		},
		{
			waitFor: MEDIUM,
			name: '0101.families',
			description: 'wait for animations to complete'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0102.families.scroll1',
			description: 'scroll down'
		},
		{
			waitFor: MEDIUM,
			name: '0103.families.scroll1',
			description: 'wait for animations to complete'
		},
		{
			click: '#data-studio',
			waitFor: XSHORT,
			name: '0301.magick-flow',
			description: 'click "Data Streams" in the top nav'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0302.magick-flow',
			description: 'click spaghetti monster icon button below "Deploy" button to the left of the folder icon button'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0303.magick-flow',
			description: 'tab switch to next screen (open in new tab)'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0304.magick-flow',
			description: 'tab switch to next screen (open in new tab)'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0305.magick-flow',
			description: 'click "refresh" button'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0306.magick-flow',
			description: 'close the popover menu'
		},
		{
			waitFor: MEDIUM,
			name: '0307.magick-flow',
			description: 'demo auto-advances...'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0308.magick-flow',
			description: 'click "Continue to Publish"'
		},
		{
			click: 'body',
			waitFor: XSHORT,
			name: '0309.magick-flow',
			description: 'select "Audience Studio"'
		}
	]
};
