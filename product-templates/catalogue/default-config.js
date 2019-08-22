const demosGroupsConfigPath = require("path").join(__dirname, "demo_groupings");
let demoGroups = [];

require("fs").readdirSync(demosGroupsConfigPath).forEach(function(file) {
	//only  pull in .json files
	if (!file.match(/json$/)) return;

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
	appName: 'Prototype Catalogue',
	body_class: 'slds-brand-band slds-brand-band_medium',
	header: {
		favorites: { disabled: true },
		global_actions: false,
		help: false,
		setup: false,
		notifications: false,
		search: true,
		hideSubheader: true,
		// avatar: `/images/icons/Identity.svg`
	},
	navData: {
		accountNavItems: [],
		navItems: [
			{
				label: 'Overview',
				href: `/`,
				isActive: (activePage) => activePage === 'index'
			}
		]
	},
	demoGroups
};
