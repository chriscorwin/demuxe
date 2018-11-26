module.exports = {
	actions: [
		{ 
			onclick: '/segments/manage-segments/details-and-activation',
			text: 'Create a new segment using this persona'
		}
	],
	personas_graph_data: {
		nodes: [
			{
				id: 'p1',
				rank: 1,
				value: 'Persona 01',
				devices: 821334,
				cpm: 1.75,
				r: 70,
				attributes: [
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
				]
			},
			{
				id: 'p2',
				rank: 2,
				value: 'Persona 04',
				devices: 54395,
				cpm: 1.52,
				r: 40,
				attributes: [
					{ party: 2, main: 'Memberships: Netflix', cmp: true },
					{ party: 3, main: 'TV Shows: Family Guy', cmp: true }
				]
			},
			{
				id: 'p3',
				rank: 3,
				value: 'Persona 02',
				devices: 267942,
				cpm: 2.81,
				r: 40,
				attributes: [
					{
						party: 1,
						main: 'Category: Mens',
						stats: 'Frequency: 1  ・Recency < 7 days'
					},
					{
						party: 1,
						main: 'Housing/New Homeowners',
						stats: 'Frequency: 1  ・Recency < 120 days'
					},
					{ party: 2, main: 'Memberships: Netflix', cmp: true },
					{ party: 3, main: 'TV Shows: Family Guy', cmp: true },
					{ party: 3, main: 'NTO Product Activity: Climbing' }
				]
			},
			{
				id: 'p4',
				rank: 4,
				value: 'Persona 03',
				devices: 95437,
				cpm: 1.02,
				r: 30,
				attributes: [
					{
						party: 1,
						main: 'Category: Womens',
						stats: 'Frequency: 1  ・Recency < 7 days'
					},
					{ party: 3, main: 'New Parents' }
				]
			},
			{
				id: 'p5',
				rank: 5,
				value: 'Persona 05',
				devices: 591308,
				cpm: 3.69,
				r: 20,
				attributes: [
					{
						party: 1,
						main: 'Category: Womens',
						stats: 'Frequency: 1  ・Recency < 7 days'
					},
					{
						party: 1,
						main: 'Housing/New Homeowners',
						stats: 'Frequency: 1  ・Recency < 120 days'
					},
					{ party: 2, main: 'Memberships: Netflix', cmp: true },
					{ party: 3, main: 'TV Shows: Family Guy', cmp: true },
					{ party: 3, main: 'New Parents' },
					{ party: 3, main: 'NTO Product Activity: Climbing' }
				]
			}
		],
		links: [
			{ source: 'p1', target: 'p4', overlap: 13 },
			{ source: 'p1', target: 'p5', overlap: 18 },
			{ source: 'p5', target: 'p2', overlap: 25 },
			{ source: 'p5', target: 'p3', overlap: 13 },
			{ source: 'p4', target: 'p2', overlap: 18 },
			{ source: 'p4', target: 'p3', overlap: 15 },
			{ source: 'p3', target: 'p2', overlap: 13 }
		]
	},
	sub_header_text: 'Analysis Summary as of Sep 27, 2018 11:00 AM UTC'
};