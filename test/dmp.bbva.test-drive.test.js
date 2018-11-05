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
const getMatchOptions = (step) => ({imgName: `dmp.bbva.${step}`});

const getScreenshotOptions = () => ({
	fullPage: true
});

describe('DMP Demo Flow', function () {
	this.timeout(settings.tests.timeout);
	const testhost = settings[env].host;

	it('should be entirely navicable', async function () {
		let hasError = false;

		const handleResult = (resultDetail) => {
			if (!resultDetail.testResult.matched && !resultDetail.testResult.updated) {
				hasError = true;

				console.error(resultDetail);
			}
		}


		const demo = {
			name: 'dmp.bbva.test-drive',
			headless: false,
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
					name: '0002.overview'
				},
				{
					evaluate: () => {
						window.scrollBy(0, window.innerHeight * 2);
					},
					waitFor: 2000,
					name: '0003.overview'
				},
				{
					click: '#view-all-data-capture-sources',
					waitFor: 'body',
					name: '0100.data-capture-sources'
				},
				{
					waitFor: 2000,
					name: '0101.data-capture-sources'
				},
				// GOTO CONSUMER RIGHTS MANAGEMENT PAGE - SLIDE 45
				{
					click: '#content a',
					waitFor: 'body',
					name: '0200.consumer-rights-management-page'
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


const testStep = async (target, page, step) => {
	if (typeof step.goto !== "undefined") {
		console.log('goto', step.goto);
		await page.goto(step.goto);
	}

	if (typeof step.click !== "undefined") {
		console.log('click', step.click);
		await page.click(step.click);
	}

	if (typeof step.evaluate !== "undefined") {
		console.log('evaluate');
		await page.evaluate(step.evaluate);
	}
	
	await page.waitFor(step.waitFor);
}

await (async () => {
	const target = differencify.init({ testName: demo.name, chain: false });
	await target.launch({ headless: demo.headless });
	const page = await target.newPage();
	await page.setViewport({ width: 1600, height: 1200 });

	// if (!step.skipSlideCapture) {
		// set the viewport to 16:9 to match Google Slides
		await page.setViewport({ width: 1280, height: 720 });

		for (let step of demo.steps) {
			await testStep(target, page, step);

			const slide = await page.screenshot({ fullPage: false });
			// save the snapshot to disk (ignore non-matches. This is probably not the right way...)
			await target.toMatchSnapshot(slide, getMatchOptions(step.name + '.slide'));
			// move the snapshot to the slides/screenshots directory
			await fs.rename(`./test/screenshots/${getMatchOptions(step.name + '.slide').imgName}.png`, `./slides/screenshots/${getMatchOptions(step.name + '.slide').imgName}.png`);
			// push the markdown for the slide to the slides array to be written with the others when all said and done
			slides.push(`---
	
	![](${settings.dev.host}screenshots/${getMatchOptions(step.name + '.slide').imgName}.png){.background}
	
	`)
		};
	// }


	for (let step of demo.steps) {
		await testStep(target, page, step);

		const screenshot = await page.screenshot(getScreenshotOptions());
		await target.toMatchSnapshot(screenshot, getMatchOptions(step.name), handleResult);
	};


	await page.close();
	await target.close();
})();

fs.writeFile("slides/dmp.bbva.md", slides.join(''), function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("The file was saved!");
}); 



		hasError.should.be.false;
	})
});