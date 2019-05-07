const path = require('path');
const sizeOf = require('image-size');

const ownHeader = {
	id: 'own-header',
	isrequiredby: (fileName) => fileName.match(ownHeader.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(ownHeader.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"ownHeaderPathToAssetFile": pathToAssetFile,
			"ownHeaderHeight": dimensions.height,
			"ownHeaderWidth": dimensions.width,
			"ownHeaderScreensIndex": screenInfo.fileIndex,
			"ownHeaderAssetFileIndex": assetFileIndex,
			"ownHeaderFileName": assetFileName,
			"ownHeaderFileName": assetFileName,
			"ownHeaderFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['hasStickyHeader'] = true;
		traitsData.screenDataAttributes['ownHeaderPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['ownHeaderHeight'] = dimensions.height;
		traitsData.screenDataAttributes['ownHeaderWidth'] = dimensions.width;
		traitsData.screenDataAttributes['ownHeaderScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['ownHeaderAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['ownHeaderFileName'] = assetFileName;
		traitsData.screenDataAttributes['ownHeaderFileName'] = assetFileName;
		traitsData.screenDataAttributes['ownHeaderFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = ownHeader;