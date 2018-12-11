/*
 To add a possible characteristic to magick-flows, you must create and add them here.

 A characteristic is a pure function that implements the following pattern:

	 id: String - Identifier in asset's path, eg: 'sticky-header'
	 isRequiredBy: Function (fileName) - This method accepts a file name
		 and then tests to see this characteristic is required. At its most basic
		 level this will be a simple string match.
	 addCharacteristicData: Function (foundData, screenInfo, assetFileName, assetFileIndex) 
		 - This method accepts the currently found characteristics data, the screenInfo,
			and the assetFileName and assetFileIndex of the asset being considered
		 - This method returns the currently found characteristics data
		 - `foundData` has an `assetsMetaData` array that you will push an object 
			 containing attributes for the characteristic if appropriate.
		 - `foundData` has a `screenDataAttributes` array that you will set properties
			 relevant to your characteristic on.

 A simple implementation of this function is as follows:

 ```
	const fakeCharacteristic = {
		id: 'fake-characteristic',
		isRequiredBy: (fileName) => fakeCharacteristic.id.match(fileName),
		addCharacteristicData: (foundData, screenInfo, assetFileName, assetFileIndex) => {
			let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
			const dimensions = sizeOf(pathToAssetFile);
			const dataToTrack = {
				dimensions
			};
			foundData.assetsMetaData.push(dataToTrack);
			foundData.screenDataAttributes['hasFakeCharacteristic'] = true;
			foundData.screenDataAttributes['fakeCharacteristicPathToAssetFile'] = pathToAssetFile;

			return foundData;
		}
	}

	module.exports = fakeCharacteristic;
 ```

 Once you have defined your characteristic, you must require it here and add it 
 to the module.exports in this file. Once you have done that, it will be magically
 taken into consideration by magick-flows.
*/
const stickyHeader = require('./sticky-header');
const stickyFooter = require('./sticky-footer');

module.exports = [
	stickyHeader,
	stickyFooter
];
