const sizeOf = require('image-size');

const possibleTraits = require('./traits/index');

const getScreenTraits = (screenInfo) => {
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
		// only grab screenInfo.assetFiles for the screen we are on
		if ( !assetFileName.match(screenInfo.screenId) ) return foundData;

		// loops through all possible traits and adds each one's data
		possibleTraits.forEach((trait) => {
			if (trait.isRequiredBy(assetFileName)) {
				foundData = trait.addTraitData(foundData, screenInfo, assetFileName, assetFileIndex);
			}
		});
	});

	return foundData;
}

module.exports = getScreenTraits;