const path = require('path');
const sizeOf = require('image-size');

const drawerFromTop = {
	id: 'drawer-from-top',
	isRequiredBy: (fileName) => fileName.match(drawerFromTop.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(drawerFromTop.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"drawerFromTopPathToAssetFile": pathToAssetFile,
			"drawerFromTopHeight": dimensions.height,
			"drawerFromTopWidth": dimensions.width,
			"drawerFromTopStepsIndex": stepInfo.fileIndex,
			"drawerFromTopAssetFileIndex": assetFileIndex,
			"drawerFromTopFileName": assetFileName,
			"drawerFromTopFileName": assetFileName,
			"drawerFromTopFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['showDrawerFromTop'] = true;
		traitsData.stepDataAttributes['drawerFromTopPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['drawerFromTopHeight'] = dimensions.height;
		traitsData.stepDataAttributes['drawerFromTopWidth'] = dimensions.width;
		traitsData.stepDataAttributes['drawerFromTopStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['drawerFromTopAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['drawerFromTopFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromTopFileName'] = assetFileName;
		traitsData.stepDataAttributes['drawerFromTopFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = drawerFromTop;