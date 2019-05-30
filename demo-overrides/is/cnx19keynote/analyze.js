module.exports = {
	states: {
		initial: {
			stages: [
				{
					label: 'Awareness',
					discs: [{ type: 'active', r: 100 }, { type: 'active', r: 26 }, { type: 'inactive', r: 62 }],
					arcs: [
						{ direction: 'forward', width: 19.31, span: 1 }, 
						{ direction: 'forward', width: 16.85, span: 2 },
						{ direction: 'forward', width: 12.31, span: 3 }, 
						{ direction: 'forward', width: 9.85, span: 4 },
						{ direction: 'forward', width: 6.31, span: 5 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 20 }, { type: 'off', width: 15 }]
				},
				{
					label: 'Research',
					discs: [{ type: 'active', r: 47 }, { type: 'active', r: 28 }, { type: 'inactive', r: 36 }, {type: 'inactive', r: 23}],
					arcs: [
						{ direction: 'forward', width: 19.31, span: 1 }, 
						{ direction: 'forward', width: 16.85, span: 2 },
						{ direction: 'forward', width: 12.31, span: 3 }, 
						{ direction: 'forward', width: 9.85, span: 4 },
						{ direction: 'backward', width: 19.31, span: 1 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 4 }, { type: 'off', width: 5 }]
				},
				{
					label: 'Purchase',
					discs: [{ type: 'active', r: 90 }, { type: 'active', r: 100 }, { type: 'inactive', r: 50 }, {type: 'inactive', r: 25}],
					arcs: [
						{ direction: 'forward', width: 19.31, span: 1 }, 
						{ direction: 'forward', width: 16.85, span: 2 },
						{ direction: 'forward', width: 12.31, span: 3 },
						{ direction: 'backward', width: 19.31, span: 1 }, 
						{ direction: 'backward', width: 16.85, span: 2 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 12 }, { type: 'off', width: 25 }]
				},
				{
					label: 'Service',
					discs: [{ type: 'active', r: 40 }, { type: 'active', r: 50 }, { type: 'inactive', r: 70 }, {type: 'inactive', r: 10}],
					arcs: [
						{ direction: 'forward', width: 19.31, span: 1 }, 
						{ direction: 'forward', width: 16.85, span: 2 },
						{ direction: 'backward', width: 19.31, span: 1 }, 
						{ direction: 'backward', width: 16.85, span: 2 },
						{ direction: 'backward', width: 12.31, span: 3 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 25 }, { type: 'off', width: 12 }]
				},
				{
					label: 'Advocate',
					discs: [{ type: 'active', r: 100 }, { type: 'active', r: 30 }, { type: 'inactive', r: 40 }, {type: 'inactive', r: 15}],
					arcs: [
						{ direction: 'forward', width: 19.31, span: 1 },
						{ direction: 'backward', width: 19.31, span: 1 }, 
						{ direction: 'backward', width: 16.85, span: 2 },
						{ direction: 'backward', width: 12.31, span: 3 }, 
						{ direction: 'backward', width: 9.85, span: 4 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 4 }, { type: 'off', width: 5 }]
				},
				{
					label: 'Use',
					discs: [{ type: 'active', r: 70 }, { type: 'active', r: 50 }, { type: 'inactive', r: 90 }, {type: 'inactive', r: 50}],
					arcs: [
						{ direction: 'backward', width: 19.31, span: 1 }, 
						{ direction: 'backward', width: 16.85, span: 2 },
						{ direction: 'backward', width: 12.31, span: 3 }, 
						{ direction: 'backward', width: 9.85, span: 4 },
						{ direction: 'backward', width: 6.31, span: 5 }
					],
					joinAndLeaveFlows: [{ type: 'in', width: 2 }, { type: 'off', width: 5 }]
				}
			]
		}
	}
}