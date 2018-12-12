const path = require('path');
const sizeOf = require('image-size');

const stickyHeader = {
	id: 'sticky-header',
	isRequiredBy: (fileName) => fileName.match(stickyHeader.id),
	addTraitData: (foundData, screenInfo, assetFileName, assetFileIndex) => {
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

		return foundData;
	}
}

module.exports = stickyHeader;