console.group(`
============================================================
Demuxe: Running \`config/config-magick-flows.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const fs = require('fs');
const getFlowData = require('./magick-flows-util/get-flow-data.js');
const sortAlphaNum = require('./magick-flows-util/sort-alpha-num.js');

let foundAnythingAtAll = false;

// Creates config data objects for the magick flows based on provided directory.
const addMagickFlowsToConfig = (configData, dir = path.join(__dirname, '../your-code-here/'), recursionMax = 1000, retryCount = 0) => {
	console.log(`looking in ${dir}`);

	configData.magickFlowDirectories = configData.magickFlowDirectories || []; // protects against them passing `null`

	const directoryContents = fs.readdirSync(dir);
	directoryContents.forEach(fileOrDirectory => {
		console.log('searching in', fileOrDirectory);
		const fileOrDirectoryPath = path.join(dir, fileOrDirectory);

		// We only care about directories.
		if (!fs.statSync(fileOrDirectoryPath).isDirectory()) return;

		// Make sure this is the directory we actually want
		if (fileOrDirectory !== configData.magickFlows.directoryName) {
			console.log(`${fileOrDirectory} !== ${configData.magickFlows.directoryName} ${fileOrDirectory !== configData.magickFlows.directoryName}`)
			if (retryCount > recursionMax) {
				console.error(`Arbitrary ${recursionMax + 1} retry maximum achieved! Congratulations, you have broken the app.`);
			} else {
				// This was not the directory we were looking for, look again...
				addMagickFlowsToConfig(configData, fileOrDirectoryPath, recursionMax, retryCount++);
			}

			console.log('no, ignore this directory');

			return;
		}

		console.log('found something!');

		foundAnythingAtAll = true;

		const subDirectoryContents = fs.readdirSync(fileOrDirectoryPath);
		
		subDirectoryContents.forEach(subFileOrDirectory => {
			configData = getFlowData(configData, fileOrDirectoryPath, subFileOrDirectory)
		});
	});

	if (!foundAnythingAtAll) {
		console.warn(`WARNING: No magic flows were discovered`);
	}

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
