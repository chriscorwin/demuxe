console.group(`
============================================================
Demuxe: Running \`config/available-demos-banners.js\` now...
------------------------------------------------------------
`);

const addAvailableDemoBannerImages = (configData) => {
	// Gather config data for all available demos.
	const demosBannersImagesPath = require("path").join(__dirname, "../product-templates/catalogue/images");

	
	let availableDemoBannerImages = [];

	require("fs").readdirSync(demosBannersImagesPath).forEach(function(file) {
		if (file.match('all___')) {
			availableDemoBannerImages.push(file);
		}
	});

	configData.availableDemoBannerImages = availableDemoBannerImages;

	return configData;
}

module.exports = addAvailableDemoBannerImages;

console.log(`...end: \`config/available-demos-banners.js\`
------------------------------------------------------------`);
console.groupEnd();