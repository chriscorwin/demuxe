const {
	today,
	firstOfMonth,
	firstOfLastMonth,
	lastOfLastMonth,
	todayTerse,
	twoWeeksAgoTerse,
	oneMonthAgoTerse
} = require('../../../engine/javascripts/dates');

module.exports = {
	panels: {
		audience_population: {
			title: 'Audience Population',
			tabs: [
				{ label: `This Month (${firstOfMonth} &mdash; ${today})` },
				{ label: `Last Month (${firstOfLastMonth} &mdash; ${lastOfLastMonth})` }
			]
		},
		activated_segments : {
			buttons: [
				{ label: 'Top 5' },
				{ label: 'By Impressions' },
				{ label: 'Last 30 days' }
			],
			column_headers: [
				'SEGMENTS',
				'IMPRESSIONS'
			],
			segments: [
				{label: 'Nature Lovers', number: '5.2M', width: 362},
				{label: 'Zoo and Parks Members', number: '4.7M', width: 308},
				{label: 'Camping & Hiking Enthusiasts', number: '4M', width: 290},
				{label: 'Animal Encounter Seekers', number: '3.7M', width: 270},
				{label: 'Corporate Customers - Offsite Excursions', number: '2.3M', width: 186}
			],
			title: 'Activated Segments',
			view_all: {
				text: 'View All Segments',
				href: 'javascript:void(0);'
			}
		},
		dce : {
			buttons: [
				{ label: 'Last 30 days' }
			],
			explanation: 'Displaying data collection events across 1st party data sources only.',
			graph: {
				date_labels: [
					oneMonthAgoTerse,
					twoWeeksAgoTerse,
					todayTerse
				],
				device_data: [
					450,
					490,
					490,
					590,
					590,
					610,
					660,
					730,
					660,
					655,
					650,
					730,
					740,
					739,
					780,
					830,
					890,
					920,
					910,
					880,
					890,
					880,
					860,
					840,
					820,
					860,
					880,
					890,
					920,
					910
				],
				// Do not replace `function formatter () {` with `() => {}` as that will change the context of `this`
				label_formatter: function formatter () {
					if (this.value === 400000) {
						return '0K';
					}
					if (this.value < 1000000) {
						return (this.value / 1000) + 'K';
					}
					return (this.value / 1000000) + 'M';
				},
				line_color: '#9961B4',
				title: 'Data Capture Events (DCE)'
			},
			title: 'Data Capture Events (DCE)',
			view_all: {
				text: 'View All Data Capture Events',
				href: 'javascript:void(0);'
			}
		},
		dcm : {
			buttons: [
				{ label: 'By Data Capture Events' },
				{ label: 'Last 30 days' }
			],
			graph: {
				methods: [
					{
						name: 'Web',
						y: 100,
						color: '#70ABEA'
					},
					{
						name: 'App',
						y: 85,
						color: '#EDBE32'
					},
					{
						name: 'Offline Files',
						y: 50,
						color: '#F2536D'
					},
					{
						name: 'Partners',
						y: 45,
						color: '#7DC37D'
					}
				]
			},
			title: 'Data Capture Sources',
			view_all_buttons: [
				{
					id: 'view-all-data-capture-sources',
					text: 'View All Data Capture Sources',
					href: 'javascript:void(0);',
					onclick: "navigatePage('/manage/data-capture/sources');"
				}
			]
		},
		marketer_campaigns: {
			buttons: [
				{ label: 'Top 5' },
				{ label: 'By Impressions' },
				{ label: 'Last 30 days' }
			],
			graph: {
				CAMPAIGN: 'campaign',
				spend_data: [
					{ x: 240, y: 2250, z: 77, name: 'Display', color: '#0857A6' },
					{ x: 370, y: 1400, z: 48, name: 'Email', color: '#5208A6' }, // Email on left
					{ x: 810, y: 870, z: 59, name: 'Mobile', color: '#197EE3' },
					{ x: 560, y: 1900, z: 27, name: 'Email', color: '#7719E3' }, // Email on right
					{ x: 990, y: 2250, z: 56, name: 'Video', color: '#C398F5' }
				],
				tooltip: '<div style="width: 70px;"><div style="background-color: {point.color};height: 10px; width: 10px;border-radius: 5px;float: left;margin: 10px 10px 10px 4px;"></div> {point.name}<br />{point.y}K</div>',
				x_axis: {
					// Do not replace `function formatter () {` with `() => {}` as that will change the context of `this`
					formatter: function formatter () {
						if (this.value < 1000) {
							return this.value + 'K';
						}
						return (this.value / 1000) + 'M';
					},
					title: 'Impressions'
				},
				y_axis: {
					// Do not replace `function formatter () {` with `() => {}` as that will change the context of `this`
					formatter: function formatter () {
						if (this.value < 1000) {
							return this.value + 'K';
						}
						return (this.value / 1000) + 'M';
					},
					line_color: '#E6EBF5',
					title: 'Spend ($)'
				}
			},
			title: 'Marketer Campaigns',
			view_all: {
				text: 'View All Marketer Campaigns',
				href: 'javascript:void(0);'
			}
		},
		activation_partners : {
			buttons: [
				{ label: 'Top 5' },
				{ label: 'By Devices Sent' },
				{ label: today }
			],
			table_rows: [
				{partner: 'ACTIVATION PARTNERS', type: 'REFRESH TYPE', sent: 'DEVICES SENT'},
				{partner: '<img src="/images/logos/logo-google-ads.svg" />', type: 'Full', sent: '5M'},
				{partner: '<img src="/images/logos/sf.svg" />', type: 'Full', sent: '3.1M'},
				{partner: '<img src="/images/logos/appnexus.svg" />', type: 'Incremental', sent: '2.8M'},
				{partner: '<img src="/images/logos/youtube.svg" />', type: 'Incremental', sent: '2.5M'},
				{partner: '<img src="/images/logos/pinterest.svg" />', type: 'Full', sent: '1.8M'}
			],
			title: 'Activation Partners',
			view_all: {
				text: 'View All Activation Partners',
				href: 'javascript:void(0);'
			}
		}
	}
};
