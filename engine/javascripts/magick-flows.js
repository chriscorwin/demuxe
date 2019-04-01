const pathToIncludeForLogging = `engine/javascripts/magick-flows.js`;
const includeDebugInfoStart = `
============================================================
Demuxe: including ${pathToIncludeForLogging} now...
------------------------------------------------------------
`;
const includeDebugInfoEnd = `
...end ${pathToIncludeForLogging}
------------------------------------------------------------
`;
console.group(includeDebugInfoStart);
const magickFlowConfig = locals.magickFlows[demoMagickFlowDirectoryName];
const drawerContentChangingClasses = 'section payment confirmation';
const drawerDirectionOptions = ['top', 'bottom', 'right', 'left'];

let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
// window.location.hash = `#reset`;



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


String.prototype.toTitleCase = function() {
	return this.replace(/([\w&`'ÔÕ"Ò.@:\/\{\(\[<>_]+-? *)/g,
	function(match, p1, index, title) {
		if (index > 0 && title.charAt(index - 2) !== ":" && match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1) return match.toLowerCase();
		if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1) return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
		if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || title.substring(index - 1, index + 1).search(/[\])}]/) > -1) return match;
		return match.charAt(0).toUpperCase() + match.substr(1);
	});
};

$contentWrapper.onclick = ( ) => {
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = magickFlowConfig.numberOfScreens - 1;
	}

	// Now is the chance to run onBeforeHashChange stuff
	// In the future, we may wish to catch that it should change and do stuff first.
	// For now, we just do it.
	let hashChangeTiming = 0;
	// console.log("It was clicked, we will change the hash in four seconds...");
	setTimeout(() => {
		window.location.hash = `#${clicks}`;
	}, hashChangeTiming);

};


function normalTransition (thisStepNumber = 0, doAppTransition = false, delayTransition = 0) {
	console.group(`[Magick Flows: normalTransition() ](${pathToIncludeForLogging}:50) running...`);

	let nextStepNumber = thisStepNumber + 1;


	if (document.querySelector('.container') !== null) {
		// document.querySelector('.container').dataset.next = `magick-flows--slide-${nextStepNumber}`;
		document.querySelector('.container').dataset.next = `magick-flows--slide-${nextClick}`;
		document.querySelector('.container').dataset.previous = `magick-flows--slide-${previousClick}`;
	}

	console.log(`[Magick Flows: normalTransition() ] thisStepNumber: `, thisStepNumber);
	

	// if (document.querySelector(`.drawer`) !== null) {
	// 	document.querySelector(`.drawer`).classList.remove(drawerContentChangingClasses.split(' ').join(',') + ',slide-in');
	// }


	if (document.querySelector(`.app-switcher-two`) !== null) {
		document.querySelector(`.app-switcher-two`).classList.remove(`show`);
	}

	const $appSwitcherOne = document.querySelector(`.app-switcher-one`);

	const appSwitcherClassNames = getAppSwitcherClassNames();
	// $appSwitcherOne.classList.remove(...appSwitcherClassNames);

	if (doAppTransition === true) {

		$appSwitcherOne.classList.remove(...appSwitcherClassNames);

		$appSwitcherOne.classList.add(`shrink`, `rounded-corners`, `slide-left-${thisStepNumber}`);
		$appSwitcherOne.classList.remove(`be-left-${thisStepNumber}`);
		setTimeout(() => {
			$appSwitcherOne.classList.remove('shrink');
			
			setTimeout(() => {
				$appSwitcherOne.classList.remove('rounded-corners');
				$appSwitcherOne.classList.remove(`slide-left-${thisStepNumber}`);
				$appSwitcherOne.classList.add(`be-left-${thisStepNumber}`);
			}, 401);
		}, 401);

	} else {

		setTimeout(() => {
			$appSwitcherOne.classList.remove(...appSwitcherClassNames);

			$appSwitcherOne.classList.remove('shrink,rounded-corners');
			$appSwitcherOne.classList.add(`be-left-${thisStepNumber}`);
		}, delayTransition);


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
	console.group(`[ locationHashChanged() ](${pathToIncludeForLogging}:122)  running...`);
	console.log(`window.location.hash (before manipulation): `, window.location.hash);
	console.log(`event.oldURL: `, event.oldURL);
	console.log(`event.newURL: `, event.newURL);

	// get the non-string version of the hash -- that is the number of clicks so far
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

	// if the number of clicks is greater than our number of screens, we override that and set that thing back to zero
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}

	// figure out which things come next and which things are backwards -- because it's a _loop_ we have to do some maths here
	nextClick = clicks + 1;
	if ( nextClick >= magickFlowConfig.numberOfScreens ) {
		nextClick = 0
	}
	previousClick = clicks - 1;

	if ( previousClick < 0 ) {
		previousClick = magickFlowConfig.numberOfScreens - 1
	}
	if ( previousClick > magickFlowConfig.numberOfScreens ) {
		previousClick = 0
	}



	console.log(`clicks: `, clicks);
	console.log(`previousClick: `, previousClick);
	console.log(`nextClick: `, nextClick);



	

	// Scroll the window, and scrollable areas, up, because the user could have scrolled down and then hit "back" and normally a demo runner will want to load every screen in its fresh, unscrolled, state.
	// this may eventaully prove problematic, and may have to be re-thought, or, over-ridable, at least.
	window.scroll(0,0);
	document.querySelectorAll( '.slds-scrollable')[nextClick].scroll(0,0);
	document.querySelectorAll( '.slds-scrollable')[clicks].scroll(0,0);
	document.querySelectorAll( '.slds-scrollable')[previousClick].scroll(0,0);


	// we assume that we will not do an app transition nor show a notificaiton
	// eventually we'll assume we aren't showing a drawer, or sliding in a wizard, or anything else.
	let doAppTransition = false;
	let doAutoAdvanceTransition = false;

	let delayTransition = 0;
	let useSlideTransition = false;
	let doDrawer = false;
	let directionOfNavigation = 'forward';
	let oldUrlHash = parseInt( event.oldURL.split('#')[event.oldURL.split('#').length - 1] ) || 0;
	let newUrlHash = parseInt( event.newURL.split('#')[event.newURL.split('#').length - 1] ) || 0;
	if (newUrlHash <= oldUrlHash) {
		directionOfNavigation = 'back';
	}
	console.log(`directionOfNavigation: `, directionOfNavigation);

	let stepToEvaluateForAppTransition = directionOfNavigation === 'forward' ? newUrlHash : oldUrlHash;

	if ( magickFlowConfig.metaData[stepToEvaluateForAppTransition].data !== undefined && magickFlowConfig.metaData[stepToEvaluateForAppTransition].data[0] === 'use-slide-transition' && magickFlowConfig.metaData[stepToEvaluateForAppTransition].data[1] === 'slide-transition_app-switch' ) {
		doAppTransition = true;
	}


	if ( magickFlowConfig.metaData[stepToEvaluateForAppTransition].data !== undefined ) {
		useSlideTransition =  magickFlowConfig.metaData[stepToEvaluateForAppTransition].data.find(k => k=='use-slide-transition') === 'use-slide-transition';
		if ( useSlideTransition === true ) {
			let timing = 1000;

			if ( magickFlowConfig.metaData[stepToEvaluateForAppTransition].data.find(k => k=='slide-transition-timing--slow') === 'slide-transition-timing--slow') {
				timing = 5000;
			}
			if ( magickFlowConfig.metaData[stepToEvaluateForAppTransition].data.find(k => k=='slide-transition-timing--fast') === 'slide-transition-timing--fast') {
				timing = 500;
			}
			if (magickFlowConfig.metaData[stepToEvaluateForAppTransition].data[2] === 'slide-transition-timing--fast') {
			}
			doAutoAdvanceTransition = true;
			setTimeout(() => {
				window.location.hash = `#${stepToEvaluateForAppTransition + 1}`;
			}, timing);
			
		}
	}



	if (document.querySelector(`.drawer`) !== null) {

		drawerDirectionOptions.forEach(direction => {

			// Direction is just the direction, capitalied, so that the camelCase stuff is correct.
			const Direction = direction.charAt(0).toUpperCase() + direction.substring(1);

			// // First we will hide any previous screen's drawer.
			// if (document.querySelector(`.drawer-from-${direction}--slide-${previousClick}`) !== null) {
			// 	if ( magickFlowConfig.metaData[previousClick][`showDrawerFrom${Direction}`] === true ) {
			// 		document.querySelector(`.drawer-from-${direction}--slide-${previousClick}`).classList.remove('slide-in');
			// 		setTimeout(() => {
			// 			document.querySelector(`.drawer-from-${direction}--slide-${previousClick}`).classList.add('slds-hide');
			// 		}, 125);
			// 		delayTransition = 250;
			// 	}
			// }

			// Now we will show this screen's drawer, if it exists.
			if ( magickFlowConfig.metaData[clicks][`showDrawerFrom${Direction}`] === true ) {
				doDrawer = true;
				document.querySelector(`.drawer-from-${direction}--slide-${clicks}`).classList.remove('slds-hide');
				window.setTimeout(() => {
					document.querySelector(`.drawer-from-${direction}--slide-${clicks}`).classList.add('slide-in');
				}, 125);
			}

			// Finally, we will hide the _next_ screen's drawer, too -- this is in case we're going backwards.
			if (document.querySelector(`.drawer-from-${direction}--slide-${nextClick}`) !== null) {
				if ( magickFlowConfig.metaData[nextClick][`showDrawerFrom${Direction}`] === true ) {
					document.querySelector(`.drawer-from-${direction}--slide-${nextClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.drawer-from-${direction}--slide-${nextClick}`).classList.add('slds-hide');
					}, 250);
					setTimeout(() => {
					}, 0);
					delayTransition = 125;
				}
			}
		});
	}




	if (document.querySelector(`.ios-notification`) !== null) {

		// First we will hide any previous screen's ios-notification.
		if (document.querySelector(`.ios-notification--slide-${previousClick}`) !== null) {
			if ( magickFlowConfig.metaData[previousClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--slide-${previousClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.ios-notification--slide-${previousClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				delayTransition = 500;
			}
		}

		// Now we will show this screen's ios-notification, if it exists.
		if ( magickFlowConfig.metaData[clicks][`showIosNotification`] === true ) {
			doDrawer = true;
			document.querySelector(`.ios-notification--slide-${clicks}`).classList.remove('slds-hide');
			window.setTimeout(() => {
				document.querySelector(`.ios-notification--slide-${clicks}`).classList.add('slide-in');
			}, 250);
		}

		// Finally, we will hide the _next_ screen's ios-notification, too -- this is in case we're going backwards.
		if (document.querySelector(`.ios-notification--slide-${nextClick}`) !== null) {
			if ( magickFlowConfig.metaData[nextClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--slide-${nextClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.ios-notification--slide-${nextClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				delayTransition = 250;
			}
		}
		
	}


	// once we've sorted out _what_ sort of transition to affect, we trigger it
	normalTransition(clicks, doAppTransition, delayTransition);

	// depending upon data-slide seems okay, though i've always been worried it is too fragile, it seems to work well
	//  ¯\_(ツ)_/¯
	for (var item of document.querySelectorAll(`[data-slide]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;

			if (parseInt(item.dataset.slide) == clicks) {

				const thisMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[clicks]}`;
				const nextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[nextClick]}`;
				const theOneAfterNextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[nextClick + 1]}`;
				const previousMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[previousClick]}`;

				// this is where we wanna also sense .esj or even maybe .html and do _other_ stuff
				const isPng = thisMagickFlowScreenshotUrl.endsWith('.png');
				const isSvg = thisMagickFlowScreenshotUrl.endsWith('.svg');
				const isMp4 = thisMagickFlowScreenshotUrl.endsWith('.mp4');
				const isGif = thisMagickFlowScreenshotUrl.endsWith('.gif');
				const isJpeg = thisMagickFlowScreenshotUrl.endsWith('.jpg');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-next');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.add('slds-is-active');
				document.querySelector(`#${itemId}`).classList.remove('slds-hide');

			} else if ( parseInt(item.dataset.slide) == nextClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
				document.querySelector(`#${itemId}`).classList.add('slds-is-next');
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			} else if ( parseInt(item.dataset.slide) == nextClick + 1) {
				document.querySelector(`#${itemId}`).classList.add('slds-hide');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-next');
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			} else if ( parseInt(item.dataset.slide) == previousClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.add('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
			} else if ( parseInt(item.dataset.slide) == previousClick - 1) {
				document.querySelector(`#${itemId}`).classList.remove('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.add('slds-hide');
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			} else {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-next');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-previous');
				document.querySelector(`#${itemId}`).classList.remove('slds-is-active');
				document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			}
		}
	}

	console.group(`[ Speaker Notes ]`)
	console.log(`Current Step: `, clicks);
	console.log(`Sorter: `, magickFlowConfig.metaData[stepToEvaluateForAppTransition].sorter);
	console.log(`Step ID: `, magickFlowConfig.metaData[stepToEvaluateForAppTransition].id);
	if ( typeof magickFlowConfig.metaData[stepToEvaluateForAppTransition].notes !== 'undefined' ) {
		console.group(`Hints`)
		magickFlowConfig.metaData[stepToEvaluateForAppTransition].notes.forEach((note, noteIndex) => {
			note = note.replace(/-/g, ' ').toLowerCase();
			console.log(`${noteIndex}: ${note}`)
		});
		console.groupEnd();
		// console.log(`Notes: `, magickFlowConfig.metaData[stepToEvaluateForAppTransition].notes);
	}
	console.groupEnd();


	console.groupEnd();
}

// this gives our hash change event some history to poke at introspectively
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
	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();
}

// The very first time the URL for this Magick Flow is loaded in the browser we run a "reset" on it 
// Why? WE DON'T KNOW!! 
// ¯\_(ツ)_/¯ at some point this seemed very important, to overcome some bug, but I  reglected to write down what the goal was, and now, here we are.
window.setTimeout(() => {
	// window.location.hash = `#reset`;
	window.location.hash = `#${clicks}`;
}, (150));

// Give the whole thing a chance to cache some assets before presenting the UI. This only runs once per page load, not every click.
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
		console.log("H key was pressed, go to the first slide.");
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
		// these are here to remind us how to do combos, not cause we want these combos
		// alert("Ctrl + Alt + Y shortcut combination was pressed");
	} else if (e.ctrlKey && e.altKey && e.shiftKey && e.which == 85) {
		// these are here to remind us how to do combos, not cause we want these combos
		// alert("Ctrl + Alt + Shift + U shortcut combination was pressed");
  }
};

console.log(includeDebugInfoEnd);
console.groupEnd();

