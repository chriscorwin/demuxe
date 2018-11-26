module.exports = {
	consent_distribution: [
		{label: 'Data Collection', width: 530},
		{label: 'Targeting', width: 430},
		{label: 'Analytics', width: 400},
		{label: 'Data Sharing', width: 415},
		{label: 'Data Provisioning', width: 240},
		{label: 'Re-Identification', width: 200}
	],
	consent_sources: [
		{
			name: 'Policy Regime Consent',
			y: 75,
			color: '#73ACE8'
		},
		{
			name: 'Backfill Consent',
			y: 10,
			color: '#FFD33F'
		},
		{
			name: '1st Party Consent',
			y: 10,
			color: '#F49E60'
		}
	],
	last_updated: 'Aug 12, 2018',
	subHeaderContents: `<div class="slds-grid">
						<div>Define your consent collection settings, as well as manage consent changes, raise data deletion and portability requests.</div>
						<div class="slds-col_bump-left">As of Sep 27, 2018</div>
					</div>`
};