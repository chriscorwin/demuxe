// https://docs.google.com/presentation/d/1CaK4X_m1DUN8vbjbA8C6HJLrBXvQpkbPJcExSA5sMwQ/edit#slide=id.g3fd7597332_0_1096
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

const getMatchOptions = (step) => ({
	imgName: `dmp.main-flow.${step}`
});

const getScreenshotOptions = () => ({
	fullPage: true
})

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
			// START - OVERVIEW PAGE - SLIDE 42
			.goto(testhost)
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0001.overview'))
			.result(handleResult)
			// SCROLL DOWN ON OVERVIEW PAGE - SLIDE 43
			.evaluate(_ => {
				window.scrollBy(0, window.innerHeight);
			})
			.waitFor(2000)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0002.overview'))
			.result(handleResult)
			// GOTO DATA CAPTURE SOURCES PAGE - SLIDE 44
			.click('#view-all-data-capture-sources')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0100.data-capture-sources'))
			.result(handleResult)
			// GOTO CONSUMER RIGHTS MANAGEMENT PAGE - SLIDE 45
			.click('#consumer-rights-management-link')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0200.consumer-rights-management-page'))
			.result(handleResult)
			// HOVER INSIGHTS NAV LINK
			// CLICK EINSTEIN SEGMENTATION LINK
			.click(`#einstein-segmentation-link`)
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0300.einstein-segmentation'))
			.result(handleResult)
			// CLICK COG ON HIGH VALUE CUSTOMERS ITEM
			.click('.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-settings')
			.waitFor(200)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0201.segments'))
			.result(handleResult)
			// CLICK LOOKALIKE IN DROPDOWN MENU
			.click('.slds-panel-box__header:nth-of-type(1) .slds-panel-box__header-dropdown .slds-dropdown__item:nth-of-type(4)')
			.waitFor(200)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0210.segments.lookalike'))
			.result(handleResult)
			// HOVER OVER MODERATELY SIMILAR
			// CLICK MODERATELY SIMILAR
			// .click('#lookalikes-chart .highcharts-root > .highcharts-series-group > .highcharts-series > path.highcharts-point:nth-of-type(7)')
			.click('#lookalikes-chart') // HACK BECAUSE SVG UGH
			.waitFor(200)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0212.segments.lookalike'))
			.result(handleResult)
			// CLICK CREATE LOOKALIKE SEGMENT
			.click('.slds-button.slds-button_brand')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0300.segments.build-standard-segment'))
			.result(handleResult)
			// SELECT "MARKETING CLOUD" IN ACTIVATION
			.click('#checkbox7wrapper')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0301.segments.build-standard-segment'))
			.result(handleResult)
			// SELECT "DOUBLE CLICK" IN ACTIVATION
			.click('#checkbox6wrapper')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0302.segments.build-standard-segment'))
			.result(handleResult)
			// CLICK "SAVE" AND GET TAKEN BACK TO SEGMENTS
			.click('#saveButton')
			.waitFor('body')
			.waitFor(2000)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0400.segments.manage-segments'))
			.result(handleResult)

			.close()
			.end();
		await differencify.cleanup();

		hasError.should.be.false;
	})
});