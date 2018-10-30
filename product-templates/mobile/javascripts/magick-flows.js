const magickFlowConfig = locals.magickFlows[demoMagickFlowDirectoryName];
const drawerContentChangingClasses = 'section payment confirmation';

let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

console.log(`[clicks:] `, clicks);

if ( clicks >= magickFlowConfig.numberOfScreens ) {
	clicks = 0;
}

let nextClick = clicks + 1;
if ( nextClick >= magickFlowConfig.numberOfScreens ) {
	nextClick = 0
}

let previousClick = clicks - 1;
if ( previousClick <= 0 ) {
	previousClick = magickFlowConfig.numberOfScreens
}

window.location.hash = `#${clicks}`;

const $ss = document.querySelector(`.screenshot.auto-replace[data-slide="${clicks}"]`);
const $contentWrapper = document.querySelector( '#content-wrapper' );


$contentWrapper.onclick = ( ) => {
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = magickFlowConfig.numberOfScreens - 1;
	}
	window.location.hash = `#${clicks}`;
};


function normalTransition (thisStepNumber = 0, doAppTransition = false) {
	console.log(`[ product-templates/mobile/javascripts/magick-flows.js:37 ] : normalTransition() running...`);

	let nextStepNumber = thisStepNumber + 1;


	if (document.querySelector('.container') !== null) {
		// document.querySelector('.container').dataset.next = `magick-flows--slide-${nextStepNumber}`;
		document.querySelector('.container').dataset.next = `magick-flows--slide-${nextClick}`;
		document.querySelector('.container').dataset.previous = `magick-flows--slide-${previousClick}`;
	}

	console.log(`thisStepNumber: `, thisStepNumber);
	

	if (document.querySelector(`.drawer`) !== null) {
		document.querySelector(`.drawer`).classList.remove(drawerContentChangingClasses + ',slide-in');
	}

	if (document.querySelector(`.app-switcher-two`) !== null) {
		document.querySelector(`.app-switcher-two`).classList.remove(`show`);
	}

	const $appSwitcherOne = document.querySelector(`.app-switcher-one`);

	const appSwitcherClassNames = getAppSwitcherClassNames();
	$appSwitcherOne.classList.remove(...appSwitcherClassNames);
	if (doAppTransition === true) {

		$appSwitcherOne.classList.remove('hide');
		$appSwitcherOne.classList.add(`shrink`, `rounded-corners`, `slide-left-${thisStepNumber}`);
		$appSwitcherOne.classList.remove(`be-left-${thisStepNumber}`);
		setTimeout(() => {
			$appSwitcherOne.classList.remove('shrink');
			
			setTimeout(() => {
				$appSwitcherOne.classList.remove('rounded-corners');
			}, 401);
		}, 401);

	} else {
		$appSwitcherOne.classList.remove('hide,shrink,rounded-corners');
		$appSwitcherOne.classList.remove('hide');
		$appSwitcherOne.classList.add(`be-left-${thisStepNumber}`);
	}
	console.groupEnd();
}



function getAppSwitcherClassNames () {
	let out = [];
	for (step = 0; step < magickFlowConfig.numberOfScreens; step++) {
		out.push(`slide-left-${step}`);
		out.push(`be-left-${step}`);
	}
	return out;
}



function locationHashChanged(event) {

	console.group(`[ /product-templates/mobile/javascripts/magick-flows.js:89 ] : locationHashChanged() running...`);
	console.log(`window.location.hash (before manipulation): `, window.location.hash);

	console.log(`event.oldURL: `, event.oldURL);
	console.log(`event.newURL: `, event.newURL);
	// Scroll the window up, because the user could have scrolled down and then hit "back" and normally a demo runner will want to load every screen in its fresh, unscrolled, state.
	window.scroll(0,0);

	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}

	// theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x=OH HI THERE";

	nextClick = clicks + 1;
	if ( nextClick >= magickFlowConfig.numberOfScreens ) {
		nextClick = 0
	}

	previousClick = clicks - 1;
	console.log(`previousClick: `, previousClick);
	if ( previousClick < 0 ) {
		previousClick = magickFlowConfig.numberOfScreens - 1
	}
	if ( previousClick > magickFlowConfig.numberOfScreens ) {
		previousClick = 0
	}



	console.log(`clicks: `, clicks);
	console.log(`previousClick: `, previousClick);
	console.log(`nextClick: `, nextClick);




	document.querySelectorAll( '.slds-scrollable')[nextClick].scroll(0,0);
	document.querySelectorAll( '.slds-scrollable')[clicks].scroll(0,0);
	document.querySelectorAll( '.slds-scrollable')[previousClick].scroll(0,0);



	let doAppTransition = false;
	let doNotifcation = false;


	console.log(`[ SPLATS ]magickFlowConfig.metaData2[clicks]: `, magickFlowConfig.metaData2[clicks]);
	console.log(`[ SPLATS ]magickFlowConfig.metaData2[clicks].data: `, magickFlowConfig.metaData2[clicks].data);

	


	let directionOfNavigation = 'forward';
	let oldUrlHash = parseInt( event.oldURL.split('#')[event.oldURL.split('#').length - 1] ) || 0;
	let newUrlHash = parseInt( event.newURL.split('#')[event.newURL.split('#').length - 1] ) || 0;
	if (newUrlHash <= oldUrlHash) {
		directionOfNavigation = 'back';
	}

	let stepToEvaluateForAppTransition = directionOfNavigation === 'forward' ? newUrlHash : oldUrlHash;

	if ( magickFlowConfig.metaData2[stepToEvaluateForAppTransition].data !== undefined && magickFlowConfig.metaData2[stepToEvaluateForAppTransition].data[0] === 'use-slide-transition' && magickFlowConfig.metaData2[stepToEvaluateForAppTransition].data[1] === 'slide-transition_app-switch' ) {
		doAppTransition = true;
	}

	normalTransition(clicks, doAppTransition);

	for (var item of document.querySelectorAll(`[data-slide]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;
			// console.log(`item.dataset.slide: `, item.dataset.slide);




			if (parseInt(item.dataset.slide) == clicks) {

				const thisMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[clicks]}`;
				// console.log(`thisMagickFlowScreenshotUrl: `, thisMagickFlowScreenshotUrl);
				const nextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[nextClick]}`;
				// console.log(`nextMagickFlowScreenshotUrl: `, nextMagickFlowScreenshotUrl);
				const previousMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[previousClick]}`;
				// console.log(`previousMagickFlowScreenshotUrl: `, previousMagickFlowScreenshotUrl);


				const isPng = thisMagickFlowScreenshotUrl.endsWith('.png');
				const isSvg = thisMagickFlowScreenshotUrl.endsWith('.svg');
				const isMp4 = thisMagickFlowScreenshotUrl.endsWith('.mp4');
				const isGif = thisMagickFlowScreenshotUrl.endsWith('.gif');
				const isJpeg = thisMagickFlowScreenshotUrl.endsWith('.jpg');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-next');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.add('slds-is-active');
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				// document.querySelector(`#${itemId}`).classList.add('slds-transition-show');


				// if(isGif) {
				// 	const theScreenshot = document.querySelector(`#magick-flows--slide-${clicks} .auto-replace`);
				// 	console.log(`item img: `, theScreenshot.src);
				// 	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();
				// }


				// if(isGif) {
				// 	window.setTimeout(() => {
				// 			console.log(`isGif: `, isGif);
				// 			const theScreenshot = document.querySelector(`#magick-flows--slide-${clicks} .auto-replace`);
				// 			console.log(`item img: `, theScreenshot.src);
				// 			theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();
				// 	}, 4000);
				// }

				// document.querySelector(`#magick-flows--slide-${nextClick}`).classList.add('slds-transition-show');



				// window.setTimeout(() => {
				// }, 2);

			} else if ( parseInt(item.dataset.slide) == nextClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
				document.querySelector(`#${itemId}`).classList.add('slds-is-next');
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			} else if ( parseInt(item.dataset.slide) == previousClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.add('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
			} else {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-next');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
			}
		}
	}

	console.groupEnd();
}

//let this snippet run before your hashchange event binding code
if(!window.HashChangeEvent)(function(){
	var lastURL=document.URL;
	window.addEventListener("hashchange",function(event){
		Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
		Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
		lastURL=document.URL;
	});
}());

window.onhashchange = locationHashChanged;
document.ontouchstart = function() {
	const theScreenshot = document.querySelector(`#magick-flows--slide-${nextClick} .auto-replace`);
	// console.log(`item img: `, theScreenshot.src);
	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();
}

// console.group(`[ /product-templates/mobile/javascripts/magick-flows.js:217 ] : locationHashChanged() will run`);
// locationHashChanged();

// console.groupEnd();



window.setTimeout(() => {
	window.location.hash = `#${clicks}`;
	window.location.hash = ``;

}, (150));

window.setTimeout(() => {
	document.querySelector(`#content-wrapper`).classList.add('slds-transition-show');
	document.querySelector(`#content-wrapper`).classList.remove('slds-transition-hide');
}, (500));

window.setTimeout(() => {
	document.querySelector(`#content-wrapper`).classList.remove('slds-transition-show');
	document.querySelector(`#content`).classList.remove('fake-the-dock');
	document.querySelector(`.preload-images`).classList.add('slds-transition-hide');
}, (1000));




document.onkeyup = function(e) {
  if (e.which == 72) {
    console.log("H key was pressed, going home.");
    window.location.hash = `#0`;

  } else if (e.which == 39) {
    console.log("Right arrow key was pressed, go to next...");
    window.location.hash = `#${nextClick}`;
  } else if (e.which == 37) {
    console.log("Left arrow key was pressed, go to previous...");
    window.location.hash = `#${previousClick}`;
  } else if (e.which == 71) {
    console.log("GIF...");
	const theScreenshot = document.querySelector(`#magick-flows--slide-${clicks} .auto-replace`);
	console.log(`item img: `, theScreenshot.src);
	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();

  } else if (e.ctrlKey && e.altKey && e.which == 89) {
    alert("Ctrl + Alt + Y shortcut combination was pressed");
  } else if (e.ctrlKey && e.altKey && e.shiftKey && e.which == 85) {
    alert("Ctrl + Alt + Shift + U shortcut combination was pressed");
  }
};