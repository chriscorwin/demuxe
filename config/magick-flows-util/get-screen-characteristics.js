const path = require('path');
const sizeOf = require('image-size');

// const { hasStickyHeader, hasStickyFooter } = require('./characteristics/index.js');

const hasStickyHeader = (foundData, screenInfo, assetFileName, assetFileIndex) => {
	if ( assetFileName.match('sticky-header') ) {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		let dataToTrack = [];
		const dimensions = sizeOf(pathToAssetFile);
		dataToTrack = {
			"stickyHeaderPathToAssetFile": pathToAssetFile,
			"stickyHeaderHeight": dimensions.height,
			"stickyHeaderWidth": dimensions.width,
			"stickyHeaderScreensIndex": screenInfo.fileIndex,
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
		foundData.screenDataAttributes['stickyHeaderScreensIndex'] = screenInfo.fileIndex;
		foundData.screenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
		foundData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;
	}

	return foundData;
}

const hasStickyFooter = (foundData, screenInfo, assetFileName, assetFileIndex) => {
	if ( assetFileName.match('sticky-footer') ) {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		let dataToTrack = [];
		const dimensions = sizeOf(pathToAssetFile);
		dataToTrack = {
			"stickyFooterPathToAssetFile": pathToAssetFile,
			"stickyFooterHeight": dimensions.height,
			"stickyFooterWidth": dimensions.width,
			"stickyFooterScreensIndex": screenInfo.fileIndex,
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
		foundData.screenDataAttributes['stickyFooterScreensIndex'] = screenInfo.fileIndex;
		foundData.screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
		foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;
	}

	return foundData;
}

const getScreenCharacteristics = (screenInfo) => {
	let foundData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	const targetStates = 'sticky-header|sticky-footer';
	if ( !screenInfo.fileName.match(targetStates) ) return foundData;

	screenInfo.assetFiles.forEach((assetFileName, assetFileIndex) => {
		// only grab screenInfo.assetFiles for the screen we are on
		if ( !assetFileName.match(screenInfo.screenId) ) return foundData;

		foundData = hasStickyHeader(foundData, screenInfo, assetFileName, assetFileIndex);
		foundData = hasStickyFooter(foundData, screenInfo, assetFileName, assetFileIndex);
	});

	return foundData;
}

module.exports = getScreenCharacteristics;