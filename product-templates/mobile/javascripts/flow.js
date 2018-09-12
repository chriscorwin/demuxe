
const magickFlowConfig = locals.demoMagickFlows[demoMagickFlowDirectoryName];

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
		clicks = 0;
	}
	window.location.hash = `#${clicks}`;
};


function locationHashChanged( ) {
	window.scroll(0,0);

	clicks = parseInt( window.location.hash.replace( '#', '' ) ) || 0;
	if ( clicks >= magickFlowConfig.numberOfScreens ) {
		clicks = 0;
		window.location.hash = `#${clicks}`;
	}

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

	// console.log((`#magick-flows--slide-${nextClick}`));

	window.setTimeout(() => {
	}, 30);

	for (var item of document.querySelectorAll(`[data-slide]`)) {
		if (typeof(item) != 'undefined' && item != null) {
			const itemId = item.id;
			console.log(`item.dataset.slide: `, item.dataset.slide);
			if (parseInt(item.dataset.slide) == clicks) {
				
				// document.querySelector(`#${itemId}`).classList.remove('slds-hide');
				document.querySelector(`#${itemId}`).classList.add('slds-transition-show');

				window.setTimeout(() => {
					document.querySelector(`#magick-flows--slide-${nextClick}`).classList.remove('slds-hide');
					document.querySelector(`#magick-flows--slide-${nextClick}`).classList.remove('slds-transition-show');
					document.querySelector(`#magick-flows--slide-${previousClick}`).classList.remove('slds-hide');
					document.querySelector(`#magick-flows--slide-${previousClick}`).classList.remove('slds-transition-show');
				}, 1);

				// document.querySelector(`#magick-flows--slide-${nextClick}`).classList.add('slds-transition-show');



				// window.setTimeout(() => {
				// }, 2);

			} else if ( parseInt(item.dataset.slide) == nextClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-hide');
			} else if ( parseInt(item.dataset.slide) == previousClick) {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
			} else {
				// document.querySelector(`#${itemId}`).classList.remove('slds-transition-show');
				window.setTimeout(() => {
				document.querySelector(`#${itemId}`).classList.add('slds-hide');
				}, magickFlowConfig.numberOfScreens);
				
			}
		}
	}
	

}

window.onhashchange = locationHashChanged;


locationHashChanged();

document.querySelector(`#magick-flows--slide-${clicks}`).classList.remove('slds-hide');
document.querySelector(`#magick-flows--slide-${clicks}`).classList.add('slds-transition-show');


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

