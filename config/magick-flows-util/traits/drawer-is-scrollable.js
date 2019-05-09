const path = require('path');
const sizeOf = require('image-size');

const drawerFromBottom = {
	id: 'drawer-from-bottom',
	isRequiredBy: (fileName) => fileName.match(drawerFromBottom.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromBottom.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromBottomPathToAssetFile": pathToAssetFile,
			"drawerFromBottomHeight": dimensions.height,
			"drawerFromBottomWidth": dimensions.width,
			"drawerFromBottomStepsIndex": stepInfo.fileIndex,
			"drawerFromBottomAssetFileIndex": assetFileIndex,
			"drawerFromBottomFileName": assetFileName,
			"drawerFromBottomFileName": assetFileName,
			"drawerFromBottomFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['showDrawerFromBottom'] = true;
		traitsData.stepDataAttributes['drawerFromBottomPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['drawerFromBottomHeight'] = dimensions.height;
		traitsData.stepDataAttributes['drawerFromBottomWidth'] = dimensions.width;
		traitsData.stepDataAttributes['drawerFromBottomStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['drawerFromBottomAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['drawerFromBottomFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromBottomFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromBottomFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromBottom;