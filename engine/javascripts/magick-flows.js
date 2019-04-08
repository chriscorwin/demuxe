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

const $ss = document.querySelector(`.magick-flows--step-content.auto-replace[data-step="${clicks}"]`);
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


function normalTransition (thisStepNumber = 0, doApplicationSwitchStepTransition = false, delayTransition = 0) {
	console.group(`[Magick Flows: normalTransition() ](${pathToIncludeForLogging}:50) running...`);

	let nextStepNumber = thisStepNumber + 1;

	console.log(`delayTransition: `, delayTransition);

	if (document.querySelector('.container') !== null) {
		// document.querySelector('.container').dataset.next = `magick-flows--step-${nextStepNumber}`;
		document.querySelector('.container').dataset.next = `magick-flows--step-${nextClick}`;
		document.querySelector('.container').dataset.previous = `magick-flows--step-${previousClick}`;
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

	if (doApplicationSwitchStepTransition === true) {

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
	console.group(`[ locationHashChanged() ](${pathToIncludeForLogging}:142)  running...`);
	console.log(`window.location.hash (before manipulation): `, window.location.hash);
	console.log(`event.oldURL: `, event.oldURL);
	console.log(`event.newURL: `, event.newURL);


	// let scrollTimeout = setTimeout(() => {
	// 	window.scroll(0,0);
	// 	document.querySelectorAll( '.slds-scrollable')[nextClick].scroll(0,0);
	// 	document.querySelectorAll( '.slds-scrollable')[clicks].scroll(0,0);
	// 	document.querySelectorAll( '.slds-scrollable')[previousClick].scroll(0,0);
	// }, 1500);
	// clearTimeout(scrollTimeout);

	// get the non-string version of the hash -- that is the number of clicks so far
	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

	// if the number of clicks is greater than our number of steps, we override that and set that thing back to zero
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



	

	// Scroll the window, and scrollable areas, up, because the user could have scrolled down and then hit "back" and normally a demo runner will want to load every step in its fresh, unscrolled, state.
	// this may eventaully prove problematic, and may have to be re-thought, or, over-ridable, at least.




	// we assume that we will not do an app transition nor show a notificaiton
	// eventually we'll assume we aren't showing a drawer, or sliding in a wizard, or anything else.
	let doApplicationSwitchStepTransition = false;
	let doAutoAdvanceStepTransition = false;

	let delayTransition = 0;
	let useStepTransition = false;
	let autoAdvanceTransitionTiming = 1000;
	let doDrawer = false;
	let directionOfNavigation = 'forward';
	let oldUrlHash = parseInt( event.oldURL.split('#')[event.oldURL.split('#').length - 1] ) || 0;
	let newUrlHash = parseInt( event.newURL.split('#')[event.newURL.split('#').length - 1] ) || 0;
	if (newUrlHash <= oldUrlHash) {
		directionOfNavigation = 'back';
	}
	console.log(`directionOfNavigation: `, directionOfNavigation);

	let stepToEvaluateForAppTransition = directionOfNavigation === 'forward' ? newUrlHash : oldUrlHash;
	let previousStepNumber = previousClick;
	let currentStepNumber = newUrlHash;
	let nextStepNumber = nextClick;

	const previousStepMetaData = magickFlowConfig.metaData[previousStepNumber].data || ['unset'];
	const currentStepMetaData = magickFlowConfig.metaData[currentStepNumber].data || ['unset'];
	const nextStepMetaData = magickFlowConfig.metaData[nextStepNumber].data || ['unset'];
	console.log(`currentStepMetaData: `, currentStepMetaData);
	console.log(`stepToEvaluateForAppTransition: `, stepToEvaluateForAppTransition);

	useStepTransition = currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition';
	doApplicationSwitchStepTransition = currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch';
	doAutoAdvanceStepTransition =  currentStepMetaData.find(k => k=='step-transition_auto-advance') === 'step-transition_auto-advance';


	if ( useStepTransition && currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch' ) {
		console.log(`currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition': `, currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition');
		console.log(`currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch': `, currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch');
		doApplicationSwitchStepTransition = true;
		console.log(`doApplicationSwitchStepTransition: `, doApplicationSwitchStepTransition);
	}



	

	if ( doAutoAdvanceStepTransition === true ) {
		console.log(`doAutoAdvanceStepTransition: `, doAutoAdvanceStepTransition);

		if ( currentStepMetaData.find(k => k=='step-transition-timing--slow') === 'step-transition-timing--slow') {
			autoAdvanceTransitionTiming = 5000;
		}
		if ( currentStepMetaData.find(k => k=='step-transition-timing--fast') === 'step-transition-timing--fast') {
			autoAdvanceTransitionTiming = 500;
		}

		let autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition;
		if ( directionOfNavigation === 'forward' ) {
			autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition + 1;
		} else {
			autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition - 1;
		}

		console.log(`stepToEvaluateForAppTransition: `, stepToEvaluateForAppTransition);
		setTimeout(() => {
			window.location.hash = `#${autoAdvanceTransitionStepNumber}`;
		}, autoAdvanceTransitionTiming);
		
	}


	let previousStepDrawersData = {};
	let currentStepDrawersData = {};
	let nextStepDrawersData = {};
	let drawerTimingOptions = ['instantly', 'on-arrival', 'on-leave', 'never'];
	let drawerVisibilityOptions = ['show', 'hide'];
	if (document.querySelector(`.magick-flows-drawer`) !== null) {



		drawerDirectionOptions.forEach(direction => {

			// Direction is just the direction, capitalied, so that the camelCase stuff is correct.
			const Direction = direction.charAt(0).toUpperCase() + direction.substring(1);
			previousStepDrawersData[direction] = previousStepDrawersData[direction] || [];
			currentStepDrawersData[direction] = currentStepDrawersData[direction] || [];
			nextStepDrawersData[direction] = nextStepDrawersData[direction] || [];

			drawerTimingOptions.forEach(timing => {
				drawerVisibilityOptions.forEach(visibility => {
					if ( previousStepMetaData.find(k => k==`${visibility}-drawer-from-${direction}--${timing}`) === `${visibility}-drawer-from-${direction}--${timing}`) {
						previousStepDrawersData[direction].push(`${visibility}-${timing}`);
					}
					if ( currentStepMetaData.find(k => k==`${visibility}-drawer-from-${direction}--${timing}`) === `${visibility}-drawer-from-${direction}--${timing}`) {
						currentStepDrawersData[direction].push(`${visibility}-${timing}`);
					}
					if ( nextStepMetaData.find(k => k==`${visibility}-drawer-from-${direction}--${timing}`) === `${visibility}-drawer-from-${direction}--${timing}`) {
						nextStepDrawersData[direction].push(`${visibility}-${timing}`);
					}
				});
			});







			// First we will hide any previous step's drawer.
			// console.log(`magickFlowConfig.metaData[clicks]: `, magickFlowConfig.metaData[clicks]);
			if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`) !== null) {
				if ( previousStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slide-in');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
					}, 125);
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
					}, 1500);
					console.log(`delayTransition: `, delayTransition);
					delayTransition = (delayTransition < 500 ? 500 : delayTransition);
				}
				if ( previousStepDrawersData[direction].find(k => k=='hide-never') === 'hide-never' ) {
					// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
					setTimeout(() => {
						// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
					}, 125);
					// console.log(`delayTransition: `, delayTransition);
					// delayTransition = (delayTransition < 250 ? 250 : delayTransition);
				}
			}


			if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`) !== null) {
				if ( currentStepDrawersData[direction].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
					}, 125);
					console.log(`delayTransition: `, delayTransition);
					delayTransition = (delayTransition < 250 ? 250 : delayTransition);
				}
				if ( currentStepDrawersData[direction].find(k => k=='show-instantly') === 'show-instantly' ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('be-in');
					// setTimeout(() => {
					// }, 125);
					// console.log(`delayTransition: `, delayTransition);
					delayTransition = 0;
				}
				// if ( currentStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
				// 	document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slide-in');
				// 	setTimeout(() => {
				// 		document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slds-hide');
				// 	}, 500);
				// 	delayTransition = 250;
				// }
			}

			// // Now we will show this step's drawer, if it exists.
			// if ( magickFlowConfig.metaData[clicks][`showDrawerFrom${Direction}`] === true ) {
			// 	document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${clicks}`).classList.remove('slds-hide');
			// 	window.setTimeout(() => {
			// 		document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${clicks}`).classList.add('slide-in');
			// 	}, 125);
			// }



			// Finally, we will hide the _next_ step's drawer, too -- this is in case we're going backwards.
			if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`) !== null) {
				if ( magickFlowConfig.metaData[nextClick][`showDrawerFrom${Direction}`] === true ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`).classList.add('slds-hide');
					}, 250);
					console.log(`delayTransition: `, delayTransition);
					delayTransition = (delayTransition < 250 ? 250 : delayTransition);
				}
			}


		});

		console.log(`previousClick: `, previousClick);
		console.log(`previousStepNumber: `, previousStepNumber);
		console.dir(previousStepDrawersData);

		console.log(`currentStepNumber: `, currentStepNumber);
		console.dir(currentStepDrawersData);

		console.log(`nextStepNumber: `, nextStepNumber);
		console.dir(nextStepDrawersData);

		// console.log(`yo: `, currentStepDrawersData['top'].find(k => k=='show-on-arrival') === 'show-on-arrival');

		

		// // Going forward

		// // Previous step
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`) !== null) {
		// 	if ( previousStepDrawersData['top'].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
		// 		// document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slide-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
		// 		console.log('should delay and then slide back up...');
		// 		setTimeout(() => {
		// 			document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousClick}`).classList.add('slds-hide');
		// 		}, 125);
		// 		delayTransition = 250;


		// 	} else if ( previousStepDrawersData['top'].find(k => k=='hide-instantly') === 'hide-instantly' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
		// 	}
		// }





		// // Current step
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`) !== null) {
		// 	if ( currentStepDrawersData['top'].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
		// 	} else if ( currentStepDrawersData['top'].find(k => k=='show-instantly') === 'show-instantly' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('be-in');
		// 	}
		// 	if ( currentStepDrawersData['top'].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
		// 		// document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('be-in');
		// 		// document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slide-in');
		// 		delayTransition = 250;
		// 		console.log('should delay and then slide back up...');

		// 	} else if ( currentStepDrawersData['top'].find(k => k=='hide-instantly') === 'hide-instantly' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('be-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slds-hide');
		// 	}
		// }


		// // Next step
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`) !== null) {
		// 	if ( nextStepDrawersData['top'].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slds-hide');
		// 	} else if ( nextStepDrawersData['top'].find(k => k=='show-instantly') === 'show-instantly' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.add('be-in');
		// 	} else {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.add('slds-hide');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('be-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slide-in');
		// 	}
		// }

		// // Previous step
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousClick}`) !== null) {
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');

		// 	// if ( previousStepDrawersData['top'].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
		// 	// } else if ( previousStepDrawersData['top'].find(k => k=='show-instantly') === 'show-instantly' ) {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
		// 	// }
		// 	// setTimeout(() => {
		// 	// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
		// 	// }, 125);
		// }
		// 	// delayTransition = 250;









		// if ( previousStepDrawersData['top'].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {


		// 	if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`) !== null) {

		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slide-in');
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');

		// 		window.setTimeout(() => {
		// 			document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
		// 		}, 10);
		// 		window.setTimeout(() => {
		// 			document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
		// 		}, 500);
		// 		delayTransition = 250;
		// 	}

		// }

		// if ( currentStepDrawersData['top'].find(k => k=='show-instantly') === 'show-instantly' ) {
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slide-in');
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('be-in');
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
		// 	window.setTimeout(() => {
		// 	}, 125);
		// }

		// // Hide previous top drawer
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`) !== null) {
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
		// 	setTimeout(() => {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
		// 	}, 125);
		// 	delayTransition = 250;
		// }
		// // Hide next top drawer
		// if (document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`) !== null) {
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slide-in');
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('be-in');
		// 	setTimeout(() => {
		// 		document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.add('slds-hide');
		// 	}, 125);
		// 	delayTransition = 250;
		// }


		// if ( nextStepDrawersData['top'].find(k => k=='show-instantly') === 'show-instantly' ) {
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slds-hide');
		// 	document.querySelector(`.magick-flows-drawer--from-top.magick-flows-step-asset--step-${nextStepNumber}`).classList.add('be-in');
		// 	window.setTimeout(() => {
		// 	}, 125);
		// }
		// nextStepDrawersData['top']['hide-never'] === true


	}




	if (document.querySelector(`.ios-notification`) !== null) {

		// First we will hide any previous step's ios-notification.
		if (document.querySelector(`.ios-notification--step-${previousClick}`) !== null) {
			if ( magickFlowConfig.metaData[previousClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--step-${previousClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.ios-notification--step-${previousClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				delayTransition = 500;
			}
		}

		// currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition')
		// console.log(`magickFlowConfig.metaData: `, magickFlowConfig.metaData);
		// console.log(`magickFlowConfig.metaData[clicks]: `, magickFlowConfig.metaData[clicks]);
		// console.log(`currentStepMetaData: `, currentStepMetaData);
		// Now we will show this step's ios-notification, if it exists.
		if ( magickFlowConfig.metaData[clicks][`showIosNotification`] === true ) {
			doDrawer = true;
			document.querySelector(`.ios-notification--step-${clicks}`).classList.remove('slds-hide');
			window.setTimeout(() => {
				document.querySelector(`.ios-notification--step-${clicks}`).classList.add('slide-in');
			}, 250);
		}

		// Finally, we will hide the _next_ step's ios-notification, too -- this is in case we're going backwards.
		if (document.querySelector(`.ios-notification--step-${nextClick}`) !== null) {
			if ( magickFlowConfig.metaData[nextClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--step-${nextClick}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.ios-notification--step-${nextClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				delayTransition = 250;
			}
		}
		
	}

	// once we've sorted out _what_ sort of transition to affect, we trigger it
	normalTransition(clicks, doApplicationSwitchStepTransition, delayTransition);

	// depending upon data-step seems okay, though i've always been worried it is too fragile, it seems to work well
	//  ¯\_(ツ)_/¯
	for (var item of document.querySelectorAll(`[data-step]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;

			if (parseInt(item.dataset.slide) == clicks) {

				const thisMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[clicks]}`;
				const nextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[nextClick]}`;
				const theOneAfterNextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[nextClick + 1]}`;
				const previousMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[previousClick]}`;

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
	console.dir(magickFlowConfig.metaData[stepToEvaluateForAppTransition]);
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


// document.ontouchstart = function() {
// 	const theScreenshot = document.querySelector(`#magick-flows--step-${nextClick} .auto-replace`);
// 	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();
// }

// The very first time the URL for this Magick Flow is loaded in the browser we run a "reset" on it 
// Why? WE DON'T KNOW!! 
// ¯\_(ツ)_/¯ at some point this seemed very important, to overcome some bug, but I  reglected to write down what the goal was, and now, here we are.
window.setTimeout(() => {
	window.location.hash = `#reset`;
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
		const theScreenshot = document.querySelector(`#magick-flows--step-${clicks} .auto-replace`);
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

