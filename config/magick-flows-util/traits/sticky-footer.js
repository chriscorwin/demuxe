const path = require('path');
const sizeOf = require('image-size');

const stickyFooter = {
	id: 'sticky-footer',
	isRequiredBy: (fileName) => fileName.match(stickyFooter.id),
	addTraitData: (assetsData, screenInfo, assetFileName, assetFileIndex) => {
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
		assetsData.assetsMetaData.push(dataToTrack);
		assetsData.screenDataAttributes['hasStickyFooter'] = true;
		assetsData.screenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
		assetsData.screenDataAttributes['stickyFooterHeight'] = dimensions.height;
		assetsData.screenDataAttributes['stickyFooterWidth'] = dimensions.width;
		assetsData.screenDataAttributes['stickyFooterScreensIndex'] = screenInfo.fileIndex;
		assetsData.screenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
		assetsData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		assetsData.screenDataAttributes['stickyFooterFileName'] = assetFileName;
		assetsData.screenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;

		return assetsData;
	}
};

module.exports = stickyFooter;