const path = require('path');
const sizeOf = require('image-size');

const drawerFromTop = {
	id: 'drawer-from-top',
	isRequiredBy: (fileName) => fileName.match(drawerFromTop.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromTop.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromTopPathToAssetFile": pathToAssetFile,
			"drawerFromTopHeight": dimensions.height,
			"drawerFromTopWidth": dimensions.width,
			"drawerFromTopScreensIndex": screenInfo.fileIndex,
			"drawerFromTopAssetFileIndex": assetFileIndex,
			"drawerFromTopFileName": assetFileName,
			"drawerFromTopFileName": assetFileName,
			"drawerFromTopFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['showDrawerFromTop'] = true;
		traitsData.screenDataAttributes['drawerFromTopPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['drawerFromTopHeight'] = dimensions.height;
		traitsData.screenDataAttributes['drawerFromTopWidth'] = dimensions.width;
		traitsData.screenDataAttributes['drawerFromTopScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['drawerFromTopAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['drawerFromTopFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromTopFileName'] = assetFileName;
		traitsData.screenDataAttributes['drawerFromTopFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromTop;