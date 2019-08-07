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

const lookalikes = {
	tableData: {
		rows: [
			{
				reach: '2,879,152', similarity: '78'
			},
			{
				reach: '3,283,156', similarity: '72'
			},
			{
				reach: '4,283,180', similarity: '65'
			},
			{
				reach: '4,721,100', similarity: '60'
			},
			{
				reach: '4,803,480', similarity: '58'
			},
			{
				reach: '5,087,930', similarity: '52'
			},
			{
				reach: '6,237,498', similarity: '50'
			},
			{
				reach: '7,283,180', similarity: '47'
			},
			{
				reach: '8,293,582', similarity: '40'
			},
			{
				reach: '10,874,201', similarity: '37'
			},
			{
				reach: '11,453,000', similarity: '34'
			}
		],
		labels: ['Similarity', 'Reach']
	}
};


let lookalikesData = [
  { x: 193, y: 94, z: 77, color: '#7CB5EC' },
  { x: 249, y: 92, z: 77, color: '#7CB5EC' },
  { x: 390, y: 90, z: 77, color: '#7CB5EC' },
  { x: 536, y: 88, z: 77, color: '#7CB5EC' },
  { x: 624, y: 84, z: 77, color: '#7CB5EC' },
  { x: 736, y: 78, z: 77, color: '#7CB5EC' },
  { x: 872, y: 74, z: 77, color: '#7CB5EC' },
  { x: 989, y: 68, z: 77, color: '#7CB5EC' },
  { x: 1082, y: 65, z: 77, color: '#7CB5EC' },
  { x: 1137, y: 57, z: 77, color: '#7CB5EC' },
  { x: 1258, y: 55, z: 77, color: '#7CB5EC' },
  { x: 1335, y: 52, z: 77, color: '#7CB5EC' },
  { x: 1461, y: 48, z: 77, color: '#7CB5EC' },
  { x: 1608, y: 43, z: 77, color: '#7CB5EC' },
  { x: 1749, y: 37, z: 77, color: '#7CB5EC' },
  { x: 1823, y: 32, z: 77, color: '#7CB5EC' },
  { x: 1969, y: 29, z: 77, color: '#7CB5EC' },
  { x: 2102, y: 25, z: 77, color: '#7CB5EC' },
  { x: 2202, y: 21, z: 77, color: '#7CB5EC' },
  { x: 2269, y: 16, z: 77, color: '#7CB5EC' },
  { x: 2356, y: 14, z: 77, color: '#7CB5EC' },
  { x: 2463, y: 11, z: 77, color: '#7CB5EC' },
  { x: 2602, y: 9, z: 77, color: '#7CB5EC' },
  { x: 2670, y: 7, z: 77, color: '#7CB5EC' },
  { x: 2736, y: 2, z: 77, color: '#7CB5EC' },
  { x: 2840, y: -0, z: 77, color: '#7CB5EC' },
  { x: 5503, y: -94, z: 77, color: '#7CB5EC' }// Force the dots to only go half way across the graph
];




module.exports = {
	segment: {
		title: 'High Value Families',
		subTitle: 'Standard Segment / ID: <b>rsdqtbhe8</b> <img src="/images/icons/sort.svg" />',
		subTitleBadges: [{ text: 'Daily Refresh', icon: { placement: 'left', src: '/icons/action-sprite/svg/symbols.svg#refresh' }}],
		devices: '250k',
		audience: '54k',
		audienceFill: 80,
		modified: today,
		type: 'Standard',
		category: 'Behavioral',
		subCategory: 'Loyalty'
	},
	lookalikes,
	lookalikesData
};
