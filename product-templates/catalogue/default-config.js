const demosGroupsConfigPath = require("path").join(__dirname, "demo_groups");
const demoGroups = [];

require("fs").readdirSync(demosGroupsConfigPath).forEach(function(file) {
	const config = require(`./demo_groups/${file}`);

	demoGroups.push(config);
});


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
