console.log(`/product-templates/dmp/javascripts/flow.js running`);

const magickFlowConfig = locals.demoMagickFlows[demoMagickFlowDirectoryName];

// let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
let clicks = parseInt( locals.sanitizedQueryParams.screen ) || 0;

console.log(`locals.sanitizedQueryParams.screen: `, locals.sanitizedQueryParams.screen);


window.location.hash = `#${clicks}`;


const $ss = document.querySelector( '#screenshot' );
const $contentWrapper = document.querySelector( '#content-wrapper' );

$contentWrapper.onclick = ( ) => {
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
	}
	window.location.hash = `#${clicks}`;
	window.location.search = `screen=${clicks}`;
};


function locationHashChanged( ) {
	console.log(`clicks: `, clicks);
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	console.log(`clicks >= magickFlowConfig.numberOfScreens: `, clicks >= magickFlowConfig.numberOfScreens);
	window.location.search = `screen=${clicks}`;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}
	console.log(`clicks: `, clicks);
	console.log("`/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}: ", `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`);
	$ss.src = `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`;
	console.log(`clicks: `, clicks);
}

console.log(`clicks: `, clicks);
window.onhashchange = locationHashChanged;
console.log(`clicks: `, clicks);
locationHashChanged();
console.log(`clicks: `, clicks);
