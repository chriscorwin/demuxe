const path = require('path');
const sizeOf = require('image-size');

const stickyHeader = {
	id: 'sticky-header',
	isRequiredBy: (fileName) => fileName.match(stickyHeader.id),
	addTraitData: (assetsData, screenInfo, assetFileName, assetFileIndex) => {
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
		assetsData.assetsMetaData.push(dataToTrack);
		assetsData.screenDataAttributes['hasStickyHeader'] = true;
		assetsData.screenDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
		assetsData.screenDataAttributes['stickyHeaderHeight'] = dimensions.height;
		assetsData.screenDataAttributes['stickyHeaderWidth'] = dimensions.width;
		assetsData.screenDataAttributes['stickyHeaderScreensIndex'] = screenInfo.fileIndex;
		assetsData.screenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
		assetsData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		assetsData.screenDataAttributes['stickyHeaderFileName'] = assetFileName;
		assetsData.screenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;

		return assetsData;
	}
}

module.exports = stickyHeader;