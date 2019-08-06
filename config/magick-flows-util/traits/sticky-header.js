const path = require('path');
const sizeOf = require('image-size');

const stickyHeader = {
	id: 'sticky-header',
	isRequiredBy: (fileName) => fileName.match(stickyHeader.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(stickyHeader.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"stickyHeaderPathToAssetFile": pathToAssetFile,
			"stickyHeaderHeight": dimensions.height,
			"stickyHeaderWidth": dimensions.width,
			"stickyHeaderStepsIndex": stepInfo.fileIndex,
			"stickyHeaderAssetFileIndex": assetFileIndex,
			"stickyHeaderFileName": assetFileName,
			"stickyHeaderFileName": assetFileName,
			"stickyHeaderFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['hasStickyHeader'] = true;
		traitsData.stepDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['stickyHeaderHeight'] = dimensions.height;
		traitsData.stepDataAttributes['stickyHeaderWidth'] = dimensions.width;
		traitsData.stepDataAttributes['stickyHeaderStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['stickyHeaderFileName'] = assetFileName;
		traitsData.stepDataAttributes['stickyHeaderFileName'] = assetFileName;
		traitsData.stepDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = stickyHeader;