const path = require('path');
const sizeOf = require('image-size');

const clickHints = {
	id: 'click-hints',
	isRequiredBy: (fileName) => fileName.match(clickHints.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(clickHints.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"clickHintsPathToAssetFile": pathToAssetFile,
			"clickHintsHeight": dimensions.height,
			"clickHintsWidth": dimensions.width,
			"clickHintsStepsIndex": stepInfo.fileIndex,
			"clickHintsAssetFileIndex": assetFileIndex,
			"clickHintsFileName": assetFileName,
			"clickHintsFileName": assetFileName,
			"clickHintsFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['hasClickHints'] = true;
		traitsData.stepDataAttributes['clickHintsPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['clickHintsHeight'] = dimensions.height;
		traitsData.stepDataAttributes['clickHintsWidth'] = dimensions.width;
		traitsData.stepDataAttributes['clickHintsStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['clickHintsAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['clickHintsFileName'] = assetFileName;
		traitsData.stepDataAttributes['clickHintsFileName'] = assetFileName;
		traitsData.stepDataAttributes['clickHintsFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = clickHints;