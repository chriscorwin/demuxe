const path = require('path');
const sizeOf = require('image-size');

const iosNotification = {
	id: 'ios-notification',
	isRequiredBy: (fileName) => fileName.match(iosNotification.id),
	isAssetForTrait: (assetFileName) => assetFileName.match(iosNotification.id),
	addTraitData: (traitsData, stepInfo, assetFileName, assetFileIndex) => {
		let pathToAssetFile = path.join(stepInfo.fullAssetsPath, assetFileName);
		const dimensions = sizeOf(pathToAssetFile);
		const dataToTrack = {
			"iosNotificationPathToAssetFile": pathToAssetFile,
			"iosNotificationHeight": dimensions.height,
			"iosNotificationWidth": dimensions.width,
			"iosNotificationStepsIndex": stepInfo.fileIndex,
			"iosNotificationAssetFileIndex": assetFileIndex,
			"iosNotificationFileName": assetFileName,
			"iosNotificationFileName": assetFileName,
			"iosNotificationFilePath": pathToAssetFile,
		};
		traitsData.assetsMetaData.push(dataToTrack);
		traitsData.stepDataAttributes['showIosNotification'] = true;
		traitsData.stepDataAttributes['iosNotificationPathToAssetFile'] = pathToAssetFile;
		traitsData.stepDataAttributes['iosNotificationHeight'] = dimensions.height;
		traitsData.stepDataAttributes['iosNotificationWidth'] = dimensions.width;
		traitsData.stepDataAttributes['iosNotificationStepsIndex'] = stepInfo.fileIndex;
		traitsData.stepDataAttributes['iosNotificationAssetFileIndex'] = assetFileIndex;
		traitsData.stepDataAttributes['iosNotificationFileName'] = assetFileName;
		traitsData.stepDataAttributes['iosNotificationFileName'] = assetFileName;
		traitsData.stepDataAttributes['iosNotificationFilePath'] = pathToAssetFile;

		return traitsData;
	}
}

module.exports = iosNotification;