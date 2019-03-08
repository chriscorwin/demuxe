module.exports = {
	account_name: 'NTO',
	appName: 'Engine',
	body_class: 'slds-brand-band slds-brand-band_medium',
	navData: {
		accountNavItems: [],
		navItems: [ {
				label: 'Overview',
				href: `/`,
				isActive: (activePage) => activePage === 'index'
			},
			{
				label: 'Segments',
				id: 'segments-global-nav-link',
				href: '/segments/manage-segments/',
				isActive: (activePage) => activePage === 'segments'
			},
			{
				label: 'Insights',
				ID: 'insights-global-nav-link',
				href: ``,
				isActive: (activePage) => activePage === 'insights',
				dropdownItems: [
					[ {
							separator: true,
							label: 'Insights'
						},
						{
							label: 'Einstein Segmentation',
							href: `/insights/einstein-segmentation`,
							id: 'einstein-segmentation-link'
						},
						{
							label: 'Top Overlapping Segments'
						},
						{
							label: 'Data Providers'
						},
						{
							label: 'Funnels'
						},
						{
							label: 'Frequency Reports'
						},
						{
							label: 'Campaign Attribution'
						},
						{
							label: 'Attribution'
						},
						{
							label: 'Custom Index Tool'
						},
						{
							label: 'Einstein Journey Insights',
							href: `/insights/journey-insights`,
							id: 'journey-insights-link'
						}
					],
					[ {
							separator: true,
							label: 'Reporting Center'
						},
						{
							label: 'Manage Reports'
						},
						{
							label: 'View Reports'
						}
					],
					[ {
							separator: true,
							label: 'Content Engagement'
						},
						{
							label: 'Audience Analytics'
						},
						{
							label: 'Engagement'
						},
						{
							label: 'Loyalty'
						},
						{
							label: 'Social Activity'
						},
						{
							label: 'Search Keywords'
						},
						{
							label: 'First Party User Match'
						}
					]
				]
			},
			{
				label: 'Activation',
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'activation'
			},
			{
				label: 'Manage',
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'manage',
				dropdownItems: []
			},
			{
				label: 'Data Studio',
				id: 'data-studio',
				href: `/data-studio/audience-discovery`,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'audience-discovery' || activePage === 'data-studio'
			}
		]
	}
};
