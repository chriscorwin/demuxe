
const segments = require('./segments');
const lookalike = require('./lookalike');

module.exports = {
	appName: 'Audience Studio',
	body_class: 'slds-brand-band slds-brand-band_medium',
	segments,
	lookalike,
	header: {
		favorites: false,
		global_actions: false,
		help: true,
		setup: true,
		notifications: true,
		avatar: `/images/sally-avatar.svg`
	}
};
