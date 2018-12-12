console.group(`
============================================================
Demuxe: Running \`config/config-magick-flows.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const fs = require('fs');
const getFlowData = require('./magick-flows-util/get-flow-data.js');
const sortAlphaNum = require('./magick-flows-util/sort-alpha-num.js');

if (process.env.DEBUG === "true") {
	console.debug = console.log;
}

// Creates config data objects for the magick flows based on provided directory.
const addMagickFlowsToConfig = (configData, dir = path.join(__dirname, '../'), recursionMax = 1000, retryCount = 0) => {
	console.debug(`looking in ${dir}`);

	configData.magickFlowDirectories = configData.magickFlowDirectories || []; // protects against them passing `null`

	const directoryContents = fs.readdirSync(dir);
	directoryContents.forEach(fileOrDirectory => {
		console.debug('considering: ', fileOrDirectory);
		const fileOrDirectoryPath = path.join(dir, fileOrDirectory);

		// We only care about directories.
		if (!fs.statSync(fileOrDirectoryPath).isDirectory()) {
			console.debug(`ignoring ${fileOrDirectoryPath}; it is not a directory.`)

			return;
		}

		// Make sure this is the directory we actually want
		if (fileOrDirectory !== configData.magickFlows.directoryName) {
			console.debug(`ignoring ${fileOrDirectory}; ${fileOrDirectory} !== ${configData.magickFlows.directoryName}`)

			if (retryCount > recursionMax) {
				console.error(`Arbitrary ${recursionMax + 1} retry maximum achieved! Congratulations, you have broken the app.`);
			} else {
				// This was not the directory we were looking for, look again...
				addMagickFlowsToConfig(configData, fileOrDirectoryPath, recursionMax, retryCount++);
			}

			return;
		}

		console.debug(`target directory found! (${fileOrDirectory})`);

		const subDirectoryContents = fs.readdirSync(fileOrDirectoryPath);
		
		subDirectoryContents.forEach(subFileOrDirectory => {
			configData = getFlowData(configData, fileOrDirectoryPath, subFileOrDirectory)
		});
	});

	const magickFlowURLS = configData.magickFlowDirectories
		.sort(sortAlphaNum)
		.map(magickFlowPath => 
			`${configData[process.env.NODE_ENV].host}${magickFlowPath.split('/')[magickFlowPath.split('/').length - 1]}`
		);

	configData.magickFlowURLS = magickFlowURLS;

	return configData;
};

module.exports = addMagickFlowsToConfig;

console.log(`...end: \`config/config-magick-flows.js\`
------------------------------------------------------------`);
console.groupEnd();
