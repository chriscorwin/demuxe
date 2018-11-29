const path = require('path');
const fs = require('fs');
const util = require('util');



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

            if (aFileOrDirectoryName === 'magick-flows') {

                const subFilesAndDirectories = fs.readdirSync(aFileOrDirectoryFullPath);
                for (const j in subFilesAndDirectories) {
                    const thisMagickFlowFullPath = path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]);
                    const thisMagickFlowName = subFilesAndDirectories[j];

                    let thisMagickFlowScreens = getFiles(thisMagickFlowFullPath).sort(sortAlphaNum);
                    let firstElement = thisMagickFlowScreens.shift();

                    const thisMagickFlowNumberOfScreens = thisMagickFlowScreens.length;

                    // get it's url slug
                    const thisMagickFlowUrlSlugPath = path.join(thisMagickFlowFullPath, '.url-slug');
                    const thisMagickFlowUrlSlug = readFirstLine(thisMagickFlowUrlSlugPath);
                    configData.demoMagickFlowUrlSlugs.push(thisMagickFlowUrlSlug);
                    configData.demoMagickFlowUrlSlugsMapToFlowDirectories[thisMagickFlowUrlSlug] = thisMagickFlowName;


                    configData.demoMagickFlows[subFilesAndDirectories[j]] = {
                        "name": thisMagickFlowName,
                        "path": thisMagickFlowFullPath,
                        "screens": thisMagickFlowScreens,
                        "numberOfScreens": thisMagickFlowNumberOfScreens,
                        "urlSlug": thisMagickFlowUrlSlug,
                    };

                    directories_.push(path.join(aFileOrDirectoryFullPath, subFilesAndDirectories[j]));
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
    appViews.push(path.join(__dirname, '../', 'slides'));
    configData.appViews = appViews;


    const startingPath = path.join(__dirname, '..');
    const magickFlowDirectories = getMagickFlowDirectories(startingPath).sort(sortAlphaNum);

    configData.magickFlowDirectories = magickFlowDirectories;



    // LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
    configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
    configData.port = process.env.port || configData.port;

    return configData;
}
