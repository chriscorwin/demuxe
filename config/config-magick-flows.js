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

// This gets files -- used to get the lists of screens for each magick flow.
const getFiles = (dir, files_) => {
	files_ = files_ || [];
	const files = fs.readdirSync(dir);
	for (const file in files) {
		const fullPath = dir + '/' + files[file];
		const name = files[file];
		if (fs.statSync(fullPath).isDirectory()) {
			// If we end up allowing "packages" as a Magick Flow step, here is where the code needs to be aware of it.
			getFiles(fullPath, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
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

const getPermutations = (assetFiles, screenId, fileName, fileIndex, fullAssetsPath) => {
	const foundData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	const targetStates = 'sticky-header|sticky-footer';
	if ( !fileName.match(targetStates) ) return foundData;

	assetFiles.forEach((assetFileName, assetFileIndex) => {
		// only grab assetFiles for the screen we are on
		if ( !assetFileName.match(screenId) ) return foundData;

		if ( assetFileName.match('sticky-header') ) {
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
			foundData.assetsMetaData.push(dataToTrack);
			foundData.screenDataAttributes['hasStickyHeader'] = true;
			foundData.screenDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
			foundData.screenDataAttributes['stickyHeaderHeight'] = dimensions.height;
			foundData.screenDataAttributes['stickyHeaderWidth'] = dimensions.width;
			foundData.screenDataAttributes['stickyHeaderScreensIndex'] = fileIndex;
			foundData.screenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
			foundData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
			foundData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
			foundData.screenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;
		}

		if ( assetFileName.match('sticky-footer') ) {
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
			foundData.assetsMetaData.push(dataToTrack);
			foundData.screenDataAttributes['hasStickyFooter'] = true;
			foundData.screenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
			foundData.screenDataAttributes['stickyFooterHeight'] = dimensions.height;
			foundData.screenDataAttributes['stickyFooterWidth'] = dimensions.width;
			foundData.screenDataAttributes['stickyFooterScreensIndex'] = fileIndex;
			foundData.screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
			foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
			foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
			foundData.screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;
		}
	});

	return foundData;
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
		// SOMETHING BROKE HERE ILLUSIONS DEMO DOESN'T WORK ANYMORE
		// Maybe canging this from for in -> forEach did it?
		filesAndDirectories.forEach(fileOrDirectoryName => {
			const fileOrDirectoryFullPath = path.join(dir, fileOrDirectoryName);

			if (fs.statSync(fileOrDirectoryFullPath).isDirectory()) {
				if (fileOrDirectoryName === configData.magickFlows.directoryName) {
					const subFilesAndDirectories = fs.readdirSync(fileOrDirectoryFullPath);
					
					for (const j in subFilesAndDirectories) {
						if (fs.statSync(path.join(fileOrDirectoryFullPath, subFilesAndDirectories[j])).isDirectory()) {
							const fullContentPath = path.join(fileOrDirectoryFullPath, subFilesAndDirectories[j], 'main');
							const fullAssetsPath = path.join(fileOrDirectoryFullPath, subFilesAndDirectories[j], 'assets');

							const metaData = {
								assets: [],
								metaData: {},
								metaData2: [],
								name: subFilesAndDirectories[j],
								path: path.join(fileOrDirectoryFullPath, subFilesAndDirectories[j]),
								urlSlug: subFilesAndDirectories[j],
								screens: []
							};

							try {
								metaData.screens = getFiles(fullContentPath).sort(magickFlowsConfig.sortAlphaNum);
								metaData.numberOfScreens = metaData.screens.length;
							} catch(error) {
								noFileError(error, metaData.name, fullContentPath);
							}

							try {
								metaData.assets = getFiles(fullAssetsPath).sort(magickFlowsConfig.sortAlphaNum);
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

								if ( typeof screenDataAttributes.data !== 'undefined' ) {
									const foundData = getPermutations(metaData.assets, screenDataAttributes.ID, fileName, fileIndex, fullAssetsPath);
									metaData.assetsMetaData = foundData.assetsMetaData;
									Object.assign(screenDataAttributes, foundData.screenDataAttributes);
								}
	
								metaData.metaData2.push(screenDataAttributes);
							});

							configData.magickFlows[subFilesAndDirectories[j]] = metaData;

							directories_.push(path.join(fileOrDirectoryFullPath, subFilesAndDirectories[j]));
						}
					}
				} else {
					magickFlowsConfig.getMagickFlowDirectories(fileOrDirectoryFullPath, directories_, configData);
				}
			}
		});

		return directories_;
	}
}

module.exports = magickFlowsConfig;

console.log(`...end: \`config/config-magick-flows.js\`
------------------------------------------------------------`);
console.groupEnd();
