module.exports = {
	account_name: 'NTO',
	appName: 'Interaction Studio',
	body_class: 'slds-brand-band slds-brand-band_medium',
	header: {
		favorites: false,
		global_actions: false,
		help: true,
		setup: true,
		notifications: false,
		avatar: `/images/icons/Identity.svg`
	},
	navData: {
		accountNavItems: [],
		navItems: [
			{
				label: 'Welcome',
				href: '/',
				isActive: (activePage) => activePage === 'welcome',
			},
			{
				label: 'Collect',
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'collect'
			},
			{
				label: 'Analyze',
				id: 'analyze-global-nav-link',
				href: '/analyze',
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'analyze'
			},
			{
				label: 'Orchestrate',
				id: 'orchestrate-global-nav-link',
				lookLikeDropdown: true,
				href: ``,
				isActive: (activePage) => activePage === 'orchestrate'
			},
			{
				label: 'Test & Publish',
				id: 'test-and-publish',
				href: `/test-and-publish`,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'test-and-publish'
			},
			{
				label: 'Configure',
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'configure'
			}
		]
	}
};
