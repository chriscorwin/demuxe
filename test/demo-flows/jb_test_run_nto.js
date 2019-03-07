
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'jb_test_run_nto',
	name: 'jb.test_run.nto',
	description: 'JB Test Run NTO Flow',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/jb_test_run_nto/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: true,
	skipSlideCapture: false,
	steps: [
		{
			goto: testhost,
			waitFor: 'body',
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
			click: '#view-all-data-capture-sources',
			waitFor: 'body',
			name: '0100.data-capture-sources',
			skipSlideCapture: true
		},
		{
			waitFor: 2000,
			name: '0101.data-capture-sources'
		},
		// GOTO CONSUMER RIGHTS MANAGEMENT PAGE - SLIDE 45
		{
			click: '#content a',
			waitFor: 'body',
			name: '0200.consumer-rights-management-page',
			skipSlideCapture: true
		},
		{
			waitFor: 2000,
			name: '0201.consumer-rights-management-page'
		},
		// HOVER INSIGHTS NAV LINK
		// CLICK EINSTEIN SEGMENTATION LINK
		{
			goto: `${testhost}insights/einstein-segmentation`,
			waitFor: 'body',
			name: '0300.einstein-segmentation'
		},
		// CLICK CREATE NEW SEGMENT USING THIS PERSONA
		{
			click: '.slds-button.slds-button_brand',
			waitFor: 'body',
			name: '0310.segments.build-standard-segment'
		},
		// CLICK "SEGMENT NAME" TO FILL
		{
			click: '#segment-name',
			waitFor: 'body',
			name: '0311.segments.build-standard-segment'
		},
		// SELECT "MARKETING CLOUD" IN ACTIVATION
		{
			click: '#checkbox7wrapper',
			waitFor: 'body',
			name: '0312.segments.build-standard-segment'
		},
		// SELECT "DOUBLE CLICK" IN ACTIVATION
		{
			click: '#checkbox6wrapper',
			waitFor: 'body',
			name: '0313.segments.build-standard-segment'
		},
		// CLICK "SAVE" SHOULD DO NOTHING
		{
			click: '#saveButton',
			waitFor: 'body',
			name: '0314.segments.build-standard-segment'
		}
	]
};