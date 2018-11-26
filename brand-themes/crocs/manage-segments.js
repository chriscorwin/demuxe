module.exports = {
	details_and_activation: {
		activate_by_default: true,
		activations: [
			'<span class="text">Send to Site</span>',
			'<span class="text">AdRoll</span>',
			'<img src="/images/slices/activation-tiles/activation-tile.aol.svg" />',
			'<span class="text">BlueKai</span>',
			'<img src="/images/slices/activation-tiles/activation-tile.dataxu.svg" />',
			'<img src="/images/slices/activation-tiles/activation-tile.youtube.svg" />',
			'<img src="/images/slices/activation-tiles/activation-tile.double-click.svg" />',
			'<img src="/images/slices/activation-tiles/activation-tile.sfmc.svg" />',
			'<img src="/images/slices/activation-tiles/activation-tile.media-math.svg" />',
			'<span class="text">MoPub</span>',
			'<img src="/images/slices/activation-tiles/activation-tile.app-nexus.svg" />',
			'<img src="/images/slices/activation-tiles/activation-tile.wordpress.svg" />',
			'<span class="text">RocketFuel</span>',
			'<span class="text">SAS Institute</span>',
			'<img src="/images/slices/activation-tiles/activation-tile.commerce-cloud.svg" />'
		],
		save_action: () => {
			window.location = `/segments/manage-segments?trigger=successToast`
		},
		segment_description: '',
		segment_name: 'High Value Customers Lookalikes'
	}
};