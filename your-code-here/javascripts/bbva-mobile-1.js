(function () {
	const drawerContentChangingClasses = 'section payment confirmation';
	let youtubeAdTimeout = {};
	let hasShownYoutubeAd = false;
	let youtubePlayer;
	let youtubeVideoPlaying = false;






	function getAppSwitcherClassNames () {

		let step;
		let out = '';
		for (step = 0; step < 100; step++) {
			out += ' slide-left-' + step;
			out += ' be-left-' + step;
		}
		return out;
	}


	function normalTransition (nextStepNumber = 0, doAppTransition) {
		$('.container').attr('data-next', `magick-flows--slide-${nextStepNumber + 1}`);

		console.log(`nextStepNumber: `, nextStepNumber);
		
		pauseYoutubeVideo();
		if (youtubePlayer) {
			youtubePlayer.seekTo(81);
		}
		$('.youtube-ad').removeClass('show');
		hasShownYoutubeAd = false;

		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');

		$('.app-switcher-two').removeClass('show');
		$('.app-switcher-one').removeClass(getAppSwitcherClassNames());


		const appSwitcherOne = $('.app-switcher-one');
		// appSwitcherOne.removeClass('hide').addClass('shrink slide-left rounded-corners');

		if (doAppTransition === true) {

			$('.app-switcher-one').removeClass('hide').addClass(`slide-left-${nextStepNumber} shrink rounded-corners`);
			setTimeout(() => {
				$('.app-switcher-one').removeClass('shrink');
				setTimeout(() => {
					$('.app-switcher-one').removeClass('rounded-corners');
				}, 300);
			}, 600);

		} else {
			$('.app-switcher-one').removeClass('hide shrink rounded-corners');
			$('.app-switcher-one').removeClass('hide').addClass(`be-left-${nextStepNumber}`);
		}

	}



	function transitionToGoogleSearchResultsScreen () {
		$('.container').attr('data-next', 'homepage-1-screen');
		pauseYoutubeVideo();
		if (youtubePlayer) {
			youtubePlayer.seekTo(81);
		}
		$('.youtube-ad').removeClass('show');
		hasShownYoutubeAd = false;

		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.app-switcher-two').removeClass('show');
		$('.app-switcher-one').removeClass('hide shrink rounded-corners');
		$('.app-switcher-one').removeClass(getAppSwitcherClassNames());
	}

	function transitionToHomepage1Screen () {
		const appSwitcherOne = $('.app-switcher-one');

		$('.container').attr('data-next', 'homepage-2-screen');
		pauseYoutubeVideo();
		$('.app-switcher-two').removeClass('show');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.snake-pit-popup').removeClass('fade-in show');
		// appSwitcherOne.removeClass('hide').addClass('shrink slide-left rounded-corners');
		appSwitcherOne.removeClass('hide').addClass('be-left-1').removeClass('be-left-2');
		setTimeout(() => {
			appSwitcherOne.removeClass('shrink');
			setTimeout(() => {
				appSwitcherOne.removeClass('rounded-corners');
			}, 300);
		}, 300);
	}
	function transitionToHomepage2Screen () {
		const appSwitcherOne = $('.app-switcher-one');

		$('.container').attr('data-next', 'stadium-one');
		pauseYoutubeVideo();
		$('.app-switcher-two').removeClass('show');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.snake-pit-popup').removeClass('fade-in show');
		// appSwitcherOne.removeClass('hide').addClass('shrink slide-left rounded-corners');
		appSwitcherOne.removeClass('hide').addClass('be-left-2').removeClass('be-left-1');
		setTimeout(() => {
			appSwitcherOne.removeClass('shrink');
			setTimeout(() => {
				appSwitcherOne.removeClass('rounded-corners');
			}, 300);
		}, 300);
	}





	function commonTransition (currentStep, nextStep) {
		$('.container').attr('data-next', nextStep);
		pauseYoutubeVideo();
		$('.app-switcher-one').addClass('hide');
		$('.app-switcher-two').removeClass('show');
		$('.snake-pit-popup').removeClass('fade-in show');
		$('.drawer').removeClass(drawerContentChangingClasses).addClass(currentStep + ' slide-in');
	}

	function pauseYoutubeVideo () {
		clearTimeout(youtubeAdTimeout);
		if (youtubePlayer && youtubeVideoPlaying) {
			youtubePlayer.pauseVideo();
		}
	}

	function transitionToEmailScreen () {
		const appSwitcherTwo = $('.app-switcher-two');

		$('.container').attr('data-next', 'end');
		pauseYoutubeVideo();
		$('.app-switcher-one').addClass('hide');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		appSwitcherTwo.removeClass('slide-left-one').addClass('show shrink slide-left-two rounded-corners');
		setTimeout(() => {
			appSwitcherTwo.removeClass('shrink');
			setTimeout(() => {
				appSwitcherTwo.removeClass('rounded-corners');
			}, 300);
		}, 300);
	}

	function transitionToInstagramScreen () {
		const appSwitcherTwo = $('.app-switcher-two');

		$('.container').attr('data-next', 'email-screen');
		pauseYoutubeVideo();
		$('.app-switcher-one').addClass('hide');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		appSwitcherTwo.removeClass('slide-left-two').addClass('show shrink slide-left-one rounded-corners');
		setTimeout(() => {
			appSwitcherTwo.removeClass('shrink');
			setTimeout(() => {
				appSwitcherTwo.removeClass('rounded-corners');
			}, 300);
		}, 300);
	}

	function transitionToSearchScreen () {
		const appSwitcherOne = $('.app-switcher-one');

		$('.container').attr('data-next', 'stadium-one');
		pauseYoutubeVideo();
		$('.app-switcher-two').removeClass('show');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.snake-pit-popup').removeClass('fade-in show');
		appSwitcherOne.removeClass('hide').addClass('shrink slide-left rounded-corners');
		setTimeout(() => {
			appSwitcherOne.removeClass('shrink');
			setTimeout(() => {
				appSwitcherOne.removeClass('rounded-corners');
			}, 300);
		}, 300);
	}

	function transitionToSnakePitPopup () {
		$('.container').attr('data-next', 'stadium-two');
		pauseYoutubeVideo();
		$('.app-switcher-two').removeClass('show');
		$('.drawer').removeClass(drawerContentChangingClasses).addClass('slide-in');
		$('.snake-pit-popup').addClass('show');
		setTimeout(() => {
			$('.snake-pit-popup').addClass('fade-in');
		}, 50);
	}

	function transitionToStadiumOneScreen () {
		$('.container').attr('data-next', 'snake-pit-popup');
		pauseYoutubeVideo();
		$('.app-switcher-one').removeClass('hide');
		$('.app-switcher-two').removeClass('show');
		$('.snake-pit-popup').removeClass('fade-in');
		$('.drawer').removeClass(drawerContentChangingClasses).addClass('slide-in');
	}

	function transitionToStadiumTwoScreen () {
		$('.container').attr('data-next', 'section');
		pauseYoutubeVideo();
		$('.app-switcher-one').addClass('hide');
		$('.app-switcher-two').removeClass('show');
		$('.snake-pit-popup').removeClass('fade-in');
		$('.drawer').removeClass(drawerContentChangingClasses).addClass('slide-in');
		setTimeout(() => {
			$('.snake-pit-popup').removeClass('show');
		}, 550);
	}

	function transitionToQRScreens (nextStep, showNotification) {
		$('.container').attr('data-next', nextStep);
		pauseYoutubeVideo();
		$('.app-switcher-one').addClass('hide');
		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.app-switcher-two').removeClass('slide-left-one slide-left-two').addClass('show');
		if (showNotification) {
			$('.notification').addClass('slide-in');
		} else {
			$('.notification').removeClass('slide-in');
		}
	}








	function transitionToYoutubeScreen () {
		$('.container').attr('data-next', 'search-screen');
		pauseYoutubeVideo();
		if (youtubePlayer) {
			youtubePlayer.seekTo(81);
		}
		$('.youtube-ad').removeClass('show');
		hasShownYoutubeAd = false;

		$('.drawer').removeClass(drawerContentChangingClasses + ' slide-in');
		$('.app-switcher-two').removeClass('show');
		$('.app-switcher-one').removeClass('hide shrink slide-left rounded-corners');
	}

	function routeToScreen () {
		const hash = window.location.hash.replace('#', '');

		switch (hash) {
			case 'magick-flows--slide-0': {
				// transitionToGoogleSearchResultsScreen();
				normalTransition(0, false);
				break;
			}
			case 'magick-flows--slide-4': {
				// transitionToGoogleSearchResultsScreen();
				normalTransition(4, true);
				break;
			}

			case 'end': {
				// done
				normalTransition(0, false);
				break;
			}
			default: {
				let clicks = parseInt( window.location.hash.replace( '#magick-flows--slide-', '' ) ) || 0;
				console.log(`clicks: `, clicks);
				window.location.hash = `magick-flows--slide-${clicks}`;
				let doAppTransition = false

				normalTransition(clicks, doAppTransition);

			}
		}
	}

	window.onYouTubeIframeAPIReady = () => {
		youtubePlayer = new YT.Player('youtube-player', {
			height: '211',
			width: '375',
			videoId: '3tmd-ClpJxA',
			playerVars: {
				controls: 0,
				playsinline: 1,
				showinfo: 0,
				start: 81
			},
			events: {
				'onReady': () => {},
				'onStateChange': (e) => {
					if (e.data == YT.PlayerState.PLAYING) {
						youtubeVideoPlaying = true;
						if (!hasShownYoutubeAd) {
							hasShownYoutubeAd = true;
							clearTimeout(youtubeAdTimeout);
							youtubeAdTimeout = setTimeout(() => {
								$('.youtube-ad').addClass('show');
							}, 3000);
						}
					} else if (e.data == YT.PlayerState.ENDED || e.data == YT.PlayerState.PAUSED) {
						youtubeVideoPlaying = false;
					}
				}
			}
		});
	};

	$(window).on('hashchange', routeToScreen);

	$(document).ready(() => {
		$('.container, .youtube-ad').on('click', (e) => {
			e.preventDefault();
			window.location.hash = $('.container').attr('data-next');
		});

		routeToScreen();
	});
})();
