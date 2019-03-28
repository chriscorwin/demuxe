const consumer_rights_management = require('../df18keynote/consumer-rights-management');
const data_capture_sources = require('../df18keynote/data-capture-sources');
const einstein_segmentation = require('../df18keynote/einstein-segmentation');
const overview = require('./overview');
const manage_segments = require('../df18keynote/manage-segments');
const segments = require('../df18keynote/segments');

overview.panels.dcm.view_all_buttons.push({
	id: 'manage-consumer-rights',
	text: 'Manage Consumer Rights',
	href: 'javascript:void(0);',
	onclick: "navigatePage('/consumer-rights-management');"
});

module.exports = {
	appName: 'Audience Studio',
	body_class: 'slds-brand-band slds-brand-band_medium',
	consumer_rights_management,
	einstein_segmentation,
	data_capture_sources,
	manage_segments,
	overview,
	segments
};
