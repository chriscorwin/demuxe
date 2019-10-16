const E = 'e', N = 'n', S = 's', W = 'w';

const web = {
	awareness: {
		label: 'awareness',
		discs: [
			{ audience: 'all', state: 'active', r: 25 },
			{ audience: 'all', state: 'inactive', r: 20 }
		],
		flows: [
			{ type: 'in', width: 8 },
			{ type: 'off', width: 6 },
			{ type: 'forward', path: [[E, 1.2]], width: 4},
			{ type: 'forward', path: [[E, .5], [S, 1], [E, .5]], width: 8},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 4},
		]
	},
	search: {
		discs: [
			{ audience: 'all', state: 'active', r: 25 },
			{ audience: 'all', state: 'inactive', r: 20 }
		] ,
		flows: [
			{ type: 'in', width: 15 },
			{ type: 'off', width: 7 },
			{ type: 'forward', path: [[E, 1.2]], width: 4},
			{ type: 'forward', path: [[E, .5], [S, 1], [E, .5]], width: 8},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 2},
		]
	},
	application: {
		discs: [
			{ audience: 'all', state: 'active', r: 25 }
		],
		flows: [
			{ type: 'in', width: 8 },
			{ type: 'off', width: 6 },
			{ type: 'forward', path: [[E, 3.2]], width: 2},
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
		],
		flows: [
			{ type: 'in', width: 8 },
			{ type: 'off', width: 7 },
			{ type: 'forward', path: [[E, 1.2]], width: 9},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 2},
			{ type: 'backward', path: [[W, .5], [N, .5], [E, 3], [N, .5], [W, .5]], width: 2},
		]
	},
	search: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 },
			{ audience: 'all', state: 'inactive', r: 20 }
		],
		flows: [
			{ type: 'in', width: 6 },
			{ type: 'off', width: 7 },
			{ type: 'forward', path: [[E, 1.2]], width: 4},
			{ type: 'forward', path: [[E, .5], [S, 2], [E, .5]], width: 2},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 2},
		]
	},
	application: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 },
			{ audience: 'all', state: 'inactive', r: 20 }
		],
		flows: [
			{ type: 'in', width: 2 },
			{ type: 'off', width: 4 },
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
			{ type: 'off', width: 2 },
			{ type: 'forward', path: [[E, .5], [S, 1], [E, .5]], width: 8},
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
			{ type: 'off', width: 2 },
			{ type: 'forward', path: [[E, 1.2]], width: 2},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 2},
		]
	},
	consideration: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 }
		],
		flows: [
			{ type: 'off', width: 2 },
			{ type: 'forward', path: [[E, 1.2]], width: 2},
			{ type: 'backward', path: [[W, .5], [S, .5], [E, 2], [N, .5], [W, .5]], width: 2},
		]
	},
	decision: {
		discs: [
			{ audience: 'all', state: 'active', r: 20 }
		],
		flows: [
			{ type: 'off', width: 1 },
		]
	}
};


module.exports = {
	states: {
		initial: {
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
					label: 'In Role',
				}
			],
			channels: [
				{
					icon: '<span class="row-label-part row-icon one-glyphicon-lg one-glyphicon-laptop"></span>',
					label: 'Web',
					points: [web.awareness, web.search, web.application, {}, {}, web.inRole]
				},
				{
					icon: '<label class="journeys-label row-label row-label-centered"><span class="row-label-part row-icon one-glyphicon-lg one-glyphicon-mobile"></span>',
					label: 'Mobile',
					points: [mobile.awareness, mobile.search, mobile.application]
				},
				{
					icon: '<span class="row-label-part row-icon one-glyphicon-lg one-glyphicon-social"></span>',
					label: 'Social',
					points: [{}, social.search, {}]
				},
				{
					icon: '<span class="row-label-part row-icon one-glyphicon-lg one-glyphicon-physical"></span>',
					label: 'Physical',
					points: [{}, {}, store.application, store.consideration, store.decision]
				}
			]
		}
	}
}