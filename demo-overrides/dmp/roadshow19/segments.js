const {
	today,
	firstOfMonth,
	firstOfLastMonth,
	lastOfLastMonth,
	todayTerse,
	twoWeeksAgoTerse,
	oneMonthAgoTerse
} = require('../../dates');

const baseSegments = [
	{
		title: '<img src="/images/logo-noname.svg" height=10 /> High Value Customers',
		subTitle: 'Standard Segment / ID: <b>rsdqtbhe8</b> <img src="/images/icons/sort.svg" />',
		devices: '6.3M',
		audience: '1.7M',
		modified: 'August 06, 2018',
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	},
	{
		title: 'Abandon Cart High Value',
		subTitle: 'Transaction Segment / ID: <b>rsdqtbya</b>',
		devices: '9.3M',
		audience: '2.1M',
		modified: 'Mar 13, 2018',
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Gender'
	},
	{
		title: 'Clicked on Ad did not convert',
		subTitle: 'Standard Segment / ID: <b>rsdqtah9w</b>',
		devices: '45.3M',
		audience: '14.2M',
		modified: 'Mar 9, 2018',
		type: 'Target',
		category: 'Behavioral',
		subCategory: 'Attributes'
	},
	{
		title: 'Shoe Club customer and Purchase last 90 days',
		subTitle: 'Composite Segment / ID: <b>rsdqtbasi</b>',
		devices: '57.89M',
		audience: '19.2M',
		modified: 'Feb 27, 2018',
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Age'
	},
	{
		title: 'Existing Customers > 3 years',
		subTitle: 'Composite Segment / ID: <b>q825z87v4</b>',
		devices: '14.3M',
		audience: '4.9M',
		modified: 'Feb 16, 2018',
		type: 'Clusters',
		category: 'Behavioral',
		subCategory: 'Age'
	},
	{
		title: 'New Customers <1 Year',
		subTitle: 'Composite Segment / ID: <b>q825z9cxy</b>',
		devices: '7.8M',
		audience: '2.3M',
		modified: 'Jan 30, 2018',
		type: 'Clusters',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	},
	{
		title: 'Prospects that have seen media',
		subTitle: 'Composite Segment / ID: <b>q825zbzj</b>',
		devices: '588K',
		audience: '212K',
		modified: 'Dec 30, 2017',
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Loyalty'
	}
];

const highValueSegment = [
	{
		title: '<img src="/images/logo-noname.svg" height=10 /> Camping and tents explorers',
		subTitle: 'Standard Segment / ID: <b>rsdqtbhe8</b> <img src="/images/icons/sort.svg" />',
		devices: '13.8M',
		audience: '2.8M',
		modified: today,
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	}
];


const lookalikes = {
	cpm: '$1.20',
	tableData: {
		rows: [
			{
				reach: '500,234', similarity: '100%'
			},
			{
				reach: '4,944,629', similarity: '98%'
			},
			{
				reach: '7,265,488', similarity: '96%'
			},
			{
				reach: '9,172,952', similarity: '94%'
			},
			{
				reach: '10,890,862', similarity: '92%'
			},
			{
				reach: '30,323,212', similarity: '90%'
			},
			{
				reach: '70,223,384', similarity: '88%'
			}
		],
		labels: ['Reach', 'Similarity']
	}
};

const controls = [
	{
		type: 'button',
		text: 'New Segment',
		variant: 'brand',
		iconPath: '/icons/utility-sprite/svg/symbols.svg#add',
		onClick: `navigatePage('/segments/manage-segments/rules')`,
		id: 'new-segment'
	},
	{
		type: 'button',
		iconPath: '/icons/utility-sprite/svg/symbols.svg#download',
		title: 'Download'
	},
	{
		type: 'button',
		iconPath: '/icons/utility-sprite/svg/symbols.svg#multi_select_checkbox',
		title: 'Check'
	}
];

module.exports = {
	states: {
		initial: {
			segments: [...baseSegments],
			lookalikes,
			controls
		},
		addHighValue: {
			segments: [...highValueSegment, ...baseSegments],
			lookalikes,
			controls
		}
	}
};
