const sizeOf = require('image-size');

const possibleTraits = require('./traits/index');

const getScreenTraits = (screenInfo) => {
	// screens without IDs can't have data. Abort.
	if ( !screenInfo.screenId ) return {};

	let assetsData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	// shortcut to speed up the whole process.
	const possibleTraitIds = possibleTraits.reduce(
		(ids, trait) => `${ids}|${trait.id}`,
		''
	);
	if ( !screenInfo.fileName.match(possibleTraitIds) ) return assetsData;

	screenInfo.assetFiles.forEach((assetFileName, assetFileIndex) => {
		// only grab asset files for the screen we are on
		if ( assetFileName.match(screenInfo.screenId) ) {
			// loops through all possible traits and adds each one's data
			possibleTraits.forEach((trait) => {
				// make sure the screen is requesting this trait
				if (trait.isRequiredBy(screenInfo.fileName)) {
					assetsData = trait.addTraitData(assetsData, screenInfo, assetFileName, assetFileIndex);
				}
			});
		}
	});

	return assetsData;
}

module.exports = getScreenTraits;