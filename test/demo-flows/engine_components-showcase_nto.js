
const env = process.env.ENV || 'local';
const settings = require('../../config/config.js')();
const testhost = settings[env].host;

module.exports = {
	id: 'engine_components-showcase_nto',
	name: 'engine.components-showcase.nto',
	description: 'Components Showcase',
	headless: false,
	resolution: { width: 1280, height: 720 },
	debug: true,
	imageSnapshotPath: './test/screenshots/engine_components-showcase_nto/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: 0.001,
	skipTestCapture: false,
	skipSlideCapture: true,
	steps: [
		{
			goto: testhost + 'components-showcase',
			waitFor: 2000,
			name: '0001.index'
		},
		{
			evaluate: () => {
				document.querySelector('.builder-canvas').scrollBy(window.innerWidth, 0);
			},
			waitFor: 2000,
			name: '0002.index'
		}
	]
};