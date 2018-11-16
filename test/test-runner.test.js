const Differencify = require('../node_modules/sf-differencify/dist/index');
const env = process.env.ENV || 'local';
const fs = require('fs');
const settings = require('../config/config.js')();
const should = require('chai').should();
const demos = require('./demo-flows/index');

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

// This will allow for you to test a different demo flow, or All demo flows, by passing in a variable
// when you start the tests, eg:
//    npm run test dmp_crocs
// As of this writing (11/13/18) it is not possible for demuxe to serve more than one product/brand
// combination at once, but this could be useful if you want to see if previous demo flows work with
// the current brand/product combination.
const whatToTest = process.argv[3] || `${settings.productTemplate}_${settings.brandTheme}`;

console.log(`whatToTest ${whatToTest}`);

describe(`${whatToTest} slideshow creation`, async function () {
	this.timeout(settings.tests.timeout);
	await Promise.all(demos.map(async (demo) => {
		if (whatToTest !== 'All' && whatToTest !== demo.id) return;
		if (demo.skipSlideCapture) return;

		console.log('in here');

		let capturedSlides = false;
		let slides = [];

		const getMatchOptions = (step) => ({imgName: `${demo.name}.${step}`});

		const imageSnapshotPath = demo.imageSnapshotPath || `./test/screenshots/${demo.id}/`;
		const differencify = new Differencify({
			debug: demo.debug || true,
			imageSnapshotPath,
			imageSnapshotPathProvided: true,
			mismatchThreshold: settings.tests.mismatchThreshold || tests.mismatchThreshold || 0.001
		});
console.log('now here');
		await it(`${demo.id} should generate slideshow`, async function () {
			console.log('yes/"');
			await (async () => {
				console.log('here');
				const target = differencify.init({ testName: demo.name, chain: false });
				await target.launch({ headless: demo.headless });
				const page = await target.newPage();
			
				// set the viewport to 16:9 to match Google Slides
				await page.setViewport({ width: 1280, height: 720 });

				for (let step of demo.steps) {
					// make sure to at least RUN the step, even if we don't capture the outcome
					await testStep(target, page, step);

					if (!step.skipSlideCapture) {
						capturedSlides = true;

						const slide = await page.screenshot({ fullPage: false });
						// save the snapshot to disk (ignore non-matches. This is probably not the right way...)
						await target.toMatchSnapshot(slide, getMatchOptions(step.name + '.slide'), () => {});
						// move the snapshot to the slides/screenshots directory
						await fs.rename(`${imageSnapshotPath}${getMatchOptions(step.name + '.slide').imgName}.png`, `./slides/screenshots/${getMatchOptions(step.name + '.slide').imgName}.png`);
						// push the markdown for the slide to the slides array to be written with the others when all said and done
						slides.push(`---

![](${settings.dev.host}screenshots/${getMatchOptions(step.name + '.slide').imgName}.png){.background}

`)
					};
				}

				await page.close();
				await target.close();
			})();

			fs.writeFile(`slides/${demo.name}.md`, slides.join(''), function(err) {
				if(err) {
					return console.log(err);
				}
			
				console.log("Markdown file was saved!");
			});

			capturedSlides.should.be.true;
		});
	}));
})

describe(`${whatToTest} tests`, async function () {
	this.timeout(settings.tests.timeout);
	await Promise.all(demos.map(async (demo) => {
		if (whatToTest !== 'All' && whatToTest !== demo.id) return;
		if (demo.skipTestCapture) return;

		const getMatchOptions = (step) => ({imgName: `${demo.name}.${step}`});

		const getScreenshotOptions = () => ({
			fullPage: true
		});

		const imageSnapshotPath = demo.imageSnapshotPath || `./test/screenshots/${demo.id}/`;
		const differencify = new Differencify({
			debug: demo.debug || true,
			imageSnapshotPath,
			imageSnapshotPathProvided: true,
			mismatchThreshold: settings.tests.mismatchThreshold || tests.mismatchThreshold || 0.001
		});

		let hasError = false;

		const handleResult = (resultDetail) => {
			if (!resultDetail.testResult.matched && !resultDetail.testResult.updated) {
				hasError = true;

				console.error(resultDetail);
			}
		}

		await it(`${demo.id} should be entirely navicable`, async function () {
			await (async () => {
				const target = differencify.init({ testName: demo.name, chain: false });
				await target.launch({ headless: demo.headless });
				const page = await target.newPage();

				// The official screen resolution for Salesforce Keynote demos is 1280x720
				await page.setViewport(demo.resolution);

				for (let step of demo.steps) {
					// make sure to at least RUN the step, even if we don't capture the outcome
					await testStep(target, page, step);

					if (!step.skipTestCapture) {
						const screenshot = await page.screenshot(getScreenshotOptions());
						await target.toMatchSnapshot(screenshot, getMatchOptions(step.name), handleResult);
					}
				};
			
				await page.close();
				await target.close();
			})();
	
			hasError.should.be.false;
		});
	}));
});
