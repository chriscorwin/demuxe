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
				reach: '2,879,152', similarity: '78%'
			},
			{
				reach: '3,283,156', similarity: '72%'
			},
			{
				reach: '4,283,180', similarity: '65%'
			},
			{
				reach: '4,721,100', similarity: '60%'
			},
			{
				reach: '4,803,480', similarity: '58%'
			},
			{
				reach: '5,087,930', similarity: '52%'
			},
			{
				reach: '6,237,498', similarity: '50%'
			},
			{
				reach: '7,283,180', similarity: '47%'
			},
			{
				reach: '8,293,582', similarity: '40%'
			},
			{
				reach: '10,874,201', similarity: '37%'
			},
			{
				reach: '11,453,000', similarity: '34%'
			}
		],
		labels: ['Similarity', 'Reach']
	}
};

const xStart = 18;
const yStart = 98;
const xMultiplier = 2; // Change this number to cause an adjustment to numbers at bottom of graph
const xEnd = 5001;
const yEnd = 1;
let P = -.4;
let F = 60;
let G = 0;
let x = xStart;
let y = yStart;

let switched = false;
let lookalikesData = [];
const numPoints = 26;

for (let i = 0; i < numPoints; i++) {
	if (!switched && y < 45) {
		P = -P;
		switched = true;
	}

	F = F + P;
	G = G - P;

	x = x + (F * xMultiplier);
	y = y - G;

	// x <->, y ^-v, z: radius
	lookalikesData.push({
		x: Math.round(x.toFixed(2) * 1),
		y: Math.round(y.toFixed(2) * 1),
		z: 77,
		color: '#7CB5EC'
	});
};

module.exports = {
	segment: {
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
	lookalikes,
	lookalikesData
};
