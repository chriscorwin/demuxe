module.exports = {
	states: {
		initial: {
			stages: [
				{
					label: 'Awareness',
					discs: [{ type: 'active', r: 90 }, { type: 'inactive', r: 62 }],
					arcs: [
						{ direction: 'forward', width: 16, span: 1 },
						{ direction: 'forward', width: 6, span: 2 },
						{ direction: 'forward', width: 4, span: 3 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 15 }, { type: 'off', width: 10 }]
				},
				{
					label: 'Search',
					discs: [{ type: 'active', r: 47 }, { type: 'inactive', r: 36 }, {type: 'inactive', r: 23}],
					arcs: [
						{ direction: 'forward', width: 14, span: 1 },
						{ direction: 'forward', width: 3, span: 2 },
						{ direction: 'backward', width: 9, span: 1 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 13 }, { type: 'off', width: 9 }]
				},
				{
					label: 'Application',
					discs: [{ type: 'active', r: 50 }, {type: 'inactive', r: 40}],
					arcs: [
						{ direction: 'forward', width: 4, span: 1 },
						{ direction: 'forward', width: 2, span: 2 },
						{ direction: 'backward', width: 4, span: 1 },
						{ direction: 'backward', width: 7, span: 2 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 5 }, { type: 'off', width: 5 }]
				},
				{
					label: 'Consideration',
					discs: [{ type: 'active', r: 35 }, {type: 'inactive', r: 30}],
					arcs: [
						{ direction: 'forward', width: 4, span: 1 },
						{ direction: 'forward', width: 2, span: 2 },
						{ direction: 'backward', width: 3, span: 1 },
						{ direction: 'backward', width: 2, span: 3 }
					],
					joinAndLeaveFlows: []
				},
				{
					label: 'Decision',
					discs: [{ type: 'active', r: 30 }, {type: 'inactive', r: 25}],
					arcs: [
						{ direction: 'forward', width: 4, span: 1 },
						{ direction: 'backward', width: 2, span: 1 },
						{ direction: 'backward', width: 2, span: 3 }
					],
					joinAndLeaveFlows: []
				},
				{
					label: 'In Role',
					discs: [{ type: 'active', r: 30 }, {type: 'inactive', r: 20}],
					arcs: [
						{ direction: 'backward', width: 2, span: 3 }
					],
					joinAndLeaveFlows: []
				}
			]
		}
	}
}