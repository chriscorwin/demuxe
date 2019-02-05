const path = require('path');
const sizeOf = require('image-size');

const iosNotification = {
	id: 'ios-notification',
	isRequiredBy: (fileName) => fileName.match(iosNotification.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(iosNotification.id),
	addTraitData: (traitsData, screenInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"iosNotificationPathToAssetFile": pathToAssetFile,
			"iosNotificationHeight": dimensions.height,
			"iosNotificationWidth": dimensions.width,
			"iosNotificationScreensIndex": screenInfo.fileIndex,
			"iosNotificationAssetFileIndex": assetFileIndex,
			"iosNotificationFileName": assetFileName,
			"iosNotificationFileName": assetFileName,
			"iosNotificationFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.screenDataAttributes['showIosNotification'] = true;
		traitsData.screenDataAttributes['iosNotificationPathToAssetFile'] = pathToAssetFile;
		traitsData.screenDataAttributes['iosNotificationHeight'] = dimensions.height;
		traitsData.screenDataAttributes['iosNotificationWidth'] = dimensions.width;
		traitsData.screenDataAttributes['iosNotificationScreensIndex'] = screenInfo.fileIndex;
		traitsData.screenDataAttributes['iosNotificationAssetFileIndex'] = assetFileIndex;
		traitsData.screenDataAttributes['iosNotificationFileName'] = assetFileName;
		traitsData.screenDataAttributes['iosNotificationFileName'] = assetFileName;
		traitsData.screenDataAttributes['iosNotificationFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = iosNotification;