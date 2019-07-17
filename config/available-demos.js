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
		availableDemoConfigs.push(config);
	});

	configData.availableDemoConfigs = availableDemoConfigs;

	return configData;
}

module.exports = addAvailableDemoAppConfigs;

console.log(`...end: \`config/available-demos.js\`
------------------------------------------------------------`);
console.groupEnd();