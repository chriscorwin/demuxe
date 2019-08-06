const path = require('path');
const sizeOf = require('image-size');

const drawerFromLeft = {
	id: 'drawer-from-left',
	isRequiredBy: (fileName) => fileName.match(drawerFromLeft.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromLeft.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromLeftPathToAssetFile": pathToAssetFile,
			"drawerFromLeftHeight": dimensions.height,
			"drawerFromLeftWidth": dimensions.width,
			"drawerFromLeftStepsIndex": stepInfo.fileIndex,
			"drawerFromLeftAssetFileIndex": assetFileIndex,
			"drawerFromLeftFileName": assetFileName,
			"drawerFromLeftFileName": assetFileName,
			"drawerFromLeftFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['showDrawerFromLeft'] = true;
		traitsData.stepDataAttributes['drawerFromLeftPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['drawerFromLeftHeight'] = dimensions.height;
		traitsData.stepDataAttributes['drawerFromLeftWidth'] = dimensions.width;
		traitsData.stepDataAttributes['drawerFromLeftStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['drawerFromLeftAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['drawerFromLeftFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromLeftFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromLeftFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromLeft;