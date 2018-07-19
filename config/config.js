const path = require('path');

// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let configData = null;
module.exports = function() {
	// if the static data was already set. return it
	if(configData != null && configData != undefined) {
		return configData;
	}
	
	// default to production
	const defaultConfigData = require('./config.production.json');


	let envConfigData = {};
	// obtain env specific config
	if(process.env.NODE_ENV) {
		if (process.env.NODE_ENV == 'qa') {
		    envConfigData = require('./config.qa.json');
		} else if (process.env.NODE_ENV === 'dev') { 
			envConfigData = require('./config.dev.json');
		}
	}

	// merge default with env config, overwriting defaults
	configData = { ...defaultConfigData, ...envConfigData };

	configData.localization = path.join(__dirname, 'brand-themes', configData.brand, 'localization.json');

	// LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
	configData.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR;
	configData.port = process.env.port || configData.port;
	
	return configData;
}