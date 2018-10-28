const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');



// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let configData = null;


// Sorts an array alphanumerically, so that '10.svg' comes after '2.svg' in our lists of screens.
const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });

// Used in getting the url slug 
function readFirstLine(pathToFile) {
    let toReturn = '';
    fs.readFileSync(pathToFile).toString().split("\n").forEach(function(line, index, arr) {
      if (index === arr.length - 1 && line === "") { return; }
      if (index === 0) {
        toReturn = line;
      }
    });
    return toReturn;
}

// Given, say, the root of our project, it creates the config data objects for the magick flows.
function getMagickFlowDirectories(dir, directories_) {
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
                            thisMagickFlowScreens = getFiles(thisMagickFlowMainContentFullPath).sort(sortAlphaNum);
                        }
                        catch(error) {
                            console.error(error);
                        }


                        let thisMagickFlowAssets = [];
                        let thisMagickFlowAssetsMetaData = [];
                        try {
                            thisMagickFlowAssets = getFiles(thisMagickFlowAssetsContentFullPath).sort(sortAlphaNum);
                        }
                        catch(error) {
                            console.error(error);
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



                        
                        configData.demoMagickFlowUrlSlugs.push(thisMagickFlowUrlSlug);
                        configData.demoMagickFlowUrlSlugsMapToFlowDirectories[thisMagickFlowUrlSlug] = thisMagickFlowName;



                        // let thisMagickFlowScreensMetaData.pus;

                        thisMagickFlowScreens.forEach(function(fileName, fileIndex) {

                            let thisMagickFlowScreenDataAttributes = {};
                            let fileNameSplit = fileName.split('___');
                            let thisNodeKeyValues;
                            let thisNodeIdValue;



                            let pathToFile = path.join(thisMagickFlowMainContentFullPath, fileName);
                            
                            const dimensions = sizeOf(pathToFile);

                            const isPng = fileName.endsWith('.png');
                            const isSvg = fileName.endsWith('.svg');
                            const isMp4 = fileName.endsWith('.mp4');
                            const isGif = fileName.endsWith('.gif');
                            const isJpeg = fileName.endsWith('.jpg');
                            const fileExtension = fileName.split('.')[fileName.split('.').length - 1];
                            thisMagickFlowScreenDataAttributes.fileExtension = fileExtension;
                            thisMagickFlowScreenDataAttributes.dimensions = dimensions;
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
                                                // not sure what i was planning here.... hopefully ipll remember. ¯\_(ツ)_/¯
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
                                            
                                            console.log(`assetFileName.match(thisNodeIdValue): `, assetFileName.match(thisNodeIdValue));

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


                                            console.log(`assetFileName.match('sticky-footer'): `, assetFileName.match('sticky-footer'));
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
                getMagickFlowDirectories(aFileOrDirectoryFullPath, directories_);
            }
        } else {
        }
    }
    return directories_;
}


// This gets files -- used to get the lists of screens for each magick flow.
function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const fullPath = dir + '/' + files[i];
        const name = files[i];
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


module.exports = function() {
    // if the static data was already set. return it
    if (configData != null && configData != undefined) {
        return configData;
    }

    // default to production
    const defaultConfigData = require('./config.json');


    let envConfigData = {};
    // obtain env specific config
	if(process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
        envConfigData = require(`./config.overrides.${process.env.NODE_ENV}.json`) || {};
    }

    // merge default with env config, overwriting defaults
    configData = { ...defaultConfigData, ...envConfigData };
    configData.localization = require(`../brand-themes/${configData.brandTheme}/localization.js`);



    // view engine setup
    // https://expressjs.com/en/4x/api.html#app.set
    // views are looked up in the order they occur in the array (earlier takes precedence over later --cascade flows reverse of the way it does in CSS)
    const appViews = [path.join(__dirname, '../', 'your-code-here')];

    if (configData.productTemplate) {
        appViews.push(path.join(__dirname, '../', 'product-templates', configData.productTemplate));
    }
    appViews.push(path.join(__dirname, '../', 'engine'));
    configData.appViews = appViews;


    const startingPath = path.join(__dirname, '..');
    const magickFlowDirectories = getMagickFlowDirectories(startingPath).sort(sortAlphaNum);

    configData.magickFlowDirectories = magickFlowDirectories;



    // LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
    configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
    configData.port = process.env.port || configData.port;

    return configData;
}
