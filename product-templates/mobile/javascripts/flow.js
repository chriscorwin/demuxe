console.log(`/product-templates/dmp/javascripts/flow.js running`);

const magickFlowConfig = locals.demoMagickFlows[demoMagickFlowDirectoryName];

// let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
// let clicks = parseInt( locals.sanitizedQueryParams.screen ) || 0;

console.log(`locals.sanitizedQueryParams.screen: `, locals.sanitizedQueryParams.screen);


window.location.hash = `#${clicks}`;

const $ss = document.querySelector(`.screenshot.auto-replace[data-slide="${clicks}"]`);
const $contentWrapper = document.querySelector( '#content-wrapper' );

$contentWrapper.onclick = ( ) => {
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
	}
	window.location.hash = `#${clicks}`;
	// window.location.search = `screen=${clicks}`;
};


function locationHashChanged( ) {
	console.log(`clicks: `, clicks);
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	console.log(`clicks >= magickFlowConfig.numberOfScreens: `, clicks >= magickFlowConfig.numberOfScreens);
	// window.location.search = `screen=${clicks}`;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}
	console.log(`clicks: `, clicks);
	console.log("`/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}: ", `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`);
	// $ss.src = `/magick-flows/${demoMagickFlowDirectoryName}/${magickFlowConfig.screens[clicks]}`;




	for (var item of document.querySelectorAll(`[data-slide]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;


			console.log(`item.dataset.slide: `, item.dataset.slide);
			console.log(`parseInt(item.dataset.slide) === clicks: `, parseInt(item.dataset.slide) === clicks);

			if (parseInt(item.dataset.slide) !== clicks) {
				window.setTimeout(() => {
					document.querySelector(`#${itemId}`).classList.add('slds-transition-hide');
					// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				}, 1);
				window.setTimeout(() => {
					document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
					// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
					// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				}, 250);
				window.setTimeout(() => {
					// document.querySelector(`#${itemId}`).classList.add('slds-transition-hide');
					// document.querySelector(`#${itemId}`).classList.add('slds-transition-show');
					// document.querySelector(`#${itemId}`).classList.add('slds-hide');
				}, 251);
			} else {
				window.setTimeout(() => {
					document.querySelector(`#${itemId}`).classList.remove('slds-transition-hide');
					document.querySelector(`#${itemId}`).classList.add('slds-transition-show');
				}, 1);
				window.setTimeout(() => {
					// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				}, 2);
				window.setTimeout(() => {
					// document.querySelector(`#${itemId}`).classList.remove('slds-transition-hide');
					// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				}, 3);
				
			}
			// window.setTimeout(() => {
			// 	document.querySelector(`#${itemId}`).classList.remove('slds-transition-hide');
			// }, 4200);
		}
		// item.classList.add('slds-hide');
	}
	

	console.log(`clicks: `, clicks);
}

console.log(`clicks: `, clicks);
window.onhashchange = locationHashChanged;
console.log(`clicks: `, clicks);
locationHashChanged();
console.log(`clicks: `, clicks);



function offset(el) {
	let rect = el.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

console.log(`
// example use
let slideImaged = document.getElementById('screenshot--slide-0');
let elementOffset = offset(slideImaged);
console.log(elementOffset.left, elementOffset.top);	
`);
