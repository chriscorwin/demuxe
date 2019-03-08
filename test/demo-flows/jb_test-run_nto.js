
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'jb_test-run_nto',
	name: 'jb.test-run.nto',
	description: 'JB Test Run NTO Flow',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/jb_test-run_nto/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: true,
	skipSlideCapture: false,
	steps: [
		// MC Homepage
		{
			goto: testhost,
			waitFor: 'body',
			name: '0001.marketing-cloud-homepage'
		},
		// {
		// 	evaluate: () => {
		// 		window.scrollBy(0, window.innerHeight);
		// 	},
		// 	waitFor: 2000,
		// 	name: '0002.marketing-cloud-homepage',
		// 	skipTestCapture: true
		// },
		// {
		// 	evaluate: () => {
		// 		window.scrollBy(0, window.innerHeight * 2);
		// 	},
		// 	waitFor: 2000,
		// 	name: '0003.marketing-cloud-homepage',
		// 	skipTestCapture: true
		// },
		// // Select Journey Builder
		// {
		// 	click: '#journey-builder',
		// 	name: '0010.marketing-cloud-homepage.jb-link',
		// },
		// {
		// 	click: '#dashboard-link',
		// 	name: '0011.marketing-cloud-homepage.dashboard-link',
		// },
		// // JB Dashboard
		// {
		// 	waitFor: 'body',
		// 	name: '0100.jb-dashboard'
		// },
		// // Select an existing journey from the current folder
		// // Journey Canvas
		// {
		// 	click: '#existing-journey',
		// 	waitFor: 'body',
		// 	name: '0200.jb-canvas'
		// },
		// // Review Journey analytics by clicking Pie icon
		// {
		// 	click: '#pie-icon',
		// 	waitFor: 2000,
		// 	name: '0210.jb-canvas.review-analytics'
		// },
		// // Return to canvas
		// {
		// 	click: '#close-analytics',
		// 	waitFor: 2000,
		// 	name: '0211.jb-canvas'
		// },
		// // Review email analytics by clicking on the existing email
		// {
		// 	click: '#existing-email',
		// 	waitFor: 2000,
		// 	name: '0220.jb-canvas.review-email'
		// },
		// // Create new journey version by clicking the related button
		// // Display the editable Journey canvas
		// {
		// 	click: '#related-button',
		// 	waitFor: 2000,
		// 	name: '0230.jb-canvas.create-new-journey'
		// },
		// // Drag new SMS message to canvas
		// // Left drawer opens on drop to show empty SMS configuration
		// {
		// 	drag: '#sms',
		// 	dragTo: '#canvas-drop-target',
		// 	waitFor: 2000,
		// 	name: '0231.jb-canvas.drag-new-sms'
		// },
		// // Choose “New Message”
		// // Editor slides out covering the full screen
		// {
		// 	click: '#new-message',
		// 	waitFor: 2000,
		// 	name: '0240.jb-canvas.new-message'
		// },
		// // Add text in the “Message” text box and display the same text in the preview
		// {
		// 	click: '#new-message-box',
		// 	waitFor: 2000,
		// 	name: '0241.jb-canvas.new-message.add-text'
		// },
		// // Close editor and return to the activity
		// {
		// 	click: '#close-editor',
		// 	waitFor: 2000,
		// 	name: '0250.jb-canvas.activity'
		// },
		// // Activate updated journey
		// {
		// 	click: '#activate-journey',
		// 	waitFor: 2000,
		// 	name: '0260.jb-canvas.activate-journey'
		// }
	]
};