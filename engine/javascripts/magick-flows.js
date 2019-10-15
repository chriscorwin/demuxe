let thisPathToIncludeForLogging = `engine/javascripts/magick-flows.js`;
let thisIncludeDebugInfoStart = `
============================================================
Demuxe: including ${thisPathToIncludeForLogging} now...
------------------------------------------------------------
`;
let thisIncludeDebugInfoEnd = `
...end ${thisPathToIncludeForLogging}
------------------------------------------------------------
`;
// console.group(thisIncludeDebugInfoStart);
const magickFlowConfig = locals.magickFlows[demoMagickFlowDirectoryName];
const drawerContentChangingClasses = 'section payment confirmation';
const drawerDirectionOptions = ['left', 'right', 'top', 'bottom'];

var clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

if ( clicks >= magickFlowConfig.numberOfSteps ) {
	clicks = 0;
}

var nextClick = clicks + 1;
if ( nextClick >= magickFlowConfig.numberOfSteps ) {
	nextClick = 0
}

var previousClick = clicks - 1;
if ( previousClick <= 0 ) {
	previousClick = magickFlowConfig.numberOfSteps
}


const $ss = document.querySelector(`.magick-flows--step-content.auto-replace[data-step="${clicks}"]`);
const $contentWrapper = document.querySelector( '#content-wrapper' );
const $inlineFrameExample = document.querySelector( `#magick-flows-iframe--${clicks}` );





function testForEscapeHatch(node) {
	return node.includes('is-escape-hatch');
}

function testForEject(node) {
	return node.includes('is-eject');
}



function incrementLocationHashWithTiming ( hashChangeTiming = 0, directionOfNavigation = 'forward' ) {
	if (directionOfNavigation === 'backwards') {
		clicks --;
	} else {
		clicks++;
	}
	if ( clicks >= magickFlowConfig.numberOfSteps ) {
		clicks = magickFlowConfig.numberOfSteps - 1;
	}
	if ( clicks < 0 ) {
		clicks = 0;
	}
	// Now is the chance to run onBeforeHashChange stuff
	// In the future, we may wish to catch that it should change and do stuff first.
	// For now, we just do it.
	console.log(`[ incrementLocationHashWithTiming ] A click has happened. That makes the total number of clicks: ${clicks}. Now we will wait ${hashChangeTiming} milliseconds and then update the hash.`);
	setTimeout(() => {
		window.location.hash = `#${clicks}`;
	}, hashChangeTiming);
}

function setLocationHashWithTiming (newUrlHash = 0, hashChangeTiming = 0) {
	// clicks = newUrlHash;
	if ( newUrlHash >= magickFlowConfig.numberOfSteps ) {
		newUrlHash = magickFlowConfig.numberOfSteps - 1;
	}
	if ( newUrlHash < 0 ) {
		newUrlHash = 0;
	}
	// Now is the chance to run onBeforeHashChange stuff
	// In the future, we may wish to catch that it should change and do stuff first.
	// For now, we just do it.
	console.log(`[ setLocationHashWithTiming ] Making the total number of clicks: ${newUrlHash}. Now we will wait ${hashChangeTiming} milliseconds and then update the hash.`);
	setTimeout(() => {
		window.location.hash = `#${newUrlHash}`;
	}, hashChangeTiming);
}

$contentWrapper.onclick = ( ) => {
	incrementLocationHashWithTiming();
};


function closeIFrame(){
	clicks++;
	if ( clicks >= magickFlowConfig.numberOfSteps ) {
		clicks = magickFlowConfig.numberOfSteps - 1;
	}
	// Now is the chance to run onBeforeHashChange stuff
	// In the future, we may wish to catch that it should change and do stuff first.
	// For now, we just do it.
	let hashChangeTiming = 0;
	setTimeout(() => {
		window.location.hash = `#${clicks}`;
	}, hashChangeTiming);

	document.querySelector( `#magick-flows-iframe--${clicks}` ).classList.toggle('slds-hide');
}



function normalTransition (thisStepNumber = 0, doApplicationSwitchStepTransition = false, delayTransition = 0) {
	if (locals.DEBUG === true) {
		// console.group(`[Magick Flows: normalTransition() ](${thisPathToIncludeForLogging}:50) running...`);
	}

	let nextStepNumber = thisStepNumber + 1;

	if (document.querySelector('.container') !== null) {
		document.querySelector('.container').dataset.next = `magick-flows--step-${nextClick}`;
		document.querySelector('.container').dataset.previous = `magick-flows--step-${previousClick}`;
	}
	if (document.querySelector('body') !== null) {
		document.querySelector('body').dataset.current = `magick-flows--step-${thisStepNumber}`;
		document.querySelector('body').dataset.next = `magick-flows--step-${nextClick}`;
		document.querySelector('body').dataset.previous = `magick-flows--step-${previousClick}`;
		document.querySelector('html').dataset.current = `magick-flows--step-${thisStepNumber}`;
		document.querySelector('html').dataset.next = `magick-flows--step-${nextClick}`;
		document.querySelector('html').dataset.previous = `magick-flows--step-${previousClick}`;
	}

	// console.debug(`[Magick Flows: normalTransition() ] thisStepNumber: `, thisStepNumber);

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

	if (locals.DEBUG === true) {
		// console.groupEnd();
	}

}



function getAppSwitcherClassNames () {
	let out = [];
	for (step = 0; step < magickFlowConfig.numberOfSteps; step++) {
		out.push(`slide-left-${step}`);
		out.push(`be-left-${step}`);
	}
	return out;
}



function locationHashChanged(event) {

	console.debug(`[locationHashChanged] running now...`);
	console.debug(`clicks (before manipulation): `, clicks);
	// get the non-string version of the hash -- that is the number of clicks so far
	let newClicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

	console.debug(`newClicks: `, newClicks);
	clicks = newClicks;

	// if the number of clicks is greater than our number of steps, we override that and set that thing back to zero
	if ( clicks >= magickFlowConfig.numberOfSteps ) {
		setLocationHashWithTiming(0, 0);
	}

	// figure out which things come next and which things are backwards -- because it's a _loop_ we have to do some maths here
	nextClick = clicks + 1;
	if ( nextClick >= magickFlowConfig.numberOfSteps ) {
		nextClick = 0
	}
	previousClick = clicks - 1;

	if ( previousClick < 0 ) {
		previousClick = magickFlowConfig.numberOfSteps - 1
	}
	if ( previousClick > magickFlowConfig.numberOfSteps ) {
		previousClick = 0
	}

	// we assume that we will not do an app transition nor show a notificaiton
	// eventually we'll assume we aren't showing a drawer, or sliding in a wizard, or anything else.
	let doApplicationSwitchStepTransition = false;
	let doAutoAdvanceStepTransition = false;


	let newDelayTransition = 0;
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

	let stepToEvaluateForAppTransition = directionOfNavigation === 'forward' ? newUrlHash : oldUrlHash;
	let previousStepNumber = previousClick;
	let currentStepNumber = newUrlHash;
	let nextStepNumber = nextClick;

	const previousStepMetaData = magickFlowConfig.stepMetaData[previousStepNumber].data || ['unset'];
	const currentStepMetaData = magickFlowConfig.stepMetaData[currentStepNumber].data || ['unset'];
	const nextStepMetaData = magickFlowConfig.stepMetaData[nextStepNumber].data || ['unset'];

	useStepTransition = currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition';
	doApplicationSwitchStepTransition = currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch';
	doApplicationSwitchStepTransition_altSyntax1 = currentStepMetaData.find(k => k=='@APPSWITCH') === '@APPSWITCH';
	doApplicationSwitchStepTransition_altSyntax2 = currentStepMetaData.find(k => k=='@appswitch') === '@appswitch';
	doApplicationSwitchStepTransition_altSyntax3 = currentStepMetaData.find(k => k=='step-transition_application-switch') === 'step-transition_application-switch';
	
	console.log(`currentStepMetaData: `, currentStepMetaData);
	doAutoAdvanceStepTransition = currentStepMetaData.find(k => k=='step-transition_auto-advance') === 'step-transition_auto-advance';
	doAutoAdvanceStepTransition_altSyntax1 = currentStepMetaData.find(k => k=='@AAXFAST') === '@AAXFAST';
	doAutoAdvanceStepTransition_altSyntax2 = currentStepMetaData.find(k => k=='@aaxfast') === '@aaxfast';
	doAutoAdvanceStepTransition_altSyntax3 = currentStepMetaData.find(k => k=='@AAFAST') === '@AAFAST';
	doAutoAdvanceStepTransition_altSyntax4 = currentStepMetaData.find(k => k=='@aafast') === '@aafast';
	doAutoAdvanceStepTransition_altSyntax5 = currentStepMetaData.find(k => k=='@AANORMAL') === '@AANORMAL';
	doAutoAdvanceStepTransition_altSyntax6 = currentStepMetaData.find(k => k=='@aanormal') === '@aanormal';
	doAutoAdvanceStepTransition_altSyntax7 = currentStepMetaData.find(k => k=='@AASLOW') === '@AASLOW';
	doAutoAdvanceStepTransition_altSyntax8 = currentStepMetaData.find(k => k=='@aaslow') === '@aaslow';



	if (doAutoAdvanceStepTransition_altSyntax1 === true
	 || doAutoAdvanceStepTransition_altSyntax2 === true
	 || doAutoAdvanceStepTransition_altSyntax3 === true
	 || doAutoAdvanceStepTransition_altSyntax4 === true
	 || doAutoAdvanceStepTransition_altSyntax5 === true
	 || doAutoAdvanceStepTransition_altSyntax6 === true
	 || doAutoAdvanceStepTransition_altSyntax7 === true
	 || doAutoAdvanceStepTransition_altSyntax8 === true
	) {
		doAutoAdvanceStepTransition = true;
	}
	if (doApplicationSwitchStepTransition_altSyntax1 === true || doApplicationSwitchStepTransition_altSyntax2 === true || doApplicationSwitchStepTransition_altSyntax3 === true) {
		doApplicationSwitchStepTransition = true;
	}


	// console.group(`[ ${magickFlowConfig.urlSlug} ☞ #${previousStepNumber} location hash changed to: #${currentStepNumber} ]`);

	// console.debug(`window.location.hash (before manipulation): `, window.location.hash);
	// console.debug(`event.oldURL: `, event.oldURL);
	// console.debug(`event.newURL: `, event.newURL);
	// console.debug(`clicks: `, clicks);
	// console.debug(`previousClick: `, previousClick);
	// console.debug(`nextClick: `, nextClick);
	// console.debug(`directionOfNavigation: `, directionOfNavigation);
	// console.debug(`currentStepMetaData: `, currentStepMetaData);
	// console.debug(`stepToEvaluateForAppTransition: `, stepToEvaluateForAppTransition);

	let hasEject = currentStepMetaData.some(testForEject);
	let indexOfEject = currentStepMetaData.findIndex(testForEject);

	if ( hasEject === true ) {

		// let newUrlSlugForEject = currentStepMetaData[indexOfEject].split('--')[1];
		// let newUrlSlugForEjectSplitAgain = newUrlSlugForEject.split('-')[0] + '=' + newUrlSlugForEject.split('-')[1];
		// window.location = `/?${newUrlSlugForEjectSplitAgain}`;
		let newUrlSlugForEject = decodeURIComponent(currentStepMetaData[indexOfEject].split('--')[1]);
		window.location = `/${newUrlSlugForEject}`;
		return false;
	}


	let hasEscapeHatch = currentStepMetaData.some(testForEscapeHatch);
	let indexOfEscapeHatch = currentStepMetaData.findIndex(testForEscapeHatch);

	if ( hasEscapeHatch === true ) {
		// console.log(`locals.productTemplate: `, locals.productTemplate);
		// console.log(`locals.brandTheme: `, locals.brandTheme);
		// console.log(`currentStepMetaData[indexOfEscapeHatch]: `, currentStepMetaData[indexOfEscapeHatch]);

		let newUrlSlugForEscapeHatch = decodeURIComponent(currentStepMetaData[indexOfEscapeHatch].split('--')[1]);
		// window.location = `/${newUrlSlugForEscapeHatch}`;

	}


	if ( useStepTransition && currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch' ) {
		// console.debug(`currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition': `, currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition');
		// console.debug(`currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch': `, currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch');
		doApplicationSwitchStepTransition = true;
		// console.debug(`doApplicationSwitchStepTransition: `, doApplicationSwitchStepTransition);
	}
	if ( useStepTransition && currentStepMetaData.find(k => k=='step-transition_application-switch') === 'step-transition_application-switch' ) {
		// console.debug(`currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition': `, currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition');
		// console.debug(`currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch': `, currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch');
		doApplicationSwitchStepTransition = true;
		// console.debug(`doApplicationSwitchStepTransition: `, doApplicationSwitchStepTransition);
	}
	if ( currentStepMetaData.find(k => k=='@APPSWITCH') === '@APPSWITCH' ) {
		// console.debug(`currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition': `, currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition');
		// console.debug(`currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch': `, currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch');
		doApplicationSwitchStepTransition = true;
		// console.debug(`doApplicationSwitchStepTransition: `, doApplicationSwitchStepTransition);
	}
	if ( currentStepMetaData.find(k => k=='@appswitch') === '@appswitch' ) {
		// console.debug(`currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition': `, currentStepMetaData.find(k => k=='use-step-transition') === 'use-step-transition');
		// console.debug(`currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch': `, currentStepMetaData.find(k => k=='step-transition_app-switch') === 'step-transition_app-switch');
		doApplicationSwitchStepTransition = true;
		// console.debug(`doApplicationSwitchStepTransition: `, doApplicationSwitchStepTransition);
	}





		console.debug(`doAutoAdvanceStepTransition: `, doAutoAdvanceStepTransition);
	if ( doAutoAdvanceStepTransition === true ) {

		if ( currentStepMetaData.find(k => k=='step-transition-timing--slow') === 'step-transition-timing--slow') {
			autoAdvanceTransitionTiming = 5000;
		}
		if ( currentStepMetaData.find(k => k=='@AASLOW') === '@AASLOW') {
			autoAdvanceTransitionTiming = 5000;
		}
		if ( currentStepMetaData.find(k => k=='@aaslow') === '@aaslow') {
			autoAdvanceTransitionTiming = 5000;
		}

		if ( currentStepMetaData.find(k => k=='step-transition-timing--normal') === 'step-transition-timing--normal') {
			autoAdvanceTransitionTiming = 1000;
		}
		if ( currentStepMetaData.find(k => k=='@AANORMAL') === '@AANORMAL') {
			autoAdvanceTransitionTiming = 1000;
		}
		if ( currentStepMetaData.find(k => k=='@aanormal') === '@aanormal') {
			autoAdvanceTransitionTiming = 1000;
		}

		if ( currentStepMetaData.find(k => k=='step-transition-timing--fast') === 'step-transition-timing--fast') {
			autoAdvanceTransitionTiming = 100;
		}
		if ( currentStepMetaData.find(k => k=='@AAFAST') === '@AAFAST') {
			autoAdvanceTransitionTiming = 100;
		}
		if ( currentStepMetaData.find(k => k=='@aafast') === '@aafast') {
			autoAdvanceTransitionTiming = 100;
		}


		if ( currentStepMetaData.find(k => k=='step-transition-timing--x-fast') === 'step-transition-timing--x-fast') {
			autoAdvanceTransitionTiming = 5;
		}
		if ( currentStepMetaData.find(k => k=='@AAXFAST') === '@AAXFAST') {
			autoAdvanceTransitionTiming = 5;
		}
		if ( currentStepMetaData.find(k => k=='@aaxfast') === '@aaxfast') {
			autoAdvanceTransitionTiming = 5;
		}



		let autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition;
		if ( directionOfNavigation === 'forward' ) {
			autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition + 1;
		} else {
			autoAdvanceTransitionStepNumber = stepToEvaluateForAppTransition - 1;
		}

		console.debug(`stepToEvaluateForAppTransition: `, stepToEvaluateForAppTransition);
		setLocationHashWithTiming(autoAdvanceTransitionStepNumber, autoAdvanceTransitionTiming);
		// setTimeout(() => {
		// 	window.location.hash = `#${autoAdvanceTransitionStepNumber}`;
		// }, autoAdvanceTransitionTiming);

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
			if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`) !== null) {
				// console.log(`previousStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave': `, previousStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave');
				// console.log('document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`)', document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`));


				if ( previousStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
						// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
					}, 2900);

					newDelayTransition = doAutoAdvanceStepTransition ? 0 : 750;
					// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}, if it is less`)
					delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);
				} else if ( previousStepDrawersData[direction].find(k => k=='hide-never') === 'hide-never' ) {
					setTimeout(() => {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('be-in');
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.remove('slide-in');
						// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${previousStepNumber}`).classList.add('slds-hide');
					}, 1500);
				}
			}


			if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`) !== null) {

				// console.log('document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`)', document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`));

				if ( currentStepDrawersData[direction].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
					// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('be-in');
					newDelayTransition = 1;
					// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}`)
					delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);

				} else if ( currentStepDrawersData[direction].find(k => k=='hide-on-arrival') === 'hide-on-arrival' ) {
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slide-in');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('be-in');
					// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
					newDelayTransition = 1;
					// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}`)
					delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);
				} else if ( currentStepDrawersData[direction].find(k => k=='show-instantly') === 'show-instantly' ) {
					// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('slds-hide');
					document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('be-in');
					if ( currentStepDrawersData[direction].find(k => k=='hide-on-leave') === 'hide-on-leave' ) {
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('slide-in');
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.remove('be-in');
						document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${currentStepNumber}`).classList.add('your-mom-was-here');
						newDelayTransition = 500;
						// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}, if it is less`)
						delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);

					} else if ( currentStepDrawersData[direction].find(k => k=='hide-never') === 'hide-never' ) {
						newDelayTransition = 3;
						// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}, if it is less`)
						delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);
					}
				}
			}
			if ( nextStepDrawersData[direction].find(k => k=='show-on-arrival') === 'show-on-arrival' ) {
				// document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextStepNumber}`).classList.remove('slds-hide');
				// console.log('document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextStepNumber}`)', document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextStepNumber}`));
			}




			// // Finally, we will hide the _next_ step's drawer, too -- this is in case we're going backwards.
			// if (document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`) !== null) {
			// 	if ( magickFlowConfig.stepMetaData[nextClick][`showDrawerFrom${Direction}`] === true ) {
			// 		document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`).classList.remove('slide-in');
			// 		setTimeout(() => {
			// 			document.querySelector(`.magick-flows-drawer--from-${direction}.magick-flows-step-asset--step-${nextClick}`).classList.add('slds-hide');
			// 		}, 250);
					console.debug(`delayTransition: `, delayTransition);
			// 		// delayTransition = (delayTransition < 250 ? 250 : delayTransition);
			// 	}
			// }


		});


		// console.debug(`previousStepNumber: `, previousStepNumber);
		// console.debug(previousStepDrawersData);
		// console.debug(`currentStepNumber: `, currentStepNumber);
		// console.debug(currentStepDrawersData);
		// console.debug(`nextStepNumber: `, nextStepNumber);
		// console.debug(nextStepDrawersData);
		// console.debug(`delayTransition: `, delayTransition);

	}






	if (document.querySelectorAll('video').length !== 0) {
		let theseVideoNodes = document.querySelectorAll(`video`);
		theseVideoNodes.forEach(function(node, nodeIndex) {

			node.pause();
			node.currentTime = 0;

		});
	}


	if (document.querySelectorAll(`[data-step="${currentStepNumber}"] video`).length === 1) {
		if (document.getElementById(`magick-flows--main-content-wrapper--step-${currentStepNumber}`) !== null) {
			var video = document.getElementById(`magick-flows--main-content-wrapper--step-${currentStepNumber}`);
			video.pause();
			video.currentTime = 0;
			video.load();
		}
	}


	if (document.querySelectorAll(`[data-step="${currentStepNumber}"] video`).length === 1) {
		if (document.getElementById(`magick-flows--main-content-wrapper--step-${currentStepNumber}`) !== null) {
			var video = document.getElementById(`magick-flows--main-content-wrapper--step-${currentStepNumber}`);
			video.pause();
			video.currentTime = 0;
			video.load();
		}
	}
	if (document.querySelector(`.ios-notification`) !== null) {

		// First we will hide any previous step's ios-notification.
		if (document.querySelector(`.ios-notification--step-${previousClick}`) !== null) {
			if ( magickFlowConfig.stepMetaData[previousClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--step-${previousClick}`).classList.remove('slide-in');
					setTimeout(() => {
						// document.querySelector(`.ios-notification--step-${previousClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				newDelayTransition = 500;
				// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}, if it is less`)
				delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);
			}
		}
		// Now we will show this step's ios-notification, if it exists.
		if ( magickFlowConfig.stepMetaData[clicks][`showIosNotification`] === true ) {
			doDrawer = true;
			// document.querySelector(`.ios-notification--step-${clicks}`).classList.remove('slds-hide');
			window.setTimeout(() => {
				document.querySelector(`.ios-notification--step-${clicks}`).classList.add('slide-in');
			}, 250);
		}

		// Finally, we will hide the _next_ step's ios-notification, too -- this is in case we're going backwards.
		if (document.querySelector(`.ios-notification--step-${nextClick}`) !== null) {
			if ( magickFlowConfig.stepMetaData[nextClick][`showIosNotification`] === true ) {
				setTimeout(() => {
					document.querySelector(`.ios-notification--step-${nextClick}`).classList.remove('slide-in');
					setTimeout(() => {
						// document.querySelector(`.ios-notification--step-${nextClick}`).classList.add('slds-hide');
					}, 250);
				}, 0);
				newDelayTransition = 250;
				// console.log(`delayTransition was ${delayTransition}, will now set it to ${newDelayTransition}, if it is less`)
				delayTransition = (delayTransition < (newDelayTransition + 1) ? newDelayTransition : delayTransition);
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

				const thisMagickFlowMainContentUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[clicks]}`;
				const nextMagickFlowMainContentUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[nextClick]}`;
				const theOneAfterNextMagickFlowMainContentUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[nextClick + 1]}`;
				const previousMagickFlowMainContentUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.steps[previousClick]}`;

				// this is where we wanna also sense .esj or even maybe .html and do _other_ stuff
				const isPng = thisMagickFlowMainContentUrl.endsWith('.png');
				const isSvg = thisMagickFlowMainContentUrl.endsWith('.svg');
				const isMp4 = thisMagickFlowMainContentUrl.endsWith('.mp4');
				const isGif = thisMagickFlowMainContentUrl.endsWith('.gif');
				const isJpeg = thisMagickFlowMainContentUrl.endsWith('.jpg');
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
	if (locals.DEBUG === 'true') {
		console.group(`[ Speaker Notes ]`)
		console.group('(verbose level info here)');
		console.log(`-------------------------`);
		console.debug(magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition]);
		console.debug(`previousStepDrawersData: `, previousStepDrawersData);
		console.debug(`currentStepDrawersData: `, currentStepDrawersData);
		console.debug(`nextStepDrawersData: `, nextStepDrawersData);
		console.debug(`delayTransition: `, delayTransition);
		console.log(`-------------------------`);
		console.groupEnd();
		console.log(`Current Step: `, clicks);
		console.log(`Sorter: `, magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition].sorter);
		console.log(`Step ID: `, magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition].id);
	}
	if ( typeof magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition].notes !== 'undefined' ) {
		if (locals.DEBUG === 'true') {
			console.group(`Hints`);
		}
		magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition].notes.forEach((note, noteIndex) => {
			// note = note.replace(/-/g, ' ').toLowerCase();
			note = note.replace(/-/g, ' ');
			console.debug(`${noteIndex}: ${note}`);
			// console.log(`${note}`);
		});
		if (locals.DEBUG === 'true') {
			console.groupEnd();
		}
		// console.debug(`Notes: `, magickFlowConfig.stepMetaData[stepToEvaluateForAppTransition].notes);
	}
	if (locals.DEBUG === 'true') {
		console.groupEnd();
		console.groupEnd();
	}

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

document.addEventListener('keydown', function (evt) {
	// This is the `i` key
	// Shows current click hint for a short while.
	// "i" for "information", I guess? ¯\_(ツ)_/¯
	if (evt.keyCode === 73) {
		// console.log('The "I" key is being held down.');

		let theseNodes = document.querySelectorAll(`#magick-flows-click-hints--step-${clicks}`);
		if ( theseNodes.length > 0 ) {
			theseNodes.forEach(function(node, nodeIndex) {
				node.classList.add('slide-in');
			});
		}

	} else if (evt.keyCode === 67) {
		// console.log('The "C" key is being held down.');


		let theNode = document.getElementsByTagName("body")[0];
		theNode.style.cursor = "pointer";
	}

});


document.onmousedown = function(e) {
	let theNode = document.getElementsByTagName("body")[0];
	theNode.style.cursor = "pointer";
}
document.onmouseup = function(e) {
	let theNode = document.getElementsByTagName("body")[0];
	theNode.style.cursor = "initial";
}

document.onkeyup = function(e) {

	if (e.ctrlKey &&  e.which == 72) {
		// these are here to remind us how to do combos, not cause we want these combos
		let pathToDemoHome = '/magick-flows-dashboard';
		console.log(`Ctrl + H shortcut combination was pressed, from ${thisPathToIncludeForLogging}. That means we should go to the ${pathToDemoHome}`);
		window.location = `${pathToDemoHome}`;
	} else if (e.which == 72) {

		// H

		console.debug("H key was pressed. Going to the first step.");

		setLocationHashWithTiming(0, 0);
		setTimeout(() => {
			location.reload(true);
		}, 250)
	} else if (e.which == 73) {
		// I

		let theseNodes = document.querySelectorAll(`#magick-flows-click-hints--step-${clicks}`);
		if ( theseNodes.length > 0 ) {
			theseNodes.forEach(function(node, nodeIndex) {
				node.classList.remove('slide-in');
			});
		}

	} else if (e.which == 67) {
		// I


		let theNode = document.getElementsByTagName("body")[0];
		theNode.style.cursor = "initial";

	} else if (e.which == 84) {

		// T

		// "t" for "toggle"
		// Toggles the click hints on all slides.
		let theseNodes = document.querySelectorAll(`.magick-flows-click-hints`);
		if ( theseNodes.length > 0 ) {
			theseNodes.forEach(function(node, nodeIndex) {
				node.classList.toggle('slide-in');
			});
		}
	} else if (e.which == 68) {

		// T

		// "t" for "toggle"
		// Toggles the click hints on all slides.
		let theseNodes = document.querySelectorAll(`body`);
		if ( theseNodes.length > 0 ) {
			theseNodes.forEach(function(node, nodeIndex) {
				node.classList.toggle('magick-flows-debug');
			});
		}
	} else if (e.which == 39) {
		// console.log("Right arrow key was pressed, go to next...");
		incrementLocationHashWithTiming(null, 'forward');
		// window.location.hash = `#${nextClick}`;
	} else if (e.which == 37) {
		// console.log("Left arrow key was pressed, go to previous...");
		incrementLocationHashWithTiming(null, 'backwards');
		// window.location.hash = `#${previousClick}`;
	} else if (e.which == 71) {
		// console.log("GIF...");
		const theMainContent = document.queryselector(`#magick-flows--step-${clicks} .auto-replace`);
		// console.log(`item img: `, theMainContent.src);
		theMainContent.src = theMainContent.src.replace(/\?.*$/,"")+"?x="+Math.random();
	} else if (e.ctrlKey && e.altKey && e.which == 89) {
		// these are here to remind us how to do combos, not cause we want these combos
		console.log(`Ctrl + Alt + Y shortcut combination was pressed, from ${thisPathToIncludeForLogging}`);
	} else if (e.ctrlKey && e.altKey && e.shiftKey && e.which == 85) {
		// these are here to remind us how to do combos, not cause we want these combos
		// alert("Ctrl + Alt + Shift + U shortcut combination was pressed");
  }
};




// The very first time the URL for this Magick Flow is loaded in the browser we run a "reset" on it
// Why? WE DON'T KNOW!!
// ¯\_(ツ)_/¯ at some point this seemed very important, to overcome some bug, but I  reglected to write down what the goal was, and now, here we are.
// window.location.hash = `#reset`;
// setLocationHashWithTiming(clicks, 0);
console.log(`locals.WHAT_IS_PROCESS_ENV_DEBUG: `, locals.WHAT_IS_PROCESS_ENV_DEBUG);
if (locals.WHAT_IS_PROCESS_ENV_DEBUG === 'true') {
	console.debug(`Click hints automatgickally showing because you are in DEBUG mode. Hit the "T" key to toggle.`);
	console.debug(`More step data is also automatgickally showing because you are in DEBUG mode. Hit the "D" key to toggle.`);

	let theseNodes = document.querySelectorAll(`.magick-flows-click-hints`);
	if ( theseNodes.length > 0 ) {
		theseNodes.forEach(function(node, nodeIndex) {
			node.classList.add('slide-in');
		});
	}

}

setLocationHashWithTiming(clicks, 0);

document.querySelector(`#content-wrapper`).classList.remove('slds-transition-show');
document.querySelector(`#content-wrapper`).classList.remove('slds-transition-hide');
document.querySelector(`#content`).classList.remove('fake-the-dock');
document.querySelector(`.preload-images`).classList.add('slds-transition-hide');

// setLocationHashWithTiming(clicks + 1, 5000);
// window.location.hash = `#${clicks}`;


// console.log(thisIncludeDebugInfoEnd);
// console.groupEnd();

