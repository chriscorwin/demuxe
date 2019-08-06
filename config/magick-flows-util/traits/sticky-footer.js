const path = require('path');
const sizeOf = require('image-size');

const stickyFooter = {
	id: 'sticky-footer',
	isRequiredBy: (fileName) => fileName.match(stickyFooter.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(stickyFooter.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"stickyFooterPathToAssetFile": pathToAssetFile,
			"stickyFooterHeight": dimensions.height,
			"stickyFooterWidth": dimensions.width,
			"stickyFooterStepsIndex": stepInfo.fileIndex,
			"stickyFooterAssetFileIndex": assetFileIndex,
			"stickyFooterFileName": assetFileName,
			"stickyFooterFileName": assetFileName,
			"stickyFooterFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['hasStickyFooter'] = true;
		traitsData.stepDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['stickyFooterHeight'] = dimensions.height;
		traitsData.stepDataAttributes['stickyFooterWidth'] = dimensions.width;
		traitsData.stepDataAttributes['stickyFooterStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['stickyFooterFileName'] = assetFileName;
		traitsData.stepDataAttributes['stickyFooterFileName'] = assetFileName;
		traitsData.stepDataAttributes['stickyFooterFilePath'] = pathToAssetFile;

		return traitsData;
	}
};

module.exports = stickyFooter;