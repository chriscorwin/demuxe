const path = require('path');
const sizeOf = require('image-size');

const ownHeader = {
	id: 'own-header',
	isRequiredBy: () => false,
	isAssetForTrait: (assetFileName) => assetFileName.match(ownHeader.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"ownHeaderPathToAssetFile": pathToAssetFile,
			"ownHeaderHeight": dimensions.height,
			"ownHeaderWidth": dimensions.width,
			"ownHeaderStepsIndex": stepInfo.fileIndex,
			"ownHeaderAssetFileIndex": assetFileIndex,
			"ownHeaderFileName": assetFileName,
			"ownHeaderFileName": assetFileName,
			"ownHeaderFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['hasStickyHeader'] = true;
		traitsData.stepDataAttributes['ownHeaderPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['ownHeaderHeight'] = dimensions.height;
		traitsData.stepDataAttributes['ownHeaderWidth'] = dimensions.width;
		traitsData.stepDataAttributes['ownHeaderStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['ownHeaderAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['ownHeaderFileName'] = assetFileName;
		traitsData.stepDataAttributes['ownHeaderFileName'] = assetFileName;
		traitsData.stepDataAttributes['ownHeaderFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = ownHeader;