const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'is_basecamp19_msm',
	name: 'is.basecamp19.msm',
	description: 'Interaction Studio Basecamp 2019 Money Supermarket',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/is_basecamp19_msm/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: false,
	steps: [
		{
			goto: testhost + '/msm',
			waitFor: 'body',
			name: '0001.msm-home'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0001.msm-home.scroll1',
			description: 'scroll down'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0010.msm-mortgages',
			description: 'click "mortgages" panel'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: XSHORT,
			name: '0010.msm-mortgages.scroll1',
			description: 'scroll down'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight * 2);
			},
			waitFor: XSHORT,
			name: '0010.msm-mortgages.scroll2',
			description: 'scroll down more'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0020.msm-mortgage-eligibility',
			description: 'click "read our eligibility guide" button'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0040.right-move',
			description: 'go to rightmove website (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0041.right-move.cam',
			description: 'enter "cam" in input box (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0042.right-move.cambridge',
			description: 'select "Cambridge, Cambridgeshire" (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0050.right-move.msm',
			description: 'sees ad for Money Supermarket (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0100.app-store.msm-app',
			description: 'Device switch to view app in App Store (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0110.app-install',
			description: 'Installs Money Supermarket App (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0120.app-open',
			description: 'Open Money Supermarket App (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0130.msm-app.info',
			description: 'Fill in information (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0140.msm-app.credit-score',
			description: 'View credit score (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0200.journey-builder',
			description: 'Device switch to Journey Builder (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0201.journey-builder.hover',
			description: 'Hover Journey Builder paths (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0202.journey-builder.hover-off',
			description: 'Hover off Journey Builder paths (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0300.email-studio',
			description: 'Click e-mail to go to email studio (click anywhere)'
		},
		{
			waitFor: 2700,
			name: '0011.lifecycles.loaded'
		},
		{
			click: '#touchpointsSelection',
			waitFor: 500,
			name: '0012.lifecycles.click-combobox'
		},
		{
			click: '#touchpointsSelection-dropdown li:nth-of-type(2)',
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