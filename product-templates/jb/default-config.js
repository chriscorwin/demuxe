module.exports = {
	account_name: 'NTO',
	appName: 'Journey Builder',
	body_class: 'slds-brand-band slds-brand-band_medium',
	navData: {
		accountNavItems: [],
		navItems: [ {
				label: 'Journeys',
				id: 'journeys-tab',
				href: '/',
				isActive: (activePage) => activePage === 'index'
			},
			{
				label: 'Entry Sources',
				href: '',
				isActive: (activePage) => activePage === 'entry-sources'
			},
			{
				label: 'History',
				href: '',
				isActive: (activePage) => activePage === 'history'
			},
			{
				label: 'Templates',
				href: '',
				isActive: (activePage) => activePage === 'templates'
			}
		]
	}
};