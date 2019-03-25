const path = require('path');
const sizeOf = require('image-size');

const clickHints = {
	id: 'click-hints',
	isRequiredBy: (fileName) => fileName.match(clickHints.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(clickHints.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"clickHintsPathToAssetFile": pathToAssetFile,
			"clickHintsHeight": dimensions.height,
			"clickHintsWidth": dimensions.width,
			"clickHintsScreensIndex": screenInfo.fileIndex,
			"clickHintsAssetFileIndex": assetFileIndex,
			"clickHintsFileName": assetFileName,
			"clickHintsFileName": assetFileName,
			"clickHintsFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['hasClickHints'] = true;
		traitsData.screenDataAttributes['clickHintsPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['clickHintsHeight'] = dimensions.height;
		traitsData.screenDataAttributes['clickHintsWidth'] = dimensions.width;
		traitsData.screenDataAttributes['clickHintsScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['clickHintsAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['clickHintsFileName'] = assetFileName;
		traitsData.screenDataAttributes['clickHintsFileName'] = assetFileName;
		traitsData.screenDataAttributes['clickHintsFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = clickHints;