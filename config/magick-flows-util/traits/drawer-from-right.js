const path = require('path');
const sizeOf = require('image-size');

const drawerFromRight = {
	id: 'drawer-from-right',
	isRequiredBy: (fileName) => fileName.match(drawerFromRight.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromRight.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromRightPathToAssetFile": pathToAssetFile,
			"drawerFromRightHeight": dimensions.height,
			"drawerFromRightWidth": dimensions.width,
			"drawerFromRightScreensIndex": screenInfo.fileIndex,
			"drawerFromRightAssetFileIndex": assetFileIndex,
			"drawerFromRightFileName": assetFileName,
			"drawerFromRightFileName": assetFileName,
			"drawerFromRightFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['showDrawerFromRight'] = true;
		traitsData.screenDataAttributes['drawerFromRightPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['drawerFromRightHeight'] = dimensions.height;
		traitsData.screenDataAttributes['drawerFromRightWidth'] = dimensions.width;
		traitsData.screenDataAttributes['drawerFromRightScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['drawerFromRightAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['drawerFromRightFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromRightFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromRightFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromRight;