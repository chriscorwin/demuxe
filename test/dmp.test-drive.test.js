const settings = require('../config/config.js')();
var env = process.env.ENV || 'local';
const should = require('chai').should();
const Differencify = require('../node_modules/sf-differencify/dist/index');
const differencify = new Differencify({
	debug: true,
	imageSnapshotPath: settings.tests.imageSnapshotPath || './test/screenshots/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: settings.tests.mismatchThreshold || 0.001
});

const getOptions = (step) => ({
	fullPage: true,
	path: `${settings.tests.imageSnapshotPath}dmp.main-flow.${step}.png`
});

describe('DMP Demo Flow', function () {
	this.timeout(settings.tests.timeout);
	const testhost = settings[env].host;

	it('should be entirely navicable', async function () {
		let hasError = false;
		const handleResult = (success) => {
			if (!success) {
				hasError = true;
			}
		}

		await differencify.launchBrowser({
			headless: settings.tests.headless,
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
			.screenshot(getOptions('0001.overview'))
			.toMatchSnapshot()
			.result(handleResult)
			// SCROLL DOWN ON OVERVIEW PAGE - SLIDE 29
			.evaluate(_ => {
				window.scrollBy(0, window.innerHeight);
			})
			.waitFor(2000)
			.screenshot(getOptions('0002.overview'))
			.toMatchSnapshot()
			.result(handleResult)
			// GOTO DATA STUDIO - SLIDE 30 & 31
			.click('#data-studio')
			.waitFor('body')
			.screenshot(getOptions('0100.data-studio'))
			.toMatchSnapshot()
			.result(handleResult)
			// GOTO SEGMENTS - SLIDE 31 & 32
			.click('#segments-global-nav-link')
			.waitFor('body')
			.screenshot(getOptions('0200.segments'))
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK COG ON HIGH VALUE CUSTOMERS ITEM
			.click('.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-settings')
			.waitFor(200)
			.screenshot(getOptions('0201.segments'))
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK LOOKALIKE IN DROPDOWN MENU
			.click('.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-dropdown .slds-dropdown__item:nth-of-type(4)')
			.waitFor(200)
			.screenshot(getOptions('0210.segments'))
			.toMatchSnapshot()
			.result(handleResult)
			// HOVER OVER MODERATELY SIMILAR
			// CLICK MODERATELY SIMILAR
			// CLICK CREATE LOOKALIKE SEGMENT
			.click('.slds-button.slds-button_brand')
			.waitFor('body')
			.screenshot(getOptions('0300.segments.build-standard-segment'))
			.toMatchSnapshot()
			.result(handleResult)
			// SELECT "MARKETING CLOUD" IN ACTIVATION
			.click('#checkbox7wrapper')
			.waitFor('body')
			.screenshot(getOptions('0301.segments.build-standard-segment'))
			.toMatchSnapshot()
			.result(handleResult)
			// SELECT "DOUBLE CLICK" IN ACTIVATION
			.click('#checkbox6wrapper')
			.waitFor('body')
			.screenshot(getOptions('0302.segments.build-standard-segment'))
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK "SAVE" AND GET TAKEN BACK TO SEGMENTS
			.click('#saveButton')
			.waitFor('body')
			.screenshot(getOptions('0400.segments.manage-segments'))
			.toMatchSnapshot()
			.result(handleResult)

			// This is currently outside of our demo flow.
			// HOVER INSIGHTS NAV LINK
			// CLICK EINSTEIN SEGMENTATION LINK
			.goto(`${testhost}insights/einstein-segmentation`)
			.waitFor('body')
			.screenshot(getOptions('XXXX.einstein'))
			.toMatchSnapshot()
			.result(handleResult)
			// CLICK CREATE A NEW SEGMENT USING THIS PERSONA
			.close()
			.end();
		await differencify.cleanup();

		hasError.should.be.false;
	})
});