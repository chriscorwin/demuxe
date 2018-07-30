const settings = require('./settings.config');
var env = process.env.ENV || 'local';
const should = require('chai').should();
const Differencify = require('../node_modules/sf-differencify/dist/index');
const differencify = new Differencify({
	debug: true,
	imageSnapshotPath: settings.imageSnapshotPath || './test/screenshots/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: settings.mismatchThreshold || 0.001
});

describe('DMP Demo Flow', function () {
	this.timeout(3000);
	const testhost = settings[env].host;

	it('should be entirely navicable', async function () {
		let hasError = false;
		const handleResult = (success) => {
			if (!success) {
				hasError = true;
			}
		}

		await differencify.launchBrowser({
			headless: settings.headless,
		});
		const result = await differencify
			.init({
				testName: 'dmp.main-flow.test-drive',
			})
			.newPage()
			.setViewport({ width: 1240, height: 800 })
			// START - OVERVIEW PAGE - SLIDE 28
			.goto(testhost)
			.waitFor('body')
			.screenshot()
			.toMatchSnapshot()
			.result(handleResult)
			// SCROLL DOWN ON OVERVIEW PAGE - SLIDE 29
			// GOTO DATA STUDIO - SLIDE 30 & 31
			.click('#data-studio')
			.waitFor('body')
			.screenshot()
			.toMatchSnapshot()
			.result(handleResult)
			// GOTO SEGMENTS - SLIDE 31 & 32
			.click('#segments-global-nav-link')
			.waitFor('body')
			.screenshot()
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK COG ON HIGH VALUE CUSTOMERS ITEM
			// CLICK LOOKALIKE IN DROPDOWN MENU
			// HOVER OVER MODERATELY SIMILAR
			// CLICK MODERATELY SIMILAR
			// CLICK CREATE LOOKALIKE SEGMENT
			// HOVER INSIGHTS NAV LINK
			// CLICK EINSTEIN SEGMENTATION LINK
			.click('#einstein-segmentation-link')
			.waitFor('body')
			.screenshot()
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK CREATE A NEW SEGMENT USING THIS PERSONA
			// SELECT "MARKETING CLOUD" IN ACTIVATION
			// SELECT "DOUBLE CLICK" IN ACTIVATION
			// CLICK "SAVE"
			.close()
			.end();
		await differencify.cleanup();

		hasError.should.be.false;
	})
});