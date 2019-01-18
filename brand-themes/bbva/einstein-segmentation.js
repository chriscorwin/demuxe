const einstein_segmentation = require('../../demo-overrides/dmp/df18keynote/einstein-segmentation');

einstein_segmentation.personas_graph_data.nodes[0].attributes = [
	{
		party: 1,
		main: 'Category: Small Business',
		stats: 'Frequency: 1  ・Recency < 7 days'
	},
	{
		party: 1,
		main: 'bbva.com…/fixed-rate-mortgages',
		stats: 'Frequency: 20  ・Recency < 120 days'
	},
	{
		party: 1,
		main: 'BBVA Valora Active Users'
	},
	{
		party: 1,
		main: 'New Customers 2018'
	},
	{
		party: 1,
		main: 'Moms - HHI > $150K'
	}
];

module.exports = einstein_segmentation;