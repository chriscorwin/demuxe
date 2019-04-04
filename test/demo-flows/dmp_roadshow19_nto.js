
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'dmp_roadshow19_nto',
	name: 'dmp.roadshow19.nto',
	description: 'DMP Demo Flow',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/dmp_roadshow19_nto/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: true,
	skipSlideCapture: false,
	steps: [
		{
			goto: testhost,
			waitFor: 2000,
			name: '0001.overview'
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: 2000,
			name: '0002.overview',
			skipTestCapture: true
		},
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight * 2);
			},
			waitFor: 2000,
			name: '0003.overview',
			skipTestCapture: true
		},
		{
			click: '#manage-consumer-rights',
			waitFor: 'body',
			name: '0100.manage-consumer-rights',
			skipSlideCapture: true
		},
		// GOTO CONSUMER RIGHTS MANAGEMENT PAGE
		{
			waitFor: 2000,
			name: '0201.consumer-rights-management-page'
		},
		// SEGMENTS - MANAGE SEGMENTS
		{
			click: `#segments-global-nav-link`,
			waitFor: 'body',
			name: '0300.manage-segments'
		},
		// SEGMENTS - MANAGE SEGMENTS - NEW SEGMENT - RULES
		{
			click: `#new-segment`,
			// goto: `${testhost}segments/manage-segments/rules`,
			waitFor: 'body',
			name: '0310.manage-segments.rules'
		},
		// SEGMENTS - MANAGE SEGMENTS - NEW SEGMENT - DETAILS & ACTIVATION
		{
			click: `#continue-and-edit`,
			// goto: `${testhost}segments/manage-segments/details-and-activation`,
			waitFor: 'body',
			name: '0400.manage-segments.details-and-activation'
		},
		// CLICK "SEGMENT NAME" TO FILL
		{
			click: '#segment-name',
			waitFor: 200,
			name: '0411.manage-segments.details-and-activation'
		},
		// CLICK ACTIVATE TOGGLE
		{
			click: '#activate-toggle',
			waitFor: 200,
			name: '0412.manage-segments.details-and-activation'
		},
		// SELECT "MARKETING CLOUD" IN ACTIVATION
		{
			click: '#checkbox7wrapper',
			waitFor: 'body',
			name: '0413.manage-segments.details-and-activation'
		},
		// CLICK "SAVE"
		// SEGMENTS - MANAGE SEGMENTS
		{
			click: '#saveButton',
			// goto: `${testhost}segments/manage-segments`,
			waitFor: 'body',
			name: '0500.manage-segments'
		},

		// DATA STUDIO - AUDIENCE DISCOVERY
		{
			click: '#data-studio',
			goto: `${testhost}data-studio/audience-discovery`,
			waitFor: 'body',
			name: '0600.data-studio.audience-discovery'
		},
		{
			click: '#grid .slds-col:nth-of-type(2) img',
			waitFor: 200,
			name: '0610.data-studio.audience-discovery.click-fifa'
		},
		{
			click: '#card1 a:nth-of-type(2)',
			waitFor: 'body',
			name: '0700.einstein-segmentation'
		}
	]
};