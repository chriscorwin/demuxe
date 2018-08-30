module.exports = {
	panels: {
		audience_population: {
			title: 'Audience Population',
			img: '/images/slices/index.audience-segments-population.svg',
			tabs: [
				{ label: 'This Month (Aug 1 &mdash; Aug 7, 2018)' },
				{ label: 'Last Month (Jul 1 &mdash; Jul 31, 2018)' }
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
				{label: '<img src="/images/icons/dollar.svg" /> Gold Customers_2018_High propensity shoppers', number: '5.2M', width: 362},
				{label: 'Loyal_Shoppers_2016-2017_potential target', number: '4.7M', width: 308},
				{label: '<img src="/images/icons/dollar.svg" /> Heavy spenders', number: '4M', width: 290},
				{label: 'Deals_clicks_converts_group_deal-shoppers_2018', number: '3.7M', width: 270},
				{label: 'Early_adopters', number: '2.3M', width: 186}
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
					'7/13',
					'7/27',
					'8/05'
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
					onclick: "navigatePage('/consumer-rights-management.html');"
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
				{ label: 'Aug 5, 2018' }
			],
			table_rows: [
				{partner: 'ACTIVATION PARTNERS', type: 'REFRESH TYPE', sent: 'DEVICES SENT'},
				{partner: '<img src="/images/logos/logo-dblclick-bm.svg" />', type: 'Full', sent: '9M'},
				{partner: '<img src="/images/logos/sf.svg" />', type: 'Full', sent: '8.75M'},
				{partner: '<img src="/images/logos/appnexus.svg" />', type: 'Incremental', sent: '7M'},
				{partner: '<img src="/images/logos/youtube.svg" />', type: 'Incremental', sent: '6.8M'},
				{partner: '<img src="/images/logos/pinterest.svg" />', type: 'Full', sent: '6M'}
			],
			title: 'Activation Partners',
			view_all: {
				text: 'View All Activation Partners',
				href: 'javascript:void(0);'
			}
		}
	}
};
