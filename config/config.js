const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');
const configMagickFlows = require('./config-magick-flows');

console.group(`
============================================================
Demuxe: Running \`config/config.js\` now...
------------------------------------------------------------
`);




// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let configData = null;





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
    const magickFlowDirectories = configMagickFlows.getMagickFlowDirectories(startingPath, [], configData).sort(configMagickFlows.sortAlphaNum);


    let magickFlowDirectoriesFormattedForConsoleStartupLog = ``;
    magickFlowDirectories.forEach(function(aDirectoryPath){
      magickFlowDirectoriesFormattedForConsoleStartupLog += `
      http://localhost:3000/${aDirectoryPath.split('/')[aDirectoryPath.split('/').length - 1]}`;
    });

    magickFlowDirectoriesFormattedForConsoleStartupLog += `

    There is a dashboard for Magick Flows available at: 

    http://localhost:3000/magick-flows-dashboard`;

    console.group(`
============================================================
Demuxe Magick Flows Setup Information
------------------------------------------------------------

Demuxe found ${magickFlowDirectories.length} Magick Flows:

${magickFlowDirectoriesFormattedForConsoleStartupLog}
`);

    console.groupEnd();

    configData.magickFlowDirectories = magickFlowDirectories;

    // LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
    configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
    configData.port = process.env.port || configData.port;

    console.log(`
...and thus, the end of \`config/config.js\` was reached.
------------------------------------------------------------

`);
    console.groupEnd();

    return configData;
}
