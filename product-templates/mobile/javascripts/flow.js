const magickFlowConfig = locals.demoMagickFlows[demoMagickFlowDirectoryName];
const drawerContentChangingClasses = 'section payment confirmation';

let clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;

if ( clicks >= magickFlowConfig.numberOfScreens ) {
	clicks = 0;
	window.location.hash = `#${clicks}`;
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
	let nextStepNumber = thisStepNumber + 1;
	$('.container').attr('data-next', `magick-flows--slide-${nextStepNumber}`);
	$('.container').attr('data-previous', `magick-flows--slide-${thisStepNumber - 1}`);

	console.log(`thisStepNumber: `, thisStepNumber);
	
	// pauseYoutubeVideo();

	$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');

	$('.app-switcher-two').removeClass('show');
	$('.app-switcher-one').removeClass(getAppSwitcherClassNames());


	const appSwitcherOne = $('.app-switcher-one');
	// appSwitcherOne.removeClass('hide').addClass('shrink slide-left rounded-corners');
	// doAppTransition = true;
	if (doAppTransition === true) {

		$('.app-switcher-one').removeClass('hide').addClass(`shrink rounded-corners`).addClass(`slide-left-${thisStepNumber}`);
		setTimeout(() => {
			$('.app-switcher-one').removeClass('shrink');
			
			setTimeout(() => {
				$('.app-switcher-one').removeClass('rounded-corners');
			}, 250);
		}, 500);

	} else {
		$('.app-switcher-one').removeClass('hide shrink rounded-corners');
		$('.app-switcher-one').removeClass('hide').addClass(`be-left-${thisStepNumber}`);
	}

}



function getAppSwitcherClassNames () {

	let step;
	let out = '';
	for (step = 0; step < magickFlowConfig.numberOfScreens; step++) {
		out += ' slide-left-' + step;
		out += ' be-left-' + step;
	}
	return out;
}



function locationHashChanged( ) {
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

	if (clicks === 5 ) {
		doAppTransition = true;
	}
	normalTransition(clicks, doAppTransition);

	for (var item of document.querySelectorAll(`[data-slide]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;
			console.log(`item.dataset.slide: `, item.dataset.slide);




			if (parseInt(item.dataset.slide) == clicks) {

				const thisMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[clicks]}`;
				console.log(`thisMagickFlowScreenshotUrl: `, thisMagickFlowScreenshotUrl);
				const nextMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[nextClick]}`;
				console.log(`nextMagickFlowScreenshotUrl: `, nextMagickFlowScreenshotUrl);
				const previousMagickFlowScreenshotUrl = `/magick-flows/${magickFlowConfig.urlSlug}/${magickFlowConfig.screens[previousClick]}`;
				console.log(`previousMagickFlowScreenshotUrl: `, previousMagickFlowScreenshotUrl);


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

}

window.onhashchange = locationHashChanged;
document.ontouchstart = function() {
	const theScreenshot = document.querySelector(`#magick-flows--slide-${nextClick} .auto-replace`);
	console.log(`item img: `, theScreenshot.src);
	theScreenshot.src = theScreenshot.src.replace(/\?.*$/,"")+"?x="+Math.random();

}


locationHashChanged();

window.setTimeout(() => {
	document.querySelector(`#content-wrapper`).classList.add('slds-transition-show');
	document.querySelector(`#content-wrapper`).classList.remove('slds-transition-hide');
}, (1900));

window.setTimeout(() => {
	document.querySelector(`#content-wrapper`).classList.remove('slds-transition-show');
	// document.querySelector(`.preload-images`).classList.add('slds-transition-hide');
}, (2000));



// document.querySelector(`#magick-flows--slide-${clicks}`).classList.remove('slds-hide');
// document.querySelector(`#magick-flows--slide-${clicks}`).classList.add('slds-transition-show');


function offset(el) {
	let rect = el.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


function scrollIt(destination, duration = 200, easing = 'linear', callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  let destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  destinationOffsetToScroll = destinationOffsetToScroll - destinationOffsetToScroll;
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}


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