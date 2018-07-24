const path = require('path');

// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let configData = null;
module.exports = function() {
	// if the static data was already set. return it
	if(configData != null && configData != undefined) {
		return configData;
	}
	
	// default to production
	const defaultConfigData = require('./config.json');


	let envConfigData = {};
	// obtain env specific config
	if(process.env.NODE_ENV) {
		envConfigData = require(`./config.overrides.${process.env.NODE_ENV}.json`) || {};
	}

	// merge default with env config, overwriting defaults
	configData = { ...defaultConfigData, ...envConfigData };
console.log('configData');
console.dir(configData);
	configData.localization = path.join(__dirname, 'brand-themes', configData.brandTheme, 'localization.json');

	// LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
	configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
	configData.port = process.env.port || configData.port;
	
	return configData;
}