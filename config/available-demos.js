console.group(`
============================================================
Demuxe: Running \`config/available-demos.js\` now...
------------------------------------------------------------
`);

const addAvailableDemoAppConfigs = (configData) => {
	// Gather config data for all available demos.
	const demosConfigPath = require("path").join(__dirname, "demos");
	let availableDemoConfigs = [];

	require("fs").readdirSync(demosConfigPath).forEach(function(file) {
		const config = require(`./demos/${file}`);

		const screenshotsPath = require("path").join(__dirname, "../slides/screenshots");
		const screenshotMatch = `${config.productTemplate}.${config.demoVenue}.${config.brandTheme}`;
		config.availableScreenshots = require("fs").readdirSync(screenshotsPath).filter((file) => file.match(screenshotMatch));

		try{
			config.demoFlow = require(`../test/demo-flows/${config.productTemplate}_${config.demoVenue}_${config.brandTheme}`);
		} catch(err){
			config.demoFlow = [];
		}

		availableDemoConfigs.push(config);
	});

	configData.availableDemoConfigs = availableDemoConfigs;

	return configData;
}

module.exports = addAvailableDemoAppConfigs;

console.log(`...end: \`config/available-demos.js\`
------------------------------------------------------------`);
console.groupEnd();