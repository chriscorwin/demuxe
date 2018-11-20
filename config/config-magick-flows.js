const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');

console.group(`
============================================================
Demuxe: Running \`config/config-magick-flows.js\` now...
------------------------------------------------------------
`);

const magickFlowsConfig = {


	// Sorts an array alphanumerically, so that '10.svg' comes after '2.svg' in our lists of screens.
	sortAlphaNum: (a, b) => a.localeCompare(b, 'en', { numeric: true }),

	// Used in getting the url slug 
	readFirstLine: function(pathToFile) {
		let toReturn = '';
		fs.readFileSync(pathToFile).toString().split("\n").forEach(function(line, index, arr) {
		  if (index === arr.length - 1 && line === "") { return; }
		  if (index === 0) {
			toReturn = line;
		  }
		});
		return toReturn;
	},





	// Given, say, the root of our project, it creates the config data objects for the magick flows.
	getMagickFlowDirectories: function (dir, directories_ = [], configData) {
		
		directories_ = directories_ || [];
		let toReturn = {}
		const filesAndDirectories = fs.readdirSync(dir);
		for (const i in filesAndDirectories) {

			const aFileOrDirectoryFullPath = path.join(dir, filesAndDirectories[i]);
			const aFileOrDirectoryName = filesAndDirectories[i];

			if (fs.statSync(aFileOrDirectoryFullPath).isDirectory()) {

				if (aFileOrDirectoryName === configData.magickFlows.directoryName) {

					const subFilesAndDirectories = fs.readdirSync(aFileOrDirectoryFullPath);
					for (const j in subFilesAndDirectories) {


						if (fs.statSync(path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j])).isDirectory()) {


							const thisMagickFlowFullPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]);
							const thisMagickFlowMainContentFullPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j], 'main');
							const thisMagickFlowAssetsContentFullPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j], 'assets');
							const thisMagickFlowName = subFilesAndDirectories[j];

							let thisMagickFlowScreens = [];
							let thisMagickFlowScreensMetaData = [];
							try {
								thisMagickFlowScreens = magickFlowsConfig.getFiles(thisMagickFlowMainContentFullPath).sort(magickFlowsConfig.sortAlphaNum);
							}
							catch(error) {
								if ( error.message.includes('ENOENT: no such file or directory')) {
									console.error(`
	[ ERROR IN: \`${thisMagickFlowName}\`]
	The app is attempting to render a Magick Flow at:

	${thisMagickFlowMainContentFullPath}

	...and did not find anything there.

	THERE IS NO CONTENT FOR IT. 

	This is not required to make the app work, so, take this for what its worth,
	you seem to not be using the headers and footers feature.
									`);
								} else {
									console.warn(error);
									
								}
							}


							let thisMagickFlowAssets = [];
							let thisMagickFlowAssetsMetaData = [];
							try {
								thisMagickFlowAssets = magickFlowsConfig.getFiles(thisMagickFlowAssetsContentFullPath).sort(magickFlowsConfig.sortAlphaNum);
							}
							catch(error) {
								if ( error.message.includes('ENOENT: no such file or directory')) {
									console.warn(`
	[ THERE ARE NO ASSETS FOR \`${thisMagickFlowName}\`]
	The app is attempting to render a Magick Flow at:

	${thisMagickFlowAssetsContentFullPath}

	...and did not find anything there. This is not required to make the app
	work, so, take this for what its worth, you seem to not be using the headers
	and footers feature.
										`);
								} else {
									console.warn(error);
									
								}
							}


							let thisMagickFlowConfigData = {};

							const thisMagickFlowNumberOfScreens = thisMagickFlowScreens.length;

							let thisMagickFlowUrlSlugPath;
							let thisMagickFlowUrlSlug;

							
							// get it's url slug
							if (fs.existsSync(path.join(thisMagickFlowFullPath, '.url-slug'))) {
								try {
									let firstElement = thisMagickFlowScreens.shift();
									thisMagickFlowUrlSlugPath = path.join(thisMagickFlowFullPath, '.url-slug');
									thisMagickFlowUrlSlug = readFirstLine(thisMagickFlowUrlSlugPath);
								}
								catch(error) {
									console.error(error);
								}
								// Do something
							} else {
								thisMagickFlowUrlSlug = thisMagickFlowName;
							}


							// get it's url slug
							if (fs.existsSync(path.join(thisMagickFlowFullPath, '../', thisMagickFlowName + '.json'))) {
								thisMagickFlowConfigData = require(path.join(thisMagickFlowFullPath, '../', thisMagickFlowName + '.json'));
							}


							configData.magickFlows.urlSlugs.push(thisMagickFlowUrlSlug);
							configData.magickFlows.urlSlugsMapToFlowDirectories[thisMagickFlowUrlSlug] = thisMagickFlowName;



							// let thisMagickFlowScreensMetaData.pus;
							thisMagickFlowScreens.forEach(function(fileName, fileIndex) {

								let thisMagickFlowScreenDataAttributes = {};
								let fileNameSplit = fileName.split('___');
								let thisNodeKeyValues;
								let thisNodeIdValue;

								let pathToFile = path.join(thisMagickFlowMainContentFullPath, fileName);
								
								const isEjs = fileName.endsWith('.ejs');
								if ( isEjs === true ) {
									thisMagickFlowScreenDataAttributes.dimensions = {type: 'ejs'};
								} else {
									const dimensions = sizeOf(pathToFile);
									thisMagickFlowScreenDataAttributes.dimensions = dimensions;
								}

								const isPng = fileName.endsWith('.png');
								const isSvg = fileName.endsWith('.svg');
								const isMp4 = fileName.endsWith('.mp4');
								const isGif = fileName.endsWith('.gif');
								const isJpeg = fileName.endsWith('.jpg');
								const fileExtension = fileName.split('.')[fileName.split('.').length - 1];

								thisMagickFlowScreenDataAttributes.fileExtension = fileExtension;
								thisMagickFlowScreenDataAttributes.fileName = fileName;
								thisMagickFlowScreenDataAttributes.screensIndex = fileIndex;


								fileNameSplit.forEach(function(node, nodeIndex) {
									// first one is the sorter, ignore it

									// other nodes have a KEY= at the beginning, with arbitrary data provided
									if ( node.includes('=') === true ) {
										// we have some data, split on the equals sign to get keys and values
										const thisNodeKey = node.split('=')[0];
										let thisNodeKeyValues = node.split('=')[1];

										if (thisNodeKey === 'ID') {
											thisNodeIdValue = thisNodeKeyValues.split('.')[0];
										}

										let thisNodeKeyValuesFinal = [];
										let thisNodeKeyValuesSplit = [];
										if ( thisNodeKeyValues.includes('__') === true ) {
											thisNodeKeyValuesSplit = thisNodeKeyValues.split('__');
											// each of these is an attribute, but may need cleaned up
											thisNodeKeyValuesSplit.forEach(function(nodeValue, idx) { 
												thisNodeKeyValuesFinal.push(nodeValue.split('.')[0].toLowerCase());


												if ( nodeValue.split('.').length > 1) {
													// not sure what i was planning here.... hopefully will remember. ¯\_(ツ)_/¯
												}
											});
											thisMagickFlowScreenDataAttributes[thisNodeKey.toLowerCase()] = thisNodeKeyValuesFinal;
										} else {
											
											if (thisNodeKey.toLowerCase() === 'data' && typeof thisNodeKeyValues.split('.')[0] === 'string') {
												// make sure the stupid thing is in an array
												thisMagickFlowScreenDataAttributes[thisNodeKey.toLowerCase()] = [thisNodeKeyValues.split('.')[0]];

											} else {
												thisMagickFlowScreenDataAttributes[thisNodeKey.toLowerCase()] = thisNodeKeyValues.split('.')[0];
											}
										}
									} else {
										thisMagickFlowScreenDataAttributes['sorter'] = node;
									}
								});

								// thisMagickFlowScreenDataAttributes


								if ( typeof thisMagickFlowScreenDataAttributes.data === 'undefined' ) {
									// thisMagickFlowScreenDataAttributes['hasStickyHeader'] = false;
									// thisMagickFlowScreenDataAttributes['hasStickyHeader'] = false;
								} else {

									
									// look for headers and footers
									if ( fileName.match('sticky-header') || fileName.match('sticky-footer') ) {
										thisMagickFlowAssets.forEach(function(assetFileName, assetFileIndex) {

											if ( assetFileName.match(thisNodeIdValue) !== null ) {
												

												if ( assetFileName.match('sticky-header') !== null) {

													let pathToAssetFile = path.join(thisMagickFlowAssetsContentFullPath, assetFileName);
													let dataToTrack = [];
													const dimensions = sizeOf(pathToAssetFile);
													dataToTrack = {
														"stickyHeaderPathToAssetFile": pathToAssetFile,
														"stickyHeaderHeight": dimensions.height,
														"stickyHeaderWidth": dimensions.width,
														"stickyHeaderScreensIndex": fileIndex,
														"stickyHeaderAssetFileIndex": assetFileIndex,
														"stickyHeaderFileName": assetFileName,
														"stickyHeaderFileName": assetFileName,
														"stickyHeaderFilePath": pathToAssetFile,
													};
													thisMagickFlowAssetsMetaData.push(dataToTrack);
													thisMagickFlowScreenDataAttributes['hasStickyHeader'] = true;
													thisMagickFlowScreenDataAttributes['stickyHeaderPathToAssetFile'] = pathToAssetFile;
													thisMagickFlowScreenDataAttributes['stickyHeaderHeight'] = dimensions.height;
													thisMagickFlowScreenDataAttributes['stickyHeaderWidth'] = dimensions.width;
													thisMagickFlowScreenDataAttributes['stickyHeaderScreensIndex'] = fileIndex;
													thisMagickFlowScreenDataAttributes['stickyHeaderAssetFileIndex'] = assetFileIndex;
													thisMagickFlowScreenDataAttributes['stickyHeaderFileName'] = assetFileName;
													thisMagickFlowScreenDataAttributes['stickyHeaderFileName'] = assetFileName;
													thisMagickFlowScreenDataAttributes['stickyHeaderFilePath'] = pathToAssetFile;
												} else {
												}


												if ( assetFileName.match('sticky-footer') !== null) {

													let pathToAssetFile = path.join(thisMagickFlowAssetsContentFullPath, assetFileName);
													let dataToTrack = [];
													const dimensions = sizeOf(pathToAssetFile);
													dataToTrack = {
														"stickyFooterPathToAssetFile": pathToAssetFile,
														"stickyFooterHeight": dimensions.height,
														"stickyFooterWidth": dimensions.width,
														"stickyFooterScreensIndex": fileIndex,
														"stickyFooterAssetFileIndex": assetFileIndex,
														"stickyFooterFileName": assetFileName,
														"stickyFooterFileName": assetFileName,
														"stickyFooterFilePath": pathToAssetFile,
													};
													thisMagickFlowAssetsMetaData.push(dataToTrack);
													thisMagickFlowScreenDataAttributes['hasStickyFooter'] = true;
													thisMagickFlowScreenDataAttributes['stickyFooterPathToAssetFile'] = pathToAssetFile;
													thisMagickFlowScreenDataAttributes['stickyFooterHeight'] = dimensions.height;
													thisMagickFlowScreenDataAttributes['stickyFooterWidth'] = dimensions.width;
													thisMagickFlowScreenDataAttributes['stickyFooterScreensIndex'] = fileIndex;
													thisMagickFlowScreenDataAttributes['stickyFooterAssetFileIndex'] = assetFileIndex;
													thisMagickFlowScreenDataAttributes['stickyFooterFileName'] = assetFileName;
													thisMagickFlowScreenDataAttributes['stickyFooterFileName'] = assetFileName;
													thisMagickFlowScreenDataAttributes['stickyFooterFilePath'] = pathToAssetFile;
												} else {
												}


											} else {
												
											}

										});
										
									}



								}

								thisMagickFlowScreensMetaData.push(thisMagickFlowScreenDataAttributes);


							});

						 

							configData.magickFlows[subFilesAndDirectories[j]] = {
								"name": thisMagickFlowName,
								"path": thisMagickFlowFullPath,
								"screens": thisMagickFlowScreens,
								"assets": thisMagickFlowAssets,
								"assetsMetaData": thisMagickFlowAssetsMetaData,
								"numberOfScreens": thisMagickFlowNumberOfScreens,
								"urlSlug": thisMagickFlowUrlSlug,
								"metaData": thisMagickFlowConfigData,
								"metaData2": thisMagickFlowScreensMetaData,
							};

							directories_.push(path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]));

						}
					}

				} else {
					magickFlowsConfig.getMagickFlowDirectories(aFileOrDirectoryFullPath, directories_, configData);
				}
			} else {
			}
		}
		return directories_;
	},


	// This gets files -- used to get the lists of screens for each magick flow.
	getFiles: function(dir, files_) {
		files_ = files_ || [];
		const files = fs.readdirSync(dir);
		for (const i in files) {
			const fullPath = dir + '/' + files[i];
			const name = files[i];
			if (fs.statSync(fullPath).isDirectory()) {
				// If we end up allowing "packages" as a Magick Flow step, here is where the code needs to be aware of it.
				magickFlowsConfig.getFiles(fullPath, files_);
			} else {
				files_.push(name);
			}
		}
		return files_;
	}


}

module.exports = magickFlowsConfig;