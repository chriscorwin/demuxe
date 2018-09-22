(function () {
	const drawerContentChangingClasses = 'section payment confirmation';
	let youtubeAdTimeout = {};
	let hasShownYoutubeAd = false;
	let youtubePlayer;
	let youtubeVideoPlaying = false;

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

	function transitionToHomepage1Screen () {
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
		$('.app-switcher-one').removeClass('hide shrink slide-left rounded-corners');
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
			case 'google-search-results': {
				transitionToGoogleSearchResultsScreen();
				break;
			}
			case 'youtube-screen': {
				transitionToYoutubeScreen();
				break;
			}
			case 'homepage-1-screen': {
				transitionToHomepage1Screen();
				break;
			}
			case 'search-screen': {
				transitionToSearchScreen();
				break;
			}
			case 'stadium-one': {
				transitionToStadiumOneScreen();
				break;
			}
			case 'snake-pit-popup': {
				transitionToSnakePitPopup();
				break;
			}
			case 'stadium-two': {
				transitionToStadiumTwoScreen();
				break;
			}
			case 'section': {
				commonTransition('section', 'payment');
				break;
			}
			case 'payment': {
				commonTransition('payment', 'confirmation');
				break;
			}
			case 'confirmation': {
				commonTransition('confirmation', 'break');
				break;
			}
			case 'break': {
				$('.container').attr('data-next', 'qr-screen-one');
				break;
			}
			case 'qr-screen-one': {
				transitionToQRScreens('qr-notification', false);
				break;
			}
			case 'qr-notification': {
				transitionToQRScreens('qr-screen-two', true);
				break;
			}
			case 'qr-screen-two': {
				transitionToQRScreens('instagram-screen', false);
				break;
			}
			case 'instagram-screen': {
				transitionToInstagramScreen();
				break;
			}
			case 'email-screen': {
				transitionToEmailScreen();
				break;
			}
			case 'end': {
				// done
				break;
			}
			default: {
				window.location.hash = 'google-search-results';
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
