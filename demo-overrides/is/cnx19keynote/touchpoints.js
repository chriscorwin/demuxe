const E = 'e', N = 'n', S = 's', W = 'w';

const web = {
	awareness: {
		label: 'awareness',
		discs: [
			{ audience: 'all', state: 'active', r: 32.55 },
			{ audience: 'helped', state: 'active', r: 19.4 },
			{ audience: 'all', state: 'inactive', r: 22 }
		],
		flows: [
			{ type: 'in', width: 10 },
			{ type: 'off', width: 8 },
			{ type: 'forward', path: [[E, 1.2]], width: 4},
			{ type: 'forward', path: [[E, .5], [N, .5], [E, 1], [S, .5], [E, .5]], width: 3},
			{ type: 'forward', path: [[E, .5], [S, 2], [E, .5]], width: 3},
			{ type: 'forward', path: [[E, .5], [S, 4], [E, .5]], width: 1},
			{ type: 'forward', path: [[E, .5], [S, 3.5], [E, 1], [S, .5], [E, .5]], width: 1}
		]
	},
	research: {
		discs: [
			{ audience: 'all', state: 'active', r: 21 },
			{ audience: 'all', state: 'inactive', r: 20 }
		] ,
		flows: [
			{ type: 'in', width: 1 },
			{ type: 'off', width: 6 },
			{ type: 'forward', path: [[E, 1.2]], width: 2},
			{ type: 'backward', path: [[E, .5], [S, .5], [W, 2], [N, .5], [E, .5]], width: 3},
			{ type: 'forward', path: [[E, .5], [S, 4], [E, .5]], width: 1}
		]
	},
	purchase: {
		flows: [
			{ type: 'in', width: 1 },
			{ type: 'off', width: 6 },
			{ type: 'backward', path: [[E, .5], [S, .5], [W, 3], [N, .5], [E, .5]], width: 3},
			{ type: 'backward', path: [[E, .5], [S, .5], [W, 2], [N, .5], [E, .5]], width: 1},
			{ type: 'backward', path: [[E, .5], [S, .5], [W, 2], [S, 3.5], [E, .5]], width: 1}
		]
	},
	inRole: {
		discs: [
			{ audience: 'all', state: 'active', r: 21 }
		],
		flows: [
		]
	}
}

const mobile = {
	awareness: {
		flows: [
			{ type: 'in', width: 3 },
			{ type: 'off', width: 6 }
		]
	}
};
const community = {
	research: {
		discs: [
			{ audience: 'all', state: 'active', r: 22 },
			{ audience: 'helped', state: 'active', r: 19 },
			{ audience: 'all', state: 'inactive', r: 19 }
		],
		flows: [
			{ type: 'in', width: 3 },
			{ type: 'off', width: 6 },
			{ type: 'backward', path: [[E, .5], [N, .5], [W, 2], [N, 1.5], [E, .5]], width: 2 },
			{ type: 'backward', path: [[W, .5], [N, 2], [E, .5]], width: 1 },
			{ type: 'forward', path: [[E, .5], [S, 2], [W, .5]], width: 1 },
			{ type: 'forward', path: [[E, .5], [N, 2], [W, .5]], width: 1 },
			{ type: 'forward', path: [[E, .5], [N, 2], [E, .5]], width: 1 },
			{ type: 'backward', path: [[W, .5], [N, 1.5], [E, 2], [N, .5], [W, .5]], width: 1 }
		]
	}
};
const kiosk = {};
const store = {
	research: {
		discs: [
			{ audience: 'all', state: 'active', r: 18 }
		],
		flows: [
			{ type: 'in', width: 3 },
			{ type: 'off', width: 6 },
			{ type: 'forward', path: [[E, 1.2]], width: 1},
			{ type: 'forward', path: [[E, .5], [N, 4], [W, .5]], width: 1 },
			{ type: 'backward', path: [[E, .5], [N, .5], [W, 2], [N, 3.5], [E, .5]], width: 1 }
		]
	},
	purchase: {
		discs: [
			{ audience: 'all', state: 'inactive', r: 19 }
		],
		flows: [
			{ type: 'in', width: 3 },
			{ type: 'off', width: 6 },
			{ type: 'backward', path: [[E, .5], [N, .5], [W, 3], [N, 3.5], [E, .5]], width: 1 },
			{ type: 'backward', path: [[E, .5], [S, .5], [W, 2], [N, .5], [E, .5]], width: 1 },
			{ type: 'backward', path: [[E, .5], [N, .5], [W, 2], [N, 1.5], [E, .5]], width: 1 },
			{ type: 'backward', path: [[W, .5], [N, 4], [E, .5]], width: 1 }
		]
	}
};

const points = [
	[web.awareness, web.research, web.purchase, {}, {}, web.inRole],
	[{}, {}, {}],
	[{}, community.research, {}],
	[{}, store.research, store.purchase]
];

module.exports = {
	states: {
		initial: {
			points,
			stages: [
				{
					label: 'Awareness',
				},
				{
					label: 'Search',
				},
				{
					label: 'Application',
				},
				{
					label: 'Consideration',
				},
				{
					label: 'Decision',
				},
				{
					label: 'In R&nbsp;&nbsp;&nbsp;&nbsp;',
				}
			]
		}
	}
}