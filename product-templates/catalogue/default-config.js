const demosGroupsConfigPath = require("path").join(__dirname, "demo_groupings");
let demoGroups = [];

require("fs").readdirSync(demosGroupsConfigPath).forEach(function(file) {
	try {
		const config = require(`./demo_groupings/${file}`);

		demoGroups.push(config);
	} catch (e) {
		console.error('error pulling in demo groupings', e);
	}
});

// Todo: pull in dynDate branch to get MomentJS stuff to actually compare these as dates
demoGroups.sort((groupA, groupB) => groupA.date < groupB.date)

module.exports = {
	account_name: '',
	appName: 'Prototype Library',
	body_class: 'slds-brand-band slds-brand-band_medium',
	header: {
		favorites: { disabled: true },
		global_actions: false,
		help: false,
		setup: false,
		notifications: false,
		search: true,
		hideSubheader: false,
		// avatar: `/images/icons/Identity.svg`
	},
	navData: {
		accountNavItems: [],
		navItems: []
	},
	demoGroups
};
