/*
 To add a possible trait to magick-flows, you must create and add them here.

 A trait is a pure function that implements the following pattern:

	 id: String - Identifier in asset's path, eg: 'sticky-header'
	 isRequiredBy: Function (fileName) - This method accepts a file name
		 and then tests to see this trait is required. At its most basic
		 level this will be a simple string match.
	 isAssetForTrait: Function (assetFileName) - This method accepts the file name
		 of the asset in question and then tests to see if the asset file is appropriate
		 to this trait.
	 addTraitData: Function (foundData, screenInfo, assetFileName, assetFileIndex) 
		 - This method accepts the currently found traits data, the screenInfo,
			and the assetFileName and assetFileIndex of the asset being considered
		 - This method returns the currently found traits data
		 - `foundData` has an `assetsMetaData` array that you will push an object 
			 containing attributes for the trait if appropriate.
		 - `foundData` has a `screenDataAttributes` array that you will set properties
			 relevant to your trait on.

 A simple implementation of this function is as follows:

 ```
	const fakeTrait = {
		id: 'fake-trait',
		isRequiredBy: (fileName) => fileName.match(fakeTrait.id),
		isAssetForTrait: (assetFileName) => assetFileName.match(fakeTrait.id),
		addTraitData: (foundData, screenInfo, assetFileName, assetFileIndex) => {
			let pathToAssetFile = path.join(screenInfo.fullAssetsPath, assetFileName);
			const dimensions = sizeOf(pathToAssetFile);
			const dataToTrack = {
				dimensions
			};
			foundData.assetsMetaData.push(dataToTrack);
			foundData.screenDataAttributes['hasFakeTrait'] = true;
			foundData.screenDataAttributes['fakeTraitPathToAssetFile'] = pathToAssetFile;

			return foundData;
		}
	}

	module.exports = fakeTrait;
 ```

 Once you have defined your trait, you must require it here and add it 
 to the module.exports in this file. Once you have done that, it will be magically
 taken into consideration by magick-flows.
*/
const clickHints    = require('./click-hints');
const drawerFromTop    = require('./drawer-from-top');
const drawerFromBottom = require('./drawer-from-bottom');
const drawerFromLeft   = require('./drawer-from-left');
const drawerFromRight  = require('./drawer-from-right');
const iosNotification  = require('./ios-notification');
const stickyHeader     = require('./sticky-header');
const stickyFooter     = require('./sticky-footer');

module.exports = [
	clickHints,
	drawerFromTop,
	drawerFromBottom,
	drawerFromLeft,
	drawerFromRight,
	iosNotification,
	stickyHeader,
	stickyFooter
];
