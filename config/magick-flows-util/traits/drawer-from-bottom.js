const path = require('path');
const sizeOf = require('image-size');

const drawerFromBottom = {
	id: 'drawer-from-bottom',
	isRequiredBy: (fileName) => fileName.match(drawerFromBottom.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromBottom.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromBottomPathToAssetFile": pathToAssetFile,
			"drawerFromBottomHeight": dimensions.height,
			"drawerFromBottomWidth": dimensions.width,
			"drawerFromBottomScreensIndex": screenInfo.fileIndex,
			"drawerFromBottomAssetFileIndex": assetFileIndex,
			"drawerFromBottomFileName": assetFileName,
			"drawerFromBottomFileName": assetFileName,
			"drawerFromBottomFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['showDrawerFromBottom'] = true;
		traitsData.screenDataAttributes['drawerFromBottomPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['drawerFromBottomHeight'] = dimensions.height;
		traitsData.screenDataAttributes['drawerFromBottomWidth'] = dimensions.width;
		traitsData.screenDataAttributes['drawerFromBottomScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['drawerFromBottomAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['drawerFromBottomFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromBottomFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromBottomFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromBottom;