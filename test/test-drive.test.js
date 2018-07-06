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

describe('Main Demo Flow', function () {
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
				testName: 'main-flow.test-drive',
			})
			.newPage()
			.setViewport({ width: 1240, height: 800 })
			.goto(testhost)
			// INDEX PAGE
			.waitFor('body')
			.screenshot()
			.toMatchSnapshot()
			.result(handleResult)
			// DO THING
			.click('a')
			.waitFor(400)
			.screenshot({ clip: { y: 120, x: 195, height: 40, width: 140 } })
			.toMatchSnapshot()
			.result(handleResult)
			.close()
			.end();
		await differencify.cleanup();

		hasError.should.be.false;
	})
});