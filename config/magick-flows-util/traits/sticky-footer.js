const path = require('path');
const sizeOf = require('image-size');

const stickyFooter = {
	id: 'sticky-footer',
	isRequiredBy: (fileName) => fileName.match(stickyFooter.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(stickyFooter.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"stickyFooterPathToAssetFile": pathToAssetFile,
			"stickyFooterHeight": dimensions.height,
			"stickyFooterWidth": dimensions.width,
			"stickyFooterScreensIndex": screenInfo.fileIndex,
			"stickyFooterAssetFileIndex": assetFileIndex,
			"stickyFooterFileName": assetFileName,
			"stickyFooterFileName": assetFileName,
			"stickyFooterFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['hasStickyFooter'] = true;
		traitsData.screenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['stickyFooterHeight'] = dimensions.height;
		traitsData.screenDataAttributes['stickyFooterWidth'] = dimensions.width;
		traitsData.screenDataAttributes['stickyFooterScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		traitsData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		traitsData.screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;

		return traitsData;
	}
};

module.exports = stickyFooter;