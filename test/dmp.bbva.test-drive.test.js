// https://docs.google.com/presentation/d/1CaK4X_m1DUN8vbjbA8C6HJLrBXvQpkbPJcExSA5sMwQ/edit#slide=id.g3fd7597332_0_1096
const settings = require('../config/config.js')();
const env = process.env.ENV || 'local';
const fs = require('fs');
const should = require('chai').should();
const Differencify = require('../node_modules/sf-differencify/dist/index');
const differencify = new Differencify({
	debug: true,
	imageSnapshotPath: settings.tests.imageSnapshotPath || './test/screenshots/',
	imageSnapshotPathProvided: true,
	mismatchThreshold: settings.tests.mismatchThreshold || 0.001
});

let slides = [];
const getMatchOptions = (step) => {
	const imgName = `dmp.bbva.${step}`;
	slides.push(`---

![](${settings.dev.host}screenshots/${imgName}.png){.background}

`);

	return {
		imgName
	}
};

const getScreenshotOptions = () => ({
	fullPage: false
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
				testName: 'dmp.bbva.test-drive',
			})
			.newPage()
			// Google Slides expects 16:9 aspect ratio. 1240x697.50 (can be calculated here https://calculateaspectratio.com/)
			.setViewport({ width: 1240, height: 698 })
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
			// ALLOW ANIMATION TO FINISH
			.waitFor(2000)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0101.data-capture-sources'))
			.result(handleResult)
			// GOTO CONSUMER RIGHTS MANAGEMENT PAGE - SLIDE 45
			.click('#content a')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0200.consumer-rights-management-page'))
			.result(handleResult)
			// HOVER INSIGHTS NAV LINK
			// CLICK EINSTEIN SEGMENTATION LINK
			.goto(`${testhost}insights/einstein-segmentation`)
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0300.einstein-segmentation'))
			.result(handleResult)
			// CLICK CREATE NEW SEGMENT USING THIS PERSONA
			.click('.slds-button.slds-button_brand')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0300.segments.build-standard-segment'))
			.result(handleResult)
			// CLICK "SEGMENT NAME" TO FILL
			.click('#segment-name')
			.waitFor('body')
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('0301.0.segments.build-standard-segment'))
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


			// CURRENTLY OUTSIDE OF DEMO FLOW
			// CLICK "SAVE" SHOULD DO NOTHING
			.click('#saveButton')
			.waitFor('body')
			.waitFor(2000)
			.screenshot(getScreenshotOptions())
			.toMatchSnapshot(getMatchOptions('030X.segments.build-standard-segment'))
			.result(handleResult)



			.close()
			.end();
		await differencify.cleanup();

		fs.writeFile("slides/dmp.bbva.md", slides.join(''), function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		}); 

		hasError.should.be.false;
	})
});