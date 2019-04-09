const path = require('path');
const fs = require('fs');
const util = require('util');
const sizeOf = require('image-size');
const addMagickFlowsToConfig = require('./config-magick-flows');
const sassGenerator = require('./magick-flows-util/sass-generator.js');




// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let configData = null;

function dynamicSass(scssVariablesFilePath, variables, handleSuccess, handleError) {
    // Dynamically create "SASS variable declarations"
    const dataString = sassGenerator.sassVariables(variables);

    fs.writeFile(scssVariablesFilePath, dataString, function(err){
        if(!err){
            // console.log(`[ config/config.js:26 ] dataString: `, util.inspect(dataString, { showHidden: true, depth: null, colors: true }));
        } else {
            console.error(`[ config/config.js:28 ] dataString: `, util.inspect(dataString, { showHidden: true, depth: null, colors: true }));

        }
    });
}

function dynamicSassHandleSuccess(data){
    console.log(`[ dynamicSassHandleSuccess ]: `, data);
}
function dynamicSassHandleError(data){
    console.log(`[ dynamicSassHandleError ]: `, data);
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


    if (process.env.DEBUG === "true") {
        envConfigData.DEBUG = true;
    } else {
        envConfigData.DEBUG = false;
    }
    // merge default with env config, overwriting defaults
    configData = { ...defaultConfigData, ...envConfigData };


    let defaultEngineConfig = {};
    try {
        defaultEngineConfig = configData.productTemplate ? require(`../engine/default-config.js`) : {};
    } catch (e) {
        console.warn('no default engine config');
    }

    let defaultProductTemplateConfig = {};
    try {
        defaultProductTemplateConfig = configData.productTemplate ? require(`../product-templates/${configData.productTemplate}/default-config.js`) : {};
    } catch (e) {
        console.warn('no default product template config');
    }

    let demoOverrideConfig = {};
    try {
        demoOverrideConfig = configData.demoVenue && configData.productTemplate ? require(`../demo-overrides/${configData.productTemplate}/${configData.demoVenue}/localization.js`) : {};
    } catch (e) {
        console.warn('no demo overrides localization');
    }
    
    let brandThemeConfig = {};
    try {
        brandThemeConfig = configData.brandTheme ? require(`../brand-themes/${configData.brandTheme}/localization.js`) : {};
    } catch (e) {
        console.warn('no brand theme localization');
    }

    configData.localization = Object.assign({}, defaultEngineConfig, defaultProductTemplateConfig, demoOverrideConfig, brandThemeConfig);

    // view engine setup
    // https://expressjs.com/en/4x/api.html#app.set
    // views are looked up in the order they occur in the array (earlier takes precedence over later --cascade flows reverse of the way it does in CSS)
    const appViews = [];

    if (configData.productTemplate) {
        if (configData.demoVenue) {
            appViews.push(path.join(__dirname, '../', 'demo-overrides', configData.productTemplate, configData.demoVenue));
        }
        appViews.push(path.join(__dirname, '../', 'product-templates', configData.productTemplate));
    }
    appViews.push(path.join(__dirname, '../', 'engine'));
    appViews.push(path.join(__dirname, '../', 'slides'));
    appViews.push(path.join(__dirname, '../', 'magick-flows-web-root'));
    configData.appViews = appViews;

    configData = addMagickFlowsToConfig(configData);

    if (!configData.magickFlowURLS.length) {
        console.warn(`WARNING: No Magick Flows were discovered. This is pretty rare, since, the system comes with at least _one_ to show you how they work. Y'all okay?`);
    } else {

        appViews.push(path.join(__dirname, '../', 'product-templates', 'magick-flows'));

        // now that we have settled on what our Magick Flows config data is, we will
        // use it to programaticallly prepare some SCSS variables for each one.
        configData.magickFlows.urlSlugs.forEach(magickFlowUrlSlug => {
            const thisMagickFlowObject = configData.magickFlows[magickFlowUrlSlug];
            const thisMagickFlowScreens = configData.magickFlows[magickFlowUrlSlug].screens;
            const thisMagickFlowAssets = configData.magickFlows[magickFlowUrlSlug].assets;


            const thisMagickFlowMainImagesForScssVariables = thisMagickFlowScreens.filter(fileName => (fileName.endsWith('.png') === true || fileName.endsWith('.svg') === true || fileName.endsWith('.gif') === true || fileName.endsWith('.jpg') === true || fileName.endsWith('.jpeg') === true));
            const thisMagickFlowAssetsImagesForScssVariables = thisMagickFlowAssets.filter(fileName => (fileName.endsWith('.png') === true || fileName.endsWith('.svg') === true || fileName.endsWith('.gif') === true || fileName.endsWith('.jpg') === true || fileName.endsWith('.jpeg') === true));
            const thisMagickFlowBackgroundImageVariable = [];

            // iterate through the main images, add url and path to it
            thisMagickFlowMainImagesForScssVariables.forEach(function(item){
                thisMagickFlowBackgroundImageVariable.push(`url('/magick-flows/${magickFlowUrlSlug}/main/${item}')`);
            });
            // iterate through the assets images, add url and path to it
            thisMagickFlowAssetsImagesForScssVariables.forEach(function(item){
                thisMagickFlowBackgroundImageVariable.push(`url('/magick-flows/${magickFlowUrlSlug}/assets/${item}')`);
            });

            const scssVariablesFilePath = path.join(thisMagickFlowObject.fullAssetsPath, 'variables.scss')
            dynamicSass(scssVariablesFilePath, {
                'numberOfSlides': thisMagickFlowObject.numberOfScreens,
                'preloadImagesData': thisMagickFlowBackgroundImageVariable.join('\r\n\t\t')
            }, dynamicSassHandleSuccess, dynamicSassHandleError);
        });

        console.group(`
        ============================================================
        Demuxe: Magick Flows Setup Information
        ------------------------------------------------------------

        There is a dashboard for Magick Flows available at:

        ${configData[process.env.NODE_ENV].host}magick-flows-dashboard
        ------------------------------------------------------------

        The Demuxe engine looked around, and, lo, it found ${configData.magickFlowURLS.length} Magick Flows:

        ${configData.magickFlowURLS.join(`\n        `)}

        Hold Cmd & click on one of the above URLs to open it in a browser.
        `);
        console.groupEnd();
    }

    // LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
    configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
    configData.port = process.env.port || configData.port;



    return configData;
}
