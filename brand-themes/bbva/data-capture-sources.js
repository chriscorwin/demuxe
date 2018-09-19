module.exports = {
	sub_header_text: "Date and time represented in the current browser's timezone (UTC -07:00)",
	dce: {
		graph: {
			date_labels: [
				'Sep 12',
				'Sep 13',
				'Sep 14',
				'Sep 15',
				'Sep 16',
				'Sep 17',
				'Sep 18',
				'Sep 19',
				'Sep 20',
				'Sep 21',
				'Sep 22',
				'Sep 23',
				'Sep 24',
				'Sep 25',
				'Today'
			],
			device_data: [
				[
					1.6,
					1.5,
					2.6,
					1.75,
					1.7,
					2.2,
					1.8,
					1.95,
					2.25,
					2.1,
					2.3,
					2.15,
					2.6,
					2.6,
					2.7
				],
				[
					.9,
					.65,
					1.15,
					.9,
					.65,
					1.7,
					.4,
					1.05,
					.95,
					1.25,
					1.6,
					1,
					1.85,
					1.3,
					1.55
				],
				[
					.6,
					.35,
					1,
					.4,
					.65,
					1.65,
					.35,
					1,
					.85,
					1.15,
					1.5,
					.95,
					1.70,
					1.2,
					1.45
				],[
					.55,
					.75,
					.6,
					.1,
					.6,
					1.3,
					.25,
					.85,
					.55,
					.75,
					1.3,
					1.25,
					1.35,
					1.7,
					1.35
				]
			],
			// Do not replace `function formatter () {` with `() => {}` as that will change the context of `this`
			label_formatter: function formatter () {
				if (this.value === 1) {
					return '10K';
				}else if (this.value === 2) {
					return '100K';
				}
				return '1M';
			},
			line_color: [
				'#73ACE8',
				'#EDBE32',
				'#EA78BB',
				'#B896FA'
			],
			title: 'Data Collection Events'
		},
	}
};