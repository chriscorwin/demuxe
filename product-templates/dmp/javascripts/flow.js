console.log(`/product-templates/dmp/javascripts/flow.js running`);

const magickFlowConfig = locals.magickFlows[demoMagickFlowDirectoryName];

let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

window.location.hash = `#${clicks}`;


const $ss = document.querySelector( '#screenshot' );
const $contentWrapper = document.querySelector( '#content-wrapper' );

$ss.onclick = ( ) => {
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
	}
	window.location.hash = `#${clicks}`;
};


function locationHashChanged( ) {
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}
	console.log("`/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}: ", `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`);
	$ss.src = `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`;
}

window.onhashchange = locationHashChanged;

locationHashChanged();