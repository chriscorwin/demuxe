const possibleTraits = require('./traits/index');

const getScreenTraits = (screenInfo) => {
	// screens without IDs can't have data. Abort.
	if ( !screenInfo.screenId ) return {};

	let traitsData = {
		assetsMetaData: [],
		screenDataAttributes: {}
	};

	// shortcut to speed up the whole process.
	const possibleTraitIds = possibleTraits.reduce(
		(ids, trait) => `${ids}|${trait.id}`,
		''
	);
	if ( !screenInfo.fileName.match(possibleTraitIds) ) return traitsData;

	const relevantAssets = screenInfo.assetFiles.filter(asset => {
		return asset.match(screenInfo.screenId);
	});

	const requiredTraits = possibleTraits.filter(trait => {
		return trait.isRequiredBy(screenInfo.fileName);
	});

	// Add trait data for each
	requiredTraits.forEach(trait => {
		const assetForTrait = relevantAssets.find(asset => trait.isAssetForTrait(asset));
		const assetFileIndex = screenInfo.assetFiles.findIndex(asset => assetForTrait === asset);

		if (assetForTrait && assetFileIndex >= 0) {
			traitsData = trait.addTraitData(traitsData, screenInfo, assetForTrait, assetFileIndex);
		} else {
			const requiredTraitNames = requiredTraits.reduce((traits, trait) => `${traits}\n ${trait.id}`, '');
			console.warn(`
			YOUR DEMO MIGHT BE BROKEN!
			The trait '${trait.id}' is indicated as being required by ${screenInfo.fileName}, 
			but no asset file was found among the possible assets present in Demuxe.
			
			The following asset files were found and determined to be associated with this screen:`);
			console.dir(relevantAssets);
			console.warn(`
			The following traits were determined to be required by this screen: ${requiredTraitNames}
			
			The following is a listing of all discovered asset files within Magick Flows itself:`);
			console.dir(screenInfo.assetFiles)
		}
	});

	return traitsData;
}

module.exports = getScreenTraits;