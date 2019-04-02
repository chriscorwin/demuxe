const consumer_rights_management = require('../df18keynote/consumer-rights-management');
const data_capture_sources = require('../df18keynote/data-capture-sources');
const einstein_segmentation = require('./einstein-segmentation');
const overview = require('./overview');
const manage_segments = require('../df18keynote/manage-segments');
const segments = require('../df18keynote/segments');

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

const highValueSegment = [
	{
		title: '<img src="/images/logo-noname.svg" height=10 /> Camping and tents explorers',
		subTitle: 'Standard Segment / ID: <b>rsdqtbhe8</b> <img src="/images/icons/sort.svg" />',
		devices: '13.8M',
		audience: '2.8M',
		modified: overview.dates.today,
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	}
];

segments.states.addHighValue.segments = [...highValueSegment, ...segments.states.initial.segments];

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
