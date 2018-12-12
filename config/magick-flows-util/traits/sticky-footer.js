const path = require('path');
const sizeOf = require('image-size');

const stickyFooter = {
	id: 'sticky-footer',
	isRequiredBy: (fileName) => fileName.match(stickyFooter.id),
	addTraitData: (foundData, screenInfo, assetFileName, assetFileIndex) => {
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
		foundData.assetsMetaData.push(dataToTrack);
		foundData.screenDataAttributes['hasStickyFooter'] = true;
		foundData.screenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
		foundData.screenDataAttributes['stickyFooterHeight'] = dimensions.height;
		foundData.screenDataAttributes['stickyFooterWidth'] = dimensions.width;
		foundData.screenDataAttributes['stickyFooterScreensIndex'] = screenInfo.fileIndex;
		foundData.screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
		foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		foundData.screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;

		return foundData;
	}
};

module.exports = stickyFooter;