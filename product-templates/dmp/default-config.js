module.exports = {
	account_name: 'NTO',
	appName: 'Salesforce DMP',
	body_class: 'slds-brand-band slds-brand-band_medium',
	navData: {
		accountNavItems: [],
		navItems: [ {
				label: 'Overview',
				href: `/overview`,
				isActive: (activePage) => activePage === 'overview'
			},
			{
				label: 'Segments',
				id: 'segments-global-nav-link',
				href: '/segments/manage-segments/',
				isActive: (activePage) => activePage === 'segments'
			},
			{
				label: 'Insights',
				id: 'insights-global-nav-link',
				href: `/insights/einstein-segmentation`,
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
				isActive: (activePage) => activePage === 'manage',
				dropdownItems: [
					[ {
							separator: true,
							label: 'Capture'
						},
						{
							label: 'Consumer Rights',
							href: `/consumer-rights-management`,
							id: 'consumer-rights-tab-link'
						},
						{
							label: 'Data Capture Sources',
							href: '/manage/data-capture/sources',
							id: 'data-capture-sources-tab-link'
						},
						{
							label: 'Manage Attributes'
						},
						{
							label: 'Attributes Report'
						},
						{
							label: 'Events'
						},
						{
							label: 'Sites'
						},
						{
							label: 'Context Terms'
						},
						{
							label: 'Onboarding'
						},
						{
							label: 'Upload & Export Tool'
						},
						{
							label: 'User Match'
						},
						{
							label: 'File Based Data Capture'
						}
					],
					[ {
							separator: true,
							label: 'Super Tag'
						},
						{
							label: 'Supertags'
						},
						{
							label: 'Supertag Rules'
						},
						{
							label: 'Library Tags'
						}
					],
					[ {
							separator: true,
							label: 'Diagnostics'
						},
						{
							label: 'Deleted Segments'
						},
						{
							label: 'Data Sentry IRIS'
						},
						{
							label: 'Tag Summary'
						},
						{
							label: 'Tag Inspector'
						},
						{
							label: 'Site Speed'
						},
						{
							label: 'Control Tag Helper'
						}
					]
				]
			},
			{
				label: 'Data Studio',
				id: 'data-studio',
				href: `/data-studio/audience-discovery`,
				isActive: (activePage) => activePage === 'audience-discovery' || activePage === 'data-studio',
				dropdownItems: [
					[ {
							separator: true,
							label: 'Discover'
						},
						{
							label: 'Audience Discovery',
							href: `/data-studio/audience-discovery`,
							id: 'audience-discovery-tab-link'
						},
						{
							label: 'Manage Orders'
						},
						{
							label: 'Cart'
						},
						{
							label: 'Settings'
						}
					],
					[ {
							separator: true,
							label: 'Provision'
						},
						{
							label: 'Manage Assets'
						},
						{
							label: 'Manage Licenses'
						},
						{
							label: 'Manage Orders'
						},
						{
							label: 'Manage License Templates'
						},
						{
							label: 'Settings'
						}
					],
					[ {
							separator: true,
							label: 'Reports'
						},
						{
							label: 'Seller Revenue Report'
						}
					]
				]
			}
		]
	}
};