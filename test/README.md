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


## Technical Info

Visual testing is done through Mocha/Chai/Differencify.

Differencify's API matches [Puppeteer's](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md) exactly. Reference that when writing interactivity for tests.

Demuxe uses a fork of Differencify that allows us some more flexibility than what currently exists in the base differencify repository. If someone wants to go through the pain of figuring out Docker and guiding the open PRs through the process (etc etc) to get these changes merged into the base repository, go for it.
