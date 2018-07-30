const magickFlowConfig = locals.demoMagickFlows[demoMagickFlowDirectoryName];

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
	$ss.src = `/magick-flows/${demoMagickFlowDirectoryName}/${clicks}.svg`;
}

window.onhashchange = locationHashChanged;

locationHashChanged();