const {
	today,
	firstOfMonth,
	firstOfLastMonth,
	lastOfLastMonth,
	aboutOneMonthAgo,
	aboutTwoMonthsAgo,
	aboutThreeMonthsAgo,
	aboutFourMonthsAgo,
	todayTerse,
	twoWeeksAgoTerse,
	oneMonthAgoTerse,
	DATES,
	FORMATS
} = require('../../../engine/javascripts/dates');

const baseSegments = [
	{
		title: 'Family Prospect Targets',
		subTitle: 'Standard Segment / ID: <b>rsdqtbhe8</b> <img src="/images/icons/sort.svg" />',
		subTitleBadges: [{ text: 'Daily Refresh', icon: { placement: 'left', src: '/icons/action-sprite/svg/symbols.svg#refresh' }}],
		devices: '6.3M',
		audience: '5M',
		audienceFill: 80,
		modified: aboutOneMonthAgo,
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	},
	{
		title: 'Sport Magazine Subscribers',
		titleBadges: [{ text: 'Base' }],
		subTitle: 'Standard Segment / ID: <b>rsdqtbya</b>',
		subTitleBadges: [{ text: 'Monthly Refresh', icon: { placement: 'left', src: '/icons/action-sprite/svg/symbols.svg#refresh' }}],
		devices: '9.3M',
		audience: '2.1M',
		audienceFill: 50,
		modified: aboutTwoMonthsAgo,
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Gender'
	},
	{
		title: 'NBA Followers',
		subTitle: 'Standard Segment / ID: <b>rsdqtah9w</b>',
		devices: '45.3M',
		audience: '14.2M',
		audienceFill: 20,
		modified: aboutThreeMonthsAgo,
		type: 'Target',
		category: 'Behavioral',
		subCategory: 'Attributes'
	},
	{
		title: 'Shoe Club customer and Purchase last 90 days',
		subTitle: 'Composite Segment / ID: <b>rsdqtbasi</b>',
		devices: '57.89M',
		audience: '19.2M',
		audienceFill: 10,
		modified: aboutFourMonthsAgo,
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Age'
	},
	{
		title: 'Existing Customers > 3 years',
		subTitle: 'Composite Segment / ID: <b>q825z87v4</b>',
		devices: '14.3M',
		audience: '4.9M',
		audienceFill: 0,
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
		audienceFill: 50,
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
		audienceFill: 40,
		modified: 'Dec 30, 2017',
		type: 'Demographic',
		category: 'Demographic',
		subCategory: 'Loyalty'
	}
];

const lookalikeSegment = [
	{
		title: 'Family Prospect Targets - Lookalike',
		titleBadges: [{ text: 'Base', icon: { placement: 'left', src: '/icons/action-sprite/svg/symbols.svg#preview' }}],
		subTitle: 'Standard Segment / ID: <b>rsdqtba67</b> <img src="/images/icons/sort.svg" />',
		subTitleBadges: [{ text: 'Daily Refresh', icon: { placement: 'left', src: '/icons/action-sprite/svg/symbols.svg#refresh' }}],
		devices: '2.7M',
		audience: '1.2M',
		audienceFill: 44,
		modified: today,
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	}
];


const controls = [
	{
		type: 'button',
		text: 'Enable Reach Protection',
		onClick: `navigatePage('/segments/manage-segments/rules')`,
		id: 'enable-reach-protection'
	},
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
	}
];

module.exports = {
	states: {
		initial: {
			segments: [...baseSegments],
			controls
		},
		addLookalike: {
			segments: [...lookalikeSegment, ...baseSegments],
			controls
		}
	}
};
