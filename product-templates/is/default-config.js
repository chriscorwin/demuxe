module.exports = {
	account_name: 'NTO',
	appName: 'Interaction Studio',
	body_class: 'slds-brand-band slds-brand-band_medium',
	navData: {
		accountNavItems: [],
		navItems: [ 
			{
				label: 'Welcome',
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
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'test_and_publish'
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
