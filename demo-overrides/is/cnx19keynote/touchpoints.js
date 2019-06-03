const E = 'e', N = 'n', S = 's', W = 'w';

const web = {
	awareness: {
		label: 'awareness',
		discs: [
			{ audience: 'all', state: 'active', r: 25 },
			{ audience: 'all', state: 'inactive', r: 20 }
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
	search: {
		discs: [
			{ audience: 'all', state: 'active', r: 25 },
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
	application: {
		discs: [
			{ audience: 'all', state: 'active', r: 25 }
		],
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
		label: 'awareness',
		discs: [
			{ audience: 'all', state: 'active', r: 25 },
			{ audience: 'all', state: 'inactive', r: 20 }
		]
	},
	search: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 },
			{ audience: 'all', state: 'inactive', r: 20 }
		]
	},
	application: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 },
			{ audience: 'all', state: 'inactive', r: 20 }
		]
	}
};
const social = {
	search: {
		discs: [
			{ audience: 'all', state: 'inactive', r: 18 }
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
	application: {
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
	},
	consideration: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 }
		]
	},
	decision: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 }
		]
	}
};

const points = [
	[web.awareness, web.search, web.application, {}, {}, web.inRole],
	[mobile.awareness, mobile.search, mobile.application],
	[{}, social.search, {}],
	[{}, {}, store.application, store.consideration, store.decision]
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