const path = require('path');
const sizeOf = require('image-size');

const drawerFromRight = {
	id: 'drawer-from-right',
	isRequiredBy: (fileName) => fileName.match(drawerFromRight.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromRight.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromRightPathToAssetFile": pathToAssetFile,
			"drawerFromRightHeight": dimensions.height,
			"drawerFromRightWidth": dimensions.width,
			"drawerFromRightStepsIndex": stepInfo.fileIndex,
			"drawerFromRightAssetFileIndex": assetFileIndex,
			"drawerFromRightFileName": assetFileName,
			"drawerFromRightFileName": assetFileName,
			"drawerFromRightFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['showDrawerFromRight'] = true;
		traitsData.stepDataAttributes['drawerFromRightPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['drawerFromRightHeight'] = dimensions.height;
		traitsData.stepDataAttributes['drawerFromRightWidth'] = dimensions.width;
		traitsData.stepDataAttributes['drawerFromRightStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['drawerFromRightAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['drawerFromRightFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromRightFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromRightFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromRight;