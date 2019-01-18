const consumer_rights_management = require('./consumer-rights-management');
const einstein_segmentation = require('./einstein-segmentation');
const data_capture_sources = require('./data-capture-sources');
const manage_segments = require('./manage_segments');
const segments = require('./segments');

module.exports = {
	account_name: 'BBVA',
	consumer_rights_management,
	data_capture_sources,
	einstein_segmentation,
	manage_segments,
	NAME: 'BBVA',
	segments	
};
