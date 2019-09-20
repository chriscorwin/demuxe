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
			name: '0001.msm-home',
			description: 'go to Money Supermarket Magick-Flow'
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
			click: 'body',
			waitFor: 'body',
			name: '0310.email-studio.content',
			description: 'Click content tab (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0311.email-studio.content.dnd',
			description: 'Drag and drop "2 - Monitor and improve your credit score" into template'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0312.email-studio.content.save',
			description: 'Click save button (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0320.email-studio',
			description: 'Click activate button (click anywhere)'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0400.email',
			description: 'Device switch to user\'s e-mail on iPhone'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0410.email',
			description: 'Click through e-mail to view article in app'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0500.interaction-studio',
			description: 'Device Switch to Interaction Studio'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0500.app',
			description: 'Device switch back to article in app on phone'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0510.app.notification',
			description: 'push notification appears'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0520.app.credit-card',
			description: 'click through to apply for credit card'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0530.phone.sms',
			description: 'receives text message'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0600.interaction-studio.lifecycles',
			description: 'Device Switch back to Interaction Studio, lifecycles view'
		},
		{
			waitFor: 2700,
			name: '0601.interaction-studio.lifecycles.loaded'
		},
		{
			click: '#touchpointsSelection',
			waitFor: 500,
			name: '0602.interaction-studio.lifecycles.click-combobox'
		},
		{
			click: '#touchpointsSelection-dropdown li:nth-of-type(2)',
			waitFor: 'body',
			name: '0620.interaction-studio.channels'
		},
		{
			waitFor: 2000,
			name: '0621.interaction-studio.channels.loaded'
		},
		{
			click: '#datorama-shortcut',
			waitFor: 'body',
			name: '0700.datorama'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight/2);
			},
			waitFor: 200,
			name: '0701.datorama.scroll-down'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0710.datorama.datasources',
			description: 'click through to data sources'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: 200,
			name: '0711.datorama.datasources.scroll1',
			description: 'scroll down'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight * 2);
			},
			waitFor: 200,
			name: '0712.datorama.datasources.scroll2',
			description: 'scroll down'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0800.phone',
			description: 'Device switch back to lock screen on phone'
		},
		{
			click: 'body',
			waitFor: 'body',
			name: '0510.app.notification',
			description: 'push notification appears'
		}
	]
};