
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'audience-studio_cnx19keynote_fever',
	name: 'audience-studio.cnx19keynote.fever',
	description: 'Audience Studio Connections 2019 Keynote Fever',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/audience-studio_cnx19keynote_fever/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: false,
	steps: [
		{
			goto: testhost + '',
			waitFor: 'body',
			name: '0001.manage-segments'
		},
		{
			waitFor: 1000,
			name: '0002.manage-segments.loaded'
		},
		{
			click: '.slds-panel-box__header-settings',
			waitFor: 500,
			name: '0010.manage-segments.click-settings'
		},
		{
			click: '.slds-panel-box .slds-dropdown__item:nth-of-type(4)',
			waitFor: 'body',
			name: '0020.lookalikes'
		},
		{
			click: '#lookalike',
			waitFor: 200,
			name: '0021.lookalikes.clicked'
		},
		{
			click: '#lookalike-clicked',
			waitFor: 'body',
			name: '0030.manage-segments.lookalike-added'
		},
		{
			waitFor: 1000,
			name: '0031.manage-segments.lookalike-added.loaded'
		},
		{
			click: '#einsteinBadge',
			waitFor: 200,
			name: '0035.manage-segments.einstein-clicked'
		}
	]
};