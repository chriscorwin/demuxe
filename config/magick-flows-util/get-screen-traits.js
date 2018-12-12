const sizeOf = require('image-size');

const possibleTraits = require('./traits/index');

const getScreenTraits = (screenInfo) => {
	// screens without IDs can't have data. Abort.
	if ( !screenInfo.screenId ) return {};

	let foundData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	// shortcut to speed up the whole process.
	const possibleTraitIds = possibleTraits.reduce(
		(ids, trait) => `${ids}|${trait.id}`,
		''
	);
	if ( !screenInfo.fileName.match(possibleTraitIds) ) return foundData;

	screenInfo.assetFiles.forEach((assetFileName, assetFileIndex) => {
		// only grab asset files for the screen we are on
		if ( assetFileName.match(screenInfo.screenId) ) {
			// loops through all possible traits and adds each one's data
			possibleTraits.forEach((trait) => {
				// make sure the screen is requesting this trait
				if (trait.isRequiredBy(screenInfo.fileName)) {
					foundData = trait.addTraitData(foundData, screenInfo, assetFileName, assetFileIndex);
				}
			});
		}
	});

	return foundData;
}

module.exports = getScreenTraits;