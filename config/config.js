// Satic data here, so that we do not have to generate the config data all for every environment unless we wanna
let config_data = null
module.exports = function() {
	// if the static data was already set. return it
	if(config_data != null && config_data != undefined) {
		return config_data
	}
	    
	config_data = {}

	// LOAD JSON
	if(process.env.NODE_ENV === undefined || process.env.NODE_ENV == null || process.env.NODE_ENV == 'dev') { 
	    config_data = require('./config.dev.json')
	} else {
		if(process.env.NODE_ENV == 'qa') {
		    config_data = require('./config.qa.json')
		} else {
		    config_data = require('./config.production.json')
		}
	}
	// LOAD FROM ENV VARIABLES -- you can set an env variable and this will just catch it. NICE.
	config_data.SOME_STATIC_VAR = process.env.SOME_STATIC_VAR 
	config_data.port = process.env.port || config_data.port
		return config_data
}