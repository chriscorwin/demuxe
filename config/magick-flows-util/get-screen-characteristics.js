const path = require('path');
const sizeOf = require('image-size');

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

module.exports = getScreenCharacteristics;