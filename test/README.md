# Demo Flows

## Overview

Tests are actually demo flows. They should mirror as closely as possible the actual steps the presenter will take when running the actual demo. Defining a test is the very first step of creating a demo, can reasonably be done with the designer at the initial discovery meeting. This will also help ensure the design spec is fully fleshed out. You will know the demo is complete when you run the test and it passes (ie Test Driven Development _or_ "TDD").


## Tests
### Defining Tests

Think of tests as DVDs.

`/test/test-runner.test.js` is a DVD player. You almost certainly should not open up and modify your DVD player.

Your DVD shelf is `/test/demo-flows/`. You must add your DVD to the shelf "directory" in `/test/demo-flows/index.js` so that the DVD player knows it exists.

DVDs are named `${product}_${brand}.js`. eg: The DVD for the DMP product branded with the BBVA brand would be named `dmp_bbva.js`, its final path would be: `/test/demo-flows/dmp_bbva.js`.

You put a DVD into the DVD player with `/config/config.json`. The DVD player will go look in that config file to see which Product/Brand combination is currently being served by the server, and test the flow specified there. The variables the player will look at are `productTemplate` and `brandTheme`.

### Google Slides Creation

When the tests run they capture 1280x720 screenshots which are used to create a Markdown file named `/slides/${product}.${theme}.md` (eg `/slides/dmp.bbva.md`) which can be used by [md2googleslides](https://github.com/gsuitedevs/md2googleslides) to generate a Google Slide Deck. 

If you want to skip capturing a step as a slide, add `skipSlideCapture: true` to the step you wish to capture.

If you would like to skip slide capturing for the entire demo, add `skipSlideCapture: true` to the root of the demo flow definition.

After you run the tests and the markdown file is created, if you would like to create an actual Google Slide deck, you must:

1. Upload the slides to heroku-dev (eg, commit and then push: `git push heroku your-branch:master`)
2. `md2gslides slides/[product].[brand].md` (eg: `m32gslides slides/dmp.bbva.md`)

A new slide deck will be generated and you will be given the URL which you can share with whomever you would like.

### Full Page Visual Regression Testing

When the tests run they capture a full page screenshots of each step of the demo and compare them with previous full-screen captures for discrepencies. If there are changes, the tests will fail. If you changed things, and therefore desired the changes, you can at this point confirm that the changes you desired are indeed the ones that occurred. If so, update the tests (see [Running the Tests](#running-the-tests)).

If you want to skip testing a step, add `skipTestCapture: true` to the step you wish to skip.

### Running the Tests
You "press play" by:
`npm run test`

You update tests by:
`npm run test:update`

This is where the metaphore breaks down slightly. You can tell it to put a different DVD in and play that regardless of which product/brand is being served by the server by:
`npm run test test/test-runner.test.js [product]_[brand]`

So, if the server is currently serving `dmp` and `bbva`, you can test `dmp` product `crocs` brand by:
`npm run test test/test-runner.test.js dmp_crocs`


The test-drive takes screenshots of each step in the flow for reference and comparison, as well as generating a Google Slide Doc of the entire demo.

## Example Test Flow Definition

```
	const env = process.env.ENV || 'local';
	const settings = require('../../config/config.js')();
	const testhost = settings[env].host;

	module.exports = {
		id: 'dmp_bbva',
		name: 'dmp.bbva',
		description: 'DMP Demo Flow',
		headless: false,
		resolution: { width: 1280, height: 720 },
		debug: true,
		imageSnapshotPath: './test/screenshots/dmp_bbva/',
		imageSnapshotPathProvided: true,
		mismatchThreshold: 0.001,
		skipSlideCapture: false,
		skipTestCapture: false,
		steps: [
			// OVERVIEW PAGE - SLIDE 43
			{
				goto: testhost,
				waitFor: 'body',
				name: '0001.overview'
			},
			// SCROLL DOWN
			{
				evaluate: () => {
					window.scrollBy(0, window.innerHeight);
				},
				waitFor: 2000,
				name: '0002.overview',
				skipTestCapture: true
			},
			// DATA CAPTURE SOURCES PAGE - SLIDE 44
			{
				click: '#view-all-data-capture-sources',
				waitFor: 'body',
				name: '0100.data-capture-sources',
				skipSlideCapture: true
			},
			// WAIT FOR GRAPH ANIMATIONS TO FINISH
			{
				waitFor: 2000,
				name: '0101.data-capture-sources'
			},
			// GOTO CONSUMER RIGHTS MANAGEMENT PAGE - SLIDE 45
			{
				click: '#content a',
				waitFor: 'body',
				name: '0200.consumer-rights-management-page',
				skipSlideCapture: true
			},
			// WAIT FOR GRAPH ANIMATIONS TO FINISH
			{
				waitFor: 2000,
				name: '0201.consumer-rights-management-page'
			},

		]
	};
```


## Technical Info

Visual testing is done through Mocha/Chai/Differencify.

Differencify's API matches [Puppeteer's](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) exactly. Reference that when writing interactivity for tests.

Demuxe uses a fork of Differencify that allows us some more flexibility than what currently exists in the base differencify repository. If someone wants to go through the pain of figuring out Docker and guiding the open PRs through the process (etc etc) to get these changes merged into the base repository, go for it.
