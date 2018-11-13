Think of tests as DVDs.

`/test/test-runner.test.js` is a DVD player. You almost certainly should open up and modify your DVD player.

Your DVD shelf is `/test/demo-flows/`

DVDs are named `${product}_${brand}.js`. eg: The dvd for the DMP product branded with the BBVA brand would be named `dmp_bbva.js`, its final path would be: `/test/demo-flows/dmp_bbva.js`

You put a DVD into the DVD player with `/config/config.json`. The DVD player will go look in that file to see which Product/Brand combination is currently being served by the server, and test that flow. The variables it will look at are `productTemplate` and `brandTheme`.

You "press play" by:
`npm run test`

You update tests by:
`npm run test:update`

This is where the metaphore breaks down slightly. You can tell it to put a different DVD in and play that regardless of which product/brand is being served by the server by:
`npm run test test/test-runner.test.js [product]_[brand]`

So, if the server is currently serving `dmp` and `bbva`, you can test `dmp` product `crocs` brand by:
`npm run test test/test-runner.test.js dmp_crocs`