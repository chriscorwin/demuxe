module.exports = {
	account_name: 'NTO',
	appName: 'Customer 360',
	body_class: 'slds-brand-band slds-brand-band_medium',
	header: {
		favorites: { disabled: true },
		global_actions: true,
		help: true,
		setup: true,
		notifications: true,
		search: true,
		hideSubheader: true,
		avatar: `/images/icons/Identity.svg`
	},
	navData: {
		accountNavItems: [],
		accountDropdown: '<svg style="width: 24px; height: 24px;" class="slds-icon slds-icon-text-default slds-m-horizontal_medium slds-m-top_xx-small" aria-hidden="true"><use xlink:href="/icons/utility-sprite/svg/symbols.svg#edit"></use></svg>',
		navItems: [ {
				label: 'Home',
				href: `/`,
				isActive: (activePage) => activePage === 'index'
			},
			{
				label: 'Segments',
				id: 'segments-global-nav-link',
				href: '/segments',
				isActive: (activePage) => activePage === 'segments'
			},
			{
				label: 'Insights',
				id: 'insights-global-nav-link',
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
				label: 'Activation Platforms',
				href: ``,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'activation'
			},
			{
				label: 'Data Streams',
				id: 'data-studio',
				href: `/data-studio/audience-discovery`,
				lookLikeDropdown: true,
				isActive: (activePage) => activePage === 'audience-discovery' || activePage === 'data-studio',
				dropdownItems: [
					[
						{ label: '+ New Data Stream'},
						{ label: 'Recent Streams', separator: true },
						{ label: 'Marketing Cloud (Email)...' },
						{ label: 'Marketing Cloud (Push)...' },
						{ label: 'Audience Studio Standa...' },
						{ label: 'Interaction Studio Stre...' },
					]
				]
			}
		]
	}
};
