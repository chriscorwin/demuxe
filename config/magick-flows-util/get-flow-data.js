const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');
const sortAlphaNum = require('./sort-alpha-num.js');
const getScreenTraits = require('./get-screen-traits.js');

const noFileError = (error, name, fullContentPath) => {
	if ( error.message.includes('ENOENT: no such file or directory')) {
		console.error(`
[ ERROR IN: \`config/magick-flows-util/get-flow-data.js:10\`]

Magick Flow URL Slug: \`${name}\`.

The app is attempting to render a Magick Flow at:

${fullContentPath}

...and did not find anything there.

THERE IS NO CONTENT FOR IT. 

This is not required to make the app work, so, take this for what its worth,
you seem to not be using the headers and footers feature.
		`);
	} else {
		console.warn(error);
	}
}

const noAssetsError = (error, name, fullAssetsPath) => {
	if ( error.message.includes('ENOENT: no such file or directory')) {
		console.warn(`
[ THERE ARE NO ASSETS FOR \`${name}\`]
The app is attempting to render a Magick Flow at:

${fullAssetsPath}

...and did not find anything there. This is not required to make the app
work, so, take this for what its worth, you seem to not be using the headers
and footers feature.
			`);
	} else {
		console.warn(error);
	}
}




String.prototype.toTitleCase = function() {
	return this.replace(/([\w&`'ÔÕ"Ò.@:\/\{\(\[<>_]+-? *)/g,
	function(match, p1, index, title) {
		if (index > 0 && title.charAt(index - 2) !== ":" && match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1) return match.toLowerCase();
		if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1) return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
		if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || title.substring(index - 1, index + 1).search(/[\])}]/) > -1) return match;
		return match.charAt(0).toUpperCase() + match.substr(1);
	});
};


// This gets files -- used to get the lists of screens for each magick flow.
const getFiles = (dir, files_) => {
	files_ = files_ || [];
	const files = fs.readdirSync(dir);
	for (const file in files) {
		const fullPath = dir + '/' + files[file];
		const name = files[file];
		if (fs.statSync(fullPath).isDirectory()) {
			// If we end up allowing "packages" as a Magick Flow step, here is where the code needs to be aware of it.
			getFiles(fullPath, files_);
		} else {
			files_.push(name);
		}
	}
	return files_;
}

const getDataFromFilename = (screenDataAttributes, fileName) => {
	screenDataAttributes.fileName = fileName;
	const splitFileName = fileName.split('___');

	splitFileName.forEach((node, index) => {
		// other nodes have a KEY= at the beginning, with arbitrary data provided

		if ( node.includes('=') === true ) {
			// we have some data, split on the equals sign to get keys and values
			const [ rawKey, valueWithExt ] = node.split('=');

			console.debug(`[ config/magick-flows-util/get-flow-data.js:75 ] rawKey: `, util.inspect(rawKey, { showHidden: true, depth: null, colors: true }));
			console.debug(`[ config/magick-flows-util/get-flow-data.js:76 ] valueWithExt: `, util.inspect(valueWithExt, { showHidden: true, depth: null, colors: true }));
			
			const value = valueWithExt.split('.')[0];
			const key = rawKey.toLowerCase();




			switch (key) {
				case "id":
					screenDataAttributes[key] = value;
					break;

				case "data":
					if ( value.includes('__') === true ) {
						screenDataAttributes[key] = value.split('__').map(val => val.toLowerCase());
					} else if ( typeof value === 'string' ) {
						screenDataAttributes[key] = [value];
					} else {
						screenDataAttributes[key] = value;
					}
					break;
				case "notes": 
					if ( value.includes('__') === true ) {
						screenDataAttributes[key] = value.split('__').map(val => val.toTitleCase());
					} else if ( typeof value === 'string' ) {
						screenDataAttributes[key] = [value];
					} else {
						screenDataAttributes[key] = value;
					}
				break;
				
				default: 
					screenDataAttributes[key] = value;

			}



			// if ( value.includes('__') === true ) {
			// 	screenDataAttributes[key] = value.split('__').map(val => val.toLowerCase());
			// } else {
			// 	if (key === 'data' && typeof value === 'string') {
			// 		// make sure the stupid thing is in an array
			// 		screenDataAttributes[key] = [value];
			// 	} else if (key === 'notes' && typeof value === 'string') {
			// 		// make sure the stupid thing is in an array
			// 		screenDataAttributes[key] = [value];
			// 	} else {
			// 		screenDataAttributes[key] = value;
			// 	}
			// }
		} else {
			// first one is the sorter, store it as such
			if ( index === 0 ) {
				screenDataAttributes['sorter'] = node;
			} else if ( index === 1 ) {
				screenDataAttributes['id'] = node;
			} else {
				console.debug(`[ config/magick-flows-util/get-flow-data.js:96 ] index: `, util.inspect(index, { showHidden: true, depth: null, colors: true }));
				console.debug(`[ config/magick-flows-util/get-flow-data.js:97 ] node: `, util.inspect(node, { showHidden: true, depth: null, colors: true }));
			}

		}
	});
	if (typeof screenDataAttributes.notes === 'undefined' ) {
		screenDataAttributes.notes = ['unset'];
	}
	return screenDataAttributes;
}

const getScreenData = (flowData, fileName, fileIndex) => {

	let screenDataAttributes = {
		screensIndex: fileIndex,
		fileExtension: fileName.split('.')[fileName.split('.').length - 1]
	}

	screenDataAttributes = getDataFromFilename(screenDataAttributes, fileName);

	console.debug(`[ config/magick-flows-util/get-flow-data.js:109 ] screenDataAttributes: `, util.inspect(screenDataAttributes, { showHidden: true, depth: null, colors: true }));

	if ( fileName.endsWith('.ejs') === true ) {
		screenDataAttributes.dimensions = {type: 'ejs'};
	} else {
		const pathToFile = path.join(flowData.fullContentPath, fileName);
		screenDataAttributes.dimensions = sizeOf(pathToFile);
	}

	if ( typeof screenDataAttributes.data !== 'undefined' ) {

		const screenInfo = { 
			assetFiles: flowData.assets, 
			screenId: screenDataAttributes.id, 
			fileName, 
			fileIndex, 
			sorter: screenDataAttributes.sorter, 
			fullAssetsPath: flowData.fullAssetsPath,
			magickFlowUrlSlug: flowData.urlSlug,
			magickFlowPath: flowData.path,
			screenDataAttributes,
		};
		const traitsData = getScreenTraits(screenInfo);
		flowData.assetsMetaData = traitsData.assetsMetaData;
		screenDataAttributes = Object.assign(screenDataAttributes, traitsData.screenDataAttributes);
	}

	flowData.metaData.push(screenDataAttributes);
	return flowData;
};

const getFlowData = (configData, fileOrDirectoryPath, subFileOrDirectory) => {
	if(!fs.statSync(path.join(fileOrDirectoryPath, subFileOrDirectory)).isDirectory()) {
		return configData;
	}

	const flowData = {
		assets: [],
		metaData: [],
		name: subFileOrDirectory,
		path: path.join(fileOrDirectoryPath, subFileOrDirectory),
		fullContentPath: path.join(fileOrDirectoryPath, subFileOrDirectory, 'main'),
		fullAssetsPath: path.join(fileOrDirectoryPath, subFileOrDirectory, 'assets'),
		urlSlug: subFileOrDirectory,
		screens: []
	};

	try {
		flowData.screens = getFiles(flowData.fullContentPath).sort(sortAlphaNum);
		flowData.numberOfScreens = flowData.screens.length;
	} catch(error) {
		noFileError(error, flowData.name, flowData.fullContentPath);
	}

	try {
		flowData.assets = getFiles(flowData.fullAssetsPath).sort(sortAlphaNum);
	} catch(error) {
		noAssetsError(error, flowData.name, flowData.fullAssetsPath);
	}

	flowData.screens.forEach((fileName, fileIndex) => {
		getScreenData(flowData, fileName, fileIndex);
	});

	configData.magickFlows[subFileOrDirectory] = flowData;
	configData.magickFlows.urlSlugs.push(flowData.urlSlug);
	configData.magickFlows.urlSlugsMapToFlowDirectories[flowData.urlSlug] = flowData.name;
	configData.magickFlowDirectories.push(path.join(fileOrDirectoryPath, subFileOrDirectory));

	return configData;
}

module.exports = getFlowData;
