const path = require('path');
const fs = require('fs');

const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });

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
    if (process.env.NODE_ENV) {
        envConfigData = require(`./config.overrides.${process.env.NODE_ENV}.json`) || {};
    }

    // merge default with env config, overwriting defaults
    configData = { ...defaultConfigData, ...envConfigData };
    configData.localization = path.join(__dirname, 'brand-themes', configData.brandTheme, 'localization.json');



    // view engine setup
    // https://expressjs.com/en/4x/api.html#app.set
    // views are looked up in the order they occur in the array (earlier takes precedence over later --cascade flows reverse of the way it does in CSS)
    const appViews = [path.join(__dirname, '../', 'your-code-here')];

    if (configData.productTemplate) {
        appViews.push(path.join(__dirname, '../', 'product-templates', configData.productTemplate));
    }
    appViews.push(path.join(__dirname, '../', 'engine'));
    configData.appViews = appViews;


    // configData.demoMagickFlows

    for (var key in configData.demoMagickFlows) {
        if (!configData.demoMagickFlows.hasOwnProperty(key)) continue;

        const demoMagickFlowObject = configData.demoMagickFlows[key];
        demoMagickFlowObject.path = path.join(__dirname, '../', 'product-templates', configData.productTemplate, 'images', 'magick-flows', key);
        demoMagickFlowObject.screens = [];
	    demoMagickFlowObject.screens =  getFiles(demoMagickFlowObject.path).sort(sortAlphaNum);
    }


    // LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
    configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
    configData.port = process.env.port || configData.port;


    return configData;
}