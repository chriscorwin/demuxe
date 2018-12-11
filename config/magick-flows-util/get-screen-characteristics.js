const sizeOf = require('image-size');

const possibleCharacteristics = require('./characteristics/index');

const getScreenCharacteristics = (screenInfo) => {
	let foundData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	// shortcut to speed up the whole process.
	const possibleCharacteristicIds = possibleCharacteristics.reduce(
		(ids, characteristic) => `${ids}|${characteristic.id}`,
		''
	);
	if ( !screenInfo.fileName.match(possibleCharacteristicIds) ) return foundData;

	screenInfo.assetFiles.forEach((assetFileName, assetFileIndex) => {
		// only grab screenInfo.assetFiles for the screen we are on
		if ( !assetFileName.match(screenInfo.screenId) ) return foundData;

		// loops through all possible characteristics and adds each one's data
		possibleCharacteristics.forEach((characteristic) => {
			if (characteristic.isRequiredBy(assetFileName)) {
				foundData = characteristic.addCharacteristicData(foundData, screenInfo, assetFileName, assetFileIndex);
			}
		});
	});

	return foundData;
}

module.exports = getScreenCharacteristics;