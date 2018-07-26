

console.log('demoMagickFlowDirectoryName', demoMagickFlowDirectoryName);

let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

window.location.hash = `#${clicks}`;


const $ss = document.querySelector( '#screenshot' );
const $contentWrapper = document.querySelector( '#content-wrapper' );


const slides = [ {

} ]

// if ( typeof clicks ===)

$ss.onclick = ( ) => {
	// 30 is the last one
	if ( clicks > 30 ) {
		return;
	}
	// nextPage();
	clicks++;

	window.location.hash = `#${clicks}`;

	$ss.src = `/images/${demoMagickFlowDirectoryName}/${clicks}.svg`;

	console.log( `url.searchParams.get('account')`, url.searchParams.get( 'account' ) );

	if ( clicks <= 12 ) {
		accountName = `Northern Trail Outfitters - Elecronics`;
	}

	if ( clicks == 12 ) {
		console.log( 'hi, we are at 12, trying to auto-click' );
		var twelveTimer = window.setTimeout( ( ) => {
			// window.location = '/201.html?version=201&account=nto-apparel#13';
			document.querySelector( '#screenshot' )
				.src = `/images/${demoMagickFlowDirectoryName}/13.svg`;
		}, 4000 );
	}
	if ( clicks >= 13 ) {

		clearTimeout( twelveTimer );
		accountName = `Northern Trail Outfitters - Apparel`;
	}
	navData.accountName = accountName

	document.querySelector( '#primaryNav' )
		.innerHTML = makePrimaryNav( navData );

};

$ss.src = `/images/${demoMagickFlowDirectoryName}/${clicks}.svg`;

function locationHashChanged( ) {
	// console.group(`[locationHashChanged]: ${window.location.hash}`);
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	if ( clicks >= 13 ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}
	// console.log( 'clicks', clicks );
	$ss.src = `/images/${demoMagickFlowDirectoryName}/${clicks}.svg`;
	// console.groupEnd();

	console.log('clicks >= 4', clicks >= 4);
	console.log('clicks <= 6', clicks <= 6);
	if ( clicks >= 4 && clicks  <= 6 ) {
		console.log('mask it!');
		$contentWrapper.classList.add("mask-the-global-header");
	} else {
		$contentWrapper.classList.remove("mask-the-global-header");
	}


}

window.onhashchange = locationHashChanged;

locationHashChanged();