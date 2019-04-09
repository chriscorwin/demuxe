console.group(`
============================================================
Demuxe: Running \`config/magick-flows-util/get-screen-traits.js\` now...
------------------------------------------------------------
`);
const util = require('util');
const possibleTraits = require('./traits/index');


const getScreenTraits = (screenInfo) => {
	// screens without IDs can't have data. Abort.
	console.debug(`[ config/magick-flows-util/get-screen-traits.js:15 ] screenInfo: `, util.inspect(screenInfo, { showHidden: true, depth: null, colors: true }));
	console.debug(`[ config/magick-flows-util/get-screen-traits.js:16 ] screenInfo.screenId: `, util.inspect(screenInfo.screenId, { showHidden: true, depth: null, colors: true }));
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
	
	console.debug(`
	[ config/magick-flows-util/get-screen-traits.js:29 ] possibleTraitIds: 
		`, util.inspect(possibleTraitIds, { showHidden: true, depth: null, colors: true }));
	console.debug(`
	[ config/magick-flows-util/get-screen-traits.js:30 ] screenInfo.fileName.
		match(possibleTraitIds): `, util.inspect(screenInfo.fileName.match(possibleTraitIds), { showHidden: true, depth: null, colors: true }));
	console.debug(`
	[ config/magick-flows-util/get-screen-traits.js:31 ] traitsData: 
		`, util.inspect(traitsData, { showHidden: true, depth: null, colors: true }));
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
			console.error('\u0007');

			const screenInfoFileNameFormattedForConsoleOutput = util.inspect(screenInfo.fileName, { showHidden: true, depth: null, colors: true });
			const screenInfoFormattedForConsoleOutput = util.inspect(screenInfo, { showHidden: false, depth: 3, colors: true });
			const traitIdFormattedForConsoleOutput = util.inspect(trait.id, { showHidden: false, depth: 3, colors: true });
			const relevantAssetsFormattedForConsoleOutput = util.inspect(relevantAssets, { showHidden: false, depth: 3, colors: true });

			console.error(`




============================================================
[ERROR] Your demo is broken!
============================================================

The trait ${traitIdFormattedForConsoleOutput} is indicated as being 
required by the file:

	${screenInfoFileNameFormattedForConsoleOutput}

...however, no asset file was found among the possible 
assets present in Demuxe.
`);

if ( relevantAssets.length === 0 ) {
	console.warn(`
As a matter of fact, the systen found zero (0) assets 
associated with this screen.
------------------------------------------------------------

Some more information about this screen: 
	${screenInfoFormattedForConsoleOutput}
`);

} else {
	console.info(`
The following asset files were found and determined to be 
associated with this screen:

	${relevantAssetsFormattedForConsoleOutput}
------------------------------------------------------------

Some more information about this screen: 
	${screenInfoFormattedForConsoleOutput}

`);


}
console.warn(`
The following traits were determined to be required by this 
screen:

	${requiredTraitNames}
`);


if (process.env.DEBUG === "true") {
	console.info(`
============================================================
[ERROR] Debug Information
============================================================

Note that because you are in 'dev' mode this error has 
caused the server to fail to start.

If this is annoying you, try starting the server with local 
instead of dev ;)
	`);
	process.exit(126);
} else if (process.env.NODE_ENV === "local") {
	console.info(`

Note that if you were in 'dev' mode this error would have 
caused the server to fail to start.

So if you find that it took you way too long to figure out 
that this demo is borked, try starting the server with dev 
instead of local.

`);
}
		}
	});

	return traitsData;
}

module.exports = getScreenTraits;

console.log(`...end: \`config/magick-flows-util/get-screen-traits.js\`
------------------------------------------------------------






`);
console.groupEnd();
