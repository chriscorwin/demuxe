console.group(`
============================================================
Demuxe: Running \`config/config-magick-flows.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');

const noFileError = (error, name, fullContentPath) => {
	if ( error.message.includes('ENOENT: no such file or directory')) {
		console.error(`
[ ERROR IN: \`config/config-magick-flows.js:69\`]

Magick Flow URL Slug: \`${name}\`.

The app is attempting to render a Magick Flow at:

${fullContentPath}

...and did not find anything there.

THERE IS NO CONTENT FOR IT. 

This is not required to make the app work, so, take this for what its worth,
you seem to not be using the headers and footers feature.
		`);
	} else {
		console.warn(error);
	}
}

const noAssetsError = (error, name, fullAssetsPath) => {
	if ( error.message.includes('ENOENT: no such file or directory')) {
		console.warn(`
[ THERE ARE NO ASSETS FOR \`${name}\`]
The app is attempting to render a Magick Flow at:

${fullAssetsPath}

...and did not find anything there. This is not required to make the app
work, so, take this for what its worth, you seem to not be using the headers
and footers feature.
			`);
	} else {
		console.warn(error);
	}
}

const getParamValuesFromFilename = (fileName) => {
	const foundAttributes = [];
	const splitFileName = fileName.split('___');

	splitFileName.forEach((node) => {
		// other nodes have a KEY= at the beginning, with arbitrary data provided
		if ( node.includes('=') === true ) {
			// we have some data, split on the equals sign to get keys and values
			const [ rawKey, valueWithExt ] = node.split('=');
			const value = valueWithExt.split('.')[0];
			const key = rawKey.toLowerCase();

			let valueFinal = [];
			let valueSplit = [];
			if ( value.includes('__') === true ) {
				foundAttributes[key] = value.split('__').map(val => val.toLowerCase());
			} else {
				if (key === 'data' && typeof value === 'string') {
					// make sure the stupid thing is in an array
					foundAttributes[key] = [value];
				} else {
					foundAttributes[key] = value;
				}
			}
		} else {
			// first one is the sorter, store it as such
			foundAttributes['sorter'] = node;
		}
	});

	return foundAttributes;
}

const getPermutations = (metaData, screenDataAttributes, fileName) => {
	// exit conditions for speed
	if ( typeof screenDataAttributes.data === 'undefined' ) return;
	// no target states
	const targetStates = 'sticky-header|sticky-footer';
	if ( !fileName.match(targetStates) ) return;

	metaData.assets.forEach((assetFileName, assetFileIndex) => {
		// only grab assets for the screen we are on
		if ( !assetFileName.match(screenDataAttributes.ID) ) return;

		if ( assetFileName.match('sticky-header') !== null) {
			let pathToAssetFile = path.join(fullAssetsPath, assetFileName);
			let dataToTrack = [];
			const dimensions = sizeOf(pathToAssetFile);
			dataToTrack = {
				"stickyHeaderPathToAssetFile": pathToAssetFile,
				"stickyHeaderHeight": dimensions.height,
				"stickyHeaderWidth": dimensions.width,
				"stickyHeaderScreensIndex": fileIndex,
				"stickyHeaderAssetFileIndex": assetFileIndex,
				"stickyHeaderFileName": assetFileName,
				"stickyHeaderFileName": assetFileName,
				"stickyHeaderFilePath": pathToAssetFile,
			};
			metaData.assetsMetaData.push(dataToTrack);
			screenDataAttributes['hasStickyHeader'] = true;
			screenDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
			screenDataAttributes['stickyHeaderHeight'] = dimensions.height;
			screenDataAttributes['stickyHeaderWidth'] = dimensions.width;
			screenDataAttributes['stickyHeaderScreensIndex'] = fileIndex;
			screenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
			screenDataAttributes['stickyHeaderFileName'] = assetFileName;
			screenDataAttributes['stickyHeaderFileName'] = assetFileName;
			screenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;
		}

		if ( assetFileName.match('sticky-footer') !== null) {
			let pathToAssetFile = path.join(fullAssetsPath, assetFileName);
			let dataToTrack = [];
			const dimensions = sizeOf(pathToAssetFile);
			dataToTrack = {
				"stickyFooterPathToAssetFile": pathToAssetFile,
				"stickyFooterHeight": dimensions.height,
				"stickyFooterWidth": dimensions.width,
				"stickyFooterScreensIndex": fileIndex,
				"stickyFooterAssetFileIndex": assetFileIndex,
				"stickyFooterFileName": assetFileName,
				"stickyFooterFileName": assetFileName,
				"stickyFooterFilePath": pathToAssetFile,
			};
			metaData.assetsMetaData.push(dataToTrack);
			screenDataAttributes['hasStickyFooter'] = true;
			screenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
			screenDataAttributes['stickyFooterHeight'] = dimensions.height;
			screenDataAttributes['stickyFooterWidth'] = dimensions.width;
			screenDataAttributes['stickyFooterScreensIndex'] = fileIndex;
			screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
			screenDataAttributes['stickyFooterFileName'] = assetFileName;
			screenDataAttributes['stickyFooterFileName'] = assetFileName;
			screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;
		}
	});

	return { metaData, screenDataAttributes };
}

const magickFlowsConfig = {
	// Sorts an array alphanumerically, so that '10.svg' comes after '2.svg' in our lists of screens.
	sortAlphaNum: (a, b) => a.localeCompare(b, 'en', { numeric: true }),

	// Used in getting the url slug 
	readFirstLine: (pathToFile) => {
		let firstLine = '';
		fs.readFileSync(pathToFile).toString().split('\n').forEach((line, index, arr) => {
			if (index === arr.length - 1 && line === '') { return; }
			if (index === 0) {
				firstLine = line;
			}
		});
		return firstLine;
	},

	// Creates config data objects for the magick flows based on provided directory.
	getMagickFlowDirectories: (dir, directories_ = [], configData) => {
		directories_ = directories_ || []; // protects against them passing `null`
		
		const filesAndDirectories = fs.readdirSync(dir);
		for (const i in filesAndDirectories) {
			const aFileOrDirectoryFullPath = path.join(dir, filesAndDirectories[i]);
			const aFileOrDirectoryName = filesAndDirectories[i];

			if (fs.statSync(aFileOrDirectoryFullPath).isDirectory()) {
				if (aFileOrDirectoryName === configData.magickFlows.directoryName) {
					const subFilesAndDirectories = fs.readdirSync(aFileOrDirectoryFullPath);
					
					for (const j in subFilesAndDirectories) {
						if (fs.statSync(path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j])).isDirectory()) {
							const fullContentPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j], 'main');
							const fullAssetsPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j], 'assets');

							const metaData = {
								assets: [],
								assetsMetaData: [],
								metaData: {},
								metaData2: [],
								name: subFilesAndDirectories[j],
								path: path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]),
								urlSlug: subFilesAndDirectories[j],
								screens: []
							};

							try {
								metaData.screens = magickFlowsConfig.getFiles(fullContentPath).sort(magickFlowsConfig.sortAlphaNum);
								metaData.numberOfScreens = metaData.screens.length;
							} catch(error) {
								noFileError(error, metaData.name, fullContentPath);
							}

							try {
								metaData.assets = magickFlowsConfig.getFiles(fullAssetsPath).sort(magickFlowsConfig.sortAlphaNum);
							} catch(error) {
								noAssetsError(error, metaData.name, fullAssetsPath);
							}


							if (fs.existsSync(path.join(metaData.path, '../', metaData.name + '.json'))) {
								metaData.metaData = require(path.join(metaData.path, '../', metaData.name + '.json'));
							}

							configData.magickFlows.urlSlugs.push(metaData.urlSlug);
							configData.magickFlows.urlSlugsMapToFlowDirectories[metaData.urlSlug] = metaData.name;


							metaData.screens.forEach((fileName, fileIndex) => {
								const screenDataAttributes = getParamValuesFromFilename(fileName);
								screenDataAttributes.fileName = fileName;
								screenDataAttributes.screensIndex = fileIndex;

								if ( fileName.endsWith('.ejs') === true ) {
									screenDataAttributes.dimensions = {type: 'ejs'};
								} else {
									const pathToFile = path.join(fullContentPath, fileName);
									screenDataAttributes.dimensions = sizeOf(pathToFile);
								}

								const fileExtension = fileName.split('.')[fileName.split('.').length - 1];
								screenDataAttributes.fileExtension = fileExtension;

								const { metaData, screenDataAttributes } = getPermutations(metaData, screenDataAttributes, fileName);

								metaData.metaData2.push(screenDataAttributes);
							});

							configData.magickFlows[subFilesAndDirectories[j]] = metaData;

							directories_.push(path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]));
						}
					}
				} else {
					magickFlowsConfig.getMagickFlowDirectories(aFileOrDirectoryFullPath, directories_, configData);
				}
			}
		}
		return directories_;
	},


	// This gets files -- used to get the lists of screens for each magick flow.
	getFiles: (dir, files_) => {
		files_ = files_ || [];
		const files = fs.readdirSync(dir);
		for (const i in files) {
			const fullPath = dir + '/' + files[i];
			const name = files[i];
			if (fs.statSync(fullPath).isDirectory()) {
				// If we end up allowing "packages" as a Magick Flow step, here is where the code needs to be aware of it.
				magickFlowsConfig.getFiles(fullPath, files_);
			} else {
				files_.push(name);
			}
		}
		return files_;
	}


}

module.exports = magickFlowsConfig;

console.log(`...end: \`config/config-magick-flows.js\`
------------------------------------------------------------`);
console.groupEnd();
