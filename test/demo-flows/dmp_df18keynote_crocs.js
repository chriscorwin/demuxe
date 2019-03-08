const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'dmp_df18keynote_crocs',
	name: 'dmp.df18keynote.crocs',
	description: 'DMP Crocs Demo Flow',
	headless: false,
	debug: true,
	resultion: { width: 1280, height: 720 },
	imageSnapshotPath: './test/screenshots/dmp_df18keynote_crocs/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	steps: [
		// START - OVERVIEW PAGE - SLIDE 28
		{
			goto: testhost,
			waitFor: 'body',
			name: '0001.overview'
		},
		// SCROLL DOWN ON OVERVIEW PAGE - SLIDE 29
		{
			evaluate: () => {
				window.scrollBy(0, window.innerHeight);
			},
			waitFor: 2000,
			name: '0002.overview'
		},
		// GOTO DATA STUDIO - SLIDE 30 & 31
		{
			click: '#data-studio',
			waitFor: 'body',
			name: '0100.data-studio'
		},
		// GOTO SEGMENTS - SLIDE 31 & 32
		{
			click: '#segments-global-nav-link',
			waitFor: 'body',
			name: '0200.segments'
		},
		// CLICK COG ON HIGH VALUE CUSTOMERS ITEM
		{
			click: '.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-settings',
			waitFor: 200,
			name: '0201.segments'
		},
		// CLICK LOOKALIKE IN DROPDOWN MENU
		{
			click: '.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-dropdown .slds-dropdown__item:nth-of-type(4)',
			waitFor: 200,
			name: '0210.segments.lookalike'
		},
		// HOVER OVER MODERATELY SIMILAR
		// CLICK MODERATELY SIMILAR
		// .click('#lookalikes-chart .highcharts-root > .highcharts-series-group > .highcharts-series > path.highcharts-point:nth-of-type(7)')
		{
			click: '#lookalikes-chart', // HACK BECAUSE SVG UGH
			waitFor: 200,
			name: '0212.segments.lookalike'
		},
		// CLICK CREATE LOOKALIKE SEGMENT
		{
			click: '.slds-button.slds-button_brand',
			waitFor: 200,
			name: '0300.segments.build-standard-segment'
		},
		// SELECT "MARKETING CLOUD" IN ACTIVATION
		{
			click: '#checkbox7wrapper',
			waitFor: 'body',
			name: '0301.segments.build-standard-segment'
		},
		// SELECT "DOUBLE CLICK" IN ACTIVATION
		{
			click: '#checkbox6wrapper',
			waitFor: 'body',
			name: '0302.segments.build-standard-segment'
		},
		// CLICK "SAVE" AND GET TAKEN BACK TO SEGMENTS
		{
			click: '#saveButton',
			waitFor: 'body',
			name: '0400.segments.manage-segments'
		},

		// This is currently outside of our demo flow.
		// HOVER INSIGHTS NAV LINK
		// CLICK EINSTEIN SEGMENTATION LINK
		{
			goto: `${testhost}insights/einstein-segmentation`,
			waitFor: 'body',
			name: 'XXXX.einstein'
		}
	]
};
