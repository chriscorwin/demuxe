const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');
const sortAlphaNum = require('./sort-alpha-num.js');

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

const getDataFromFilename = (fileName) => {
	const foundAttributes = [];
	const splitFileName = fileName.split('___');

	splitFileName.forEach((node) => {
		// other nodes have a KEY= at the beginning, with arbitrary data provided
		if ( node.includes('=') === true ) {
			// we have some data, split on the equals sign to get keys and values
			const [ rawKey, valueWithExt ] = node.split('=');
			const value = valueWithExt.split('.')[0];
			const key = rawKey.toLowerCase();

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

const getScreenCharacteristics = (assetFiles, screenId, fileName, fileIndex, fullAssetsPath) => {
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

const getScreenData = (flowData, fileName, fileIndex) => {
	const screenDataAttributes = getDataFromFilename(fileName);
	screenDataAttributes.fileName = fileName;
	screenDataAttributes.screensIndex = fileIndex;

	if ( fileName.endsWith('.ejs') === true ) {
		screenDataAttributes.dimensions = {type: 'ejs'};
	} else {
		const pathToFile = path.join(flowData.fullContentPath, fileName);
		screenDataAttributes.dimensions = sizeOf(pathToFile);
	}

	const fileExtension = fileName.split('.')[fileName.split('.').length - 1];
	screenDataAttributes.fileExtension = fileExtension;

	if ( typeof screenDataAttributes.data !== 'undefined' ) {
		const foundCharacteristics = getScreenCharacteristics(flowData.assets, screenDataAttributes.ID, fileName, fileIndex, flowData.fullAssetsPath);
		flowData.assetsMetaData = foundCharacteristics.assetsMetaData;
		Object.assign(screenDataAttributes, foundCharacteristics.screenDataAttributes);
	}

	flowData.metaData.push(screenDataAttributes);
};

const getFlowData = (configData, fileOrDirectoryPath, subFileOrDirectory) => {
	if(!fs.statSync(path.join(fileOrDirectoryPath, subFileOrDirectory)).isDirectory()) {
		return configData;
	}

	const flowData = {
		assets: [],
		metaData: [],
		name: subFileOrDirectory,
		path: path.join(fileOrDirectoryPath, subFileOrDirectory),
		fullContentPath: path.join(fileOrDirectoryPath, subFileOrDirectory, 'main'),
		fullAssetsPath: path.join(fileOrDirectoryPath, subFileOrDirectory, 'assets'),
		urlSlug: subFileOrDirectory,
		screens: []
	};

	try {
		flowData.screens = getFiles(flowData.fullContentPath).sort(sortAlphaNum);
		flowData.numberOfScreens = flowData.screens.length;
	} catch(error) {
		noFileError(error, flowData.name, flowData.fullContentPath);
	}

	try {
		flowData.assets = getFiles(flowData.fullAssetsPath).sort(sortAlphaNum);
	} catch(error) {
		noAssetsError(error, flowData.name, flowData.fullAssetsPath);
	}

	flowData.screens.forEach((fileName, fileIndex) => {
		getScreenData(flowData, fileName, fileIndex);
	});

	configData.magickFlows[subFileOrDirectory] = flowData;
	configData.magickFlows.urlSlugs.push(flowData.urlSlug);
	configData.magickFlows.urlSlugsMapToFlowDirectories[flowData.urlSlug] = flowData.name;
	configData.magickFlowDirectories.push(path.join(fileOrDirectoryPath, subFileOrDirectory));

	return configData;
}

module.exports = getFlowData;
