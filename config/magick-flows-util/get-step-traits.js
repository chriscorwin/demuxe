console.group(`
============================================================
Demuxe: Running \`config/magick-flows-util/get-step-traits.js\` now...
------------------------------------------------------------
`);
const util = require('util');
const possibleTraits = require('./traits/index');

if (process.env.DEBUG === "true") {
	console.debug = console.log;
}

const getStepTraits = (stepInfo) => {
	// steps without IDs can't have data. Abort.
	console.log(`
	[ config/magick-flows-util/get-step-traits.js:15 ] stepInfo.stepId: `, util.inspect(stepInfo.stepId, { showHidden: true, depth: null, colors: true }));
	console.log(`[ config/magick-flows-util/get-step-traits.js:21 ] stepInfo: `, util.inspect(stepInfo, { showHidden: true, depth: null, colors: true }));
	if ( !stepInfo.stepId ) return {};

	let traitsData = {
		assetsMetaData: [],
		stepDataAttributes: {}
	};

	// shortcut to speed up the whole process.
	const possibleTraitIds = possibleTraits.reduce(
		(ids, trait) => `${ids}|${trait.id}`,
		''
	);
	
	// console.log(`
	// [ config/magick-flows-util/get-step-traits.js:31 ] possibleTraitIds: 
	// 	`, util.inspect(possibleTraitIds, { showHidden: true, depth: null, colors: true }));
	console.log(`
	[ config/magick-flows-util/get-step-traits.js:34 ] stepInfo.fileName.
		match(possibleTraitIds): `, util.inspect(stepInfo.fileName.match(possibleTraitIds), { showHidden: true, depth: null, colors: true }));
	console.log(`
	[ config/magick-flows-util/get-step-traits.js:37 ] traitsData: 
		`, util.inspect(traitsData, { showHidden: true, depth: null, colors: true }));
	if ( !stepInfo.fileName.match(possibleTraitIds) ) return traitsData;

	const relevantAssets = stepInfo.assetFiles.filter(asset => {
		return asset.match(stepInfo.stepId);
	});

	const requiredTraits = possibleTraits.filter(trait => {
		return trait.isRequiredBy(stepInfo.fileName);
	});

	// Add trait data for each
	requiredTraits.forEach(trait => {
		const assetForTrait = relevantAssets.find(asset => trait.isAssetForTrait(asset));
		const assetFileIndex = stepInfo.assetFiles.findIndex(asset => assetForTrait === asset);

		if (assetForTrait && assetFileIndex >= 0) {
			traitsData = trait.addTraitData(traitsData, stepInfo, assetForTrait, assetFileIndex);
		} else {
			const requiredTraitNames = requiredTraits.reduce((traits, trait) => `${traits}\n ${trait.id}`, '');
			console.error('\u0007');

			const stepInfoFileNameFormattedForConsoleOutput = util.inspect(stepInfo.fileName, { showHidden: true, depth: null, colors: true });
			const stepInfoFormattedForConsoleOutput = util.inspect(stepInfo, { showHidden: false, depth: 3, colors: true });
			const traitIdFormattedForConsoleOutput = util.inspect(trait.id, { showHidden: false, depth: 3, colors: true });
			const relevantAssetsFormattedForConsoleOutput = util.inspect(relevantAssets, { showHidden: false, depth: 3, colors: true });

			console.error(`




============================================================
[ERROR] Your demo is broken!
============================================================

The trait ${traitIdFormattedForConsoleOutput} is indicated as being 
required by the file:

	${stepInfoFileNameFormattedForConsoleOutput}

...however, no asset file was found among the possible 
assets present in Demuxe.
`);

if ( relevantAssets.length === 0 ) {
	console.warn(`
As a matter of fact, the systen found zero (0) assets 
associated with this step.
------------------------------------------------------------

Some more information about this step: 
	${stepInfoFormattedForConsoleOutput}
`);

} else {
	console.info(`
The following asset files were found and determined to be 
associated with this step:

	${relevantAssetsFormattedForConsoleOutput}
------------------------------------------------------------

Some more information about this step: 
	${stepInfoFormattedForConsoleOutput}

`);


}
console.warn(`
The following traits were determined to be required by this 
step:

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

module.exports = getStepTraits;

console.log(`...end: \`config/magick-flows-util/get-step-traits.js\`
------------------------------------------------------------






`);
console.groupEnd();
