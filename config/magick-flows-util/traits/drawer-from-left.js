const path = require('path');
const sizeOf = require('image-size');

const drawerFromLeft = {
	id: 'drawer-from-left',
	isRequiredBy: (fileName) => fileName.match(drawerFromLeft.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromLeft.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromLeftPathToAssetFile": pathToAssetFile,
			"drawerFromLeftHeight": dimensions.height,
			"drawerFromLeftWidth": dimensions.width,
			"drawerFromLeftScreensIndex": screenInfo.fileIndex,
			"drawerFromLeftAssetFileIndex": assetFileIndex,
			"drawerFromLeftFileName": assetFileName,
			"drawerFromLeftFileName": assetFileName,
			"drawerFromLeftFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['showDrawerFromLeft'] = true;
		traitsData.screenDataAttributes['drawerFromLeftPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['drawerFromLeftHeight'] = dimensions.height;
		traitsData.screenDataAttributes['drawerFromLeftWidth'] = dimensions.width;
		traitsData.screenDataAttributes['drawerFromLeftScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['drawerFromLeftAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['drawerFromLeftFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromLeftFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromLeftFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromLeft;