const dates = require('../../../engine/javascripts/dates');

const consumer_rights_management = require('../df18keynote/consumer-rights-management');
const data_capture_sources = require('../df18keynote/data-capture-sources');
const einstein_segmentation = require('./einstein-segmentation');
const overview = require('./overview');
const manage_segments = require('../df18keynote/manage-segments');
const segments = require('./segments');

overview.panels.dcm.view_all_buttons.push({
	id: 'manage-consumer-rights',
	text: 'Manage Consumer Rights',
	href: 'javascript:void(0);',
	onclick: "navigatePage('/consumer-rights-management');"
});

consumer_rights_management.last_updated = overview.dates.lastOfLastMonth;
consumer_rights_management.subHeaderContents = `<div class="slds-grid">
						<div>Define your consent collection settings, as well as manage consent changes, raise data deletion and portability requests.</div>
						<div class="slds-col_bump-left">As of ${overview.dates.today}</div>
					</div>`

manage_segments.details_and_activation.segment_name = 'Camping and tents explorers';
manage_segments.details_and_activation.segment_description = '';
manage_segments.details_and_activation.save_action = () => {
	navigatePage('/segments/manage-segments/?state=addHighValue');
}
manage_segments.details_and_activation.activate_by_default = false;

const new_asset = {
	license: {
		date_range: `${dates.oneMonthAgo} - ${dates.today}`,
		save_text: 'Save and Provision',
		save_action: () => {
			navigatePage('/segments/manage-segments/?state=provisioned');
		}
	}
};

module.exports = {
	appName: 'Audience Studio',
	body_class: 'slds-brand-band slds-brand-band_medium',
	consumer_rights_management,
	einstein_segmentation,
	data_capture_sources,
	manage_segments,
	new_asset,
	overview,
	segments
};
