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
					'5/13',
					'5/25',
					'6/13'
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
			title: 'Data Capture Methods',
		},
		marketer_campaigns : {
			title: 'Marketer Campaigns',
		},
		activation_partners : {
			title: 'Activation Partners',
		}
	}
}