const consumer_rights_management = require('./consumer-rights-management');
const data_capture_sources = require('./data-capture-sources');
const einstein_segmentation = require('./einstein-segmentation');
const overview = require('./overview');
const manage_segments = require('./manage-segments');
const segments = require('./segments');

module.exports = {
	body_class: 'slds-brand-band slds-brand-band_medium',
	consumer_rights_management,
	einstein_segmentation,
	data_capture_sources,
	manage_segments,
	overview,
	segments
};
