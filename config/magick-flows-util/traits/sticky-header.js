const path = require('path');
const sizeOf = require('image-size');

const stickyHeader = {
	id: 'sticky-header',
	isRequiredBy: (fileName) => fileName.match(stickyHeader.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(stickyHeader.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"stickyHeaderPathToAssetFile": pathToAssetFile,
			"stickyHeaderHeight": dimensions.height,
			"stickyHeaderWidth": dimensions.width,
			"stickyHeaderScreensIndex": screenInfo.fileIndex,
			"stickyHeaderAssetFileIndex": assetFileIndex,
			"stickyHeaderFileName": assetFileName,
			"stickyHeaderFileName": assetFileName,
			"stickyHeaderFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['hasStickyHeader'] = true;
		traitsData.screenDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['stickyHeaderHeight'] = dimensions.height;
		traitsData.screenDataAttributes['stickyHeaderWidth'] = dimensions.width;
		traitsData.screenDataAttributes['stickyHeaderScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		traitsData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		traitsData.screenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = stickyHeader;