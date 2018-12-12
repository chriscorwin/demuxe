console.group(`
============================================================
Demuxe: Running \`config/config-magick-flows-scss-test.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');
const sass = require('node-sass');


const preloadImagesData = `url('/magick-flows/bbva-mobile/0000___ID=google-search-results___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/0100___ID=homepage-1___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/0200___ID=homepage-2___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/0300___ID=mortgages-1___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/0400___ID=homepage-3___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/0500___ID=valora-home.png') url('/magick-flows/bbva-mobile/0600___ID=valora-email-field-blank.png') url('/magick-flows/bbva-mobile/0700___ID=valora-email-field-filled.png') url('/magick-flows/bbva-mobile/0800___ID=valora-use-camera.png') url('/magick-flows/bbva-mobile/0900___ID=valora-fake-video-gif.gif') url('/magick-flows/bbva-mobile/1000___ID=valora-fake-video-found-home.png') url('/magick-flows/bbva-mobile/1100___ID=valora-results___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/1200___ID=valora-details___DATA=has-sticky-header__has-sticky-footer.png') url('/magick-flows/bbva-mobile/1300___ID=mortgage-app-step-0___DATA=has-sticky-header.png') url('/magick-flows/bbva-mobile/1400___ID=mortgage-app-step-2___DATA=has-sticky-header__has-sticky-footer.png')`;


// Where the "sassGenerator" functions could looks something like
const sassGenerator = {
	sassVariable: function(name, value) {
		return "$" + name + ": " + value + ";";
	},

	sassVariables: function(variablesObj) {
		return Object.keys(variablesObj).map(function (name) {
			return sassGenerator.sassVariable(name, variablesObj[name]);
		}).join('\n')
	},

	sassImport: function(path) {
		return "@import '" + path + "';";
	}
}




// 1.) Define sassOptions as usual
const sassOptionsDefaults = {
	includePaths: [
		'/Users/ccorwin/Documents/Workspaces/demuxe---magick-flows-for-df-2018-gathered/your-code-here/magick-flows/bbva-mobile/assets'
	],
	outputStyle: 'expanded'
};

function dynamicSass(scssEntry, variables, handleSuccess, handleError) {
	// 2.) Dynamically create "SASS variable declarations"
	// then import the "actual entry.scss file".
	// dataString is just "SASS" to be evaluated before
	// the actual entry.scss is imported.
	// var dataString = sassGenerator.sassVariables(variables) + sassGenerator.sassImport(scssEntry);
	var dataString = sassGenerator.sassVariables(variables);
	
	const filePath = '/Users/ccorwin/Documents/Workspaces/demuxe---magick-flows-for-df-2018-gathered/your-code-here/magick-flows/bbva-mobile/assets/variables.scss';

	fs.writeFile(filePath, dataString, function(err){
		if(!err){
			console.log(`[ /Users/ccorwin/Documents/Workspaces/demuxe---magick-flows-for-df-2018-gathered/config/config-magick-flows-scss-test.js:49 ] dataString: 

				`, util.inspect(dataString, { showHidden: true, depth: null, colors: true }));
			//file written on disk
		}
	});

	var sassOptions = Object.assign(
		{},
		sassOptionsDefaults, {
			data: dataString
		}
	);

	// 3.) render sass as usual
	sass.render(sassOptions, function (err, result) {
		return (err) ? handleError(err) : handleSuccess(result.css.toString())
	});
}

// Example usage.
dynamicSass('snacks.scss', {
	'numberOfSlides': 14,
	'preloadImagesData': preloadImagesData
}, someSuccessFn, someErrorFn);

function someSuccessFn(stuff){
	console.log(`SUCCESS stuff: `, stuff);

}
function someErrorFn(stuff){
	console.log(`ERROR stuff: `, stuff);
}


console.log(`...end: \`config/config-magick-flows-scss-test.js\`
------------------------------------------------------------`);
console.groupEnd();
