window.FL = window.FL || {}; //use the FL object if it already exists, else start a new object
var swivelor = swivelor || {};
FL.swivelor = swivelor || {};
// removed the rloader plugin. or will be soon. in the meantime, use yepnope (which
// comes with Modernizr)
$.rloader([{
	type: 'css'
,	src: '/store/assets/styles/css/conditional/fl-bootstrap-swivelor.css'
}]);
swivelor.options = {
	autoHideControls: false
,	by: 1 // how many steps to take at a time in our images? default is 1

,	callbackFunctions: []
,	controlsHiderIsInitialized: 0
,	currentStepX: 0
,	currentStepY: 0
,	debug: false
,	displayInPopup: true
,	doIntro: true // do the intro spin at all?

,	doSwivel: false
,	fps: 100 // 25

,	givenFrameHeight: 533
,	givenFrameWidth: 800
,	grabRotateDistance: 800
,	hoverConfig: {}
,	href: "" // the place we go to when the swivelor is clicked --- defaults to doing nothing

,	imageIndexOffset: 1
,	infiniteAxisX: true
,	infiniteAxisY: false
,	initialPos: [0, 0]
,	introDelay: 250 // milliseconds -- how long it waits to START the intro spin

,	introDuration: .5 // in seconds - how long should it take to do the intro spin

,	introSpins: 1 // how many times should it spin around when the page loads?

,	maxFrameHeight: 533
,	maxFrameWidth: 800
,	maxSwivelStepsX: 39 // 40 images, zero-based index

,	maxSwivelStepsY: 1 //  no Y axis images yet -- so set this to "1". do NOT set it to "0" since we still need to do division on it

,	maxSwivelorDialogHeightPixels: 644
,	maxSwivelorDialogWidthPixels: 870
,	maxThrowDuration: .75
,	minSwivelorDialogHeightPixels: 644
,	minSwivelorDialogWidthPixels: 560
,	minThrowDuration: 0
,	rotationsPerSlideX: 0.25 //how many times the swivel happens as you drag a mouse horizontally along the draggable widget

,	rotationsPerSlideY: 1 // how many times the swivel happens as you drag a mouse vertically along the draggable widget. do NOT set to "0" becuase we will use it as a multiplier and divider, which will set the actual "Y swivel step to 0" if our maxSwivelStepsY is 1. follow that?

,	speed: 0
,	spinBackwards: false
,	stepHeightPixels: 533 //  this should eventually read in from a properties file

,	stepWidthPixels: 800 // this should eventually read in from a properties file

,	swivelDirection: "none"
,	swivelSteps: 0 // this is the ACTUAL number of steps -- the script will increment this number as it bulids the draggable widget

,	swivelX: true
,	swivelY: false
,	throwable: true
,	throwable: true // whether the thing is able to be "thrown" or not

,	useSprite: true
};
swivelor.options.minThrowFrames = Math.floor(swivelor.options.minThrowDuration * swivelor.options.fps);
swivelor.options.maxThrowFrames = Math.floor(swivelor.options.maxThrowDuration * swivelor.options.fps);
swivelor.frames = [[], []];
swivelor.throwSequence = [];
swivelor.arrayOfImages = [];
swivelor.imagesAreLoaded = false;
swivelor.positions = {
	given: {
		pageX: 0
	,	pageY: 0
	}
,	start: {
		pageX: 0
	,	pageY: 0
	}
,	current: {
		pageX: 0
	,	pageY: 0
	}
,	end: {
		pageX: 0
	,	pageY: 0
	}
};
swivelor.setUpSpinIntro = function() {
	var e = swivelor.options.fps * (swivelor.options.introDuration * 4),
		d = (typeof swivelor.options.introInitialRow != "undefined") ? swivelor.options.introInitialRow : swivelor.options.initialPos[1],
		j = d - swivelor.options.initialPos[1],
		g = [];
	for (var f = 0; f < e; f++) {
		var h = f / e,
			c = Math.pow(h - 1, 4);
		var b = Math.floor(c * swivelor.totalFrames[0] * swivelor.options.introSpins) + swivelor.options.initialPos[0];
		var a = Math.floor(c * j) + swivelor.options.initialPos[1];
		//console.info("/* spinIntro frames to throw */ e = (" + swivelor.options.fps + " * " + swivelor.options.introDuration + "); //" + e);
		//console.info("framesToThrow; // " + f);
		//console.info("h = (" + f + " / " + e + "); // " + h);
		//console.info("c = Math.pow(" + h + " - 1, 4); // " + c);
		if (!g.length || $(g).last()[0] != b || $(g).last()[1] != a) {
			var _toPush = swivelor.validatePos([b, a], true);
			//console.info("Pushing: " + _toPush + " into `g`");
			g.push(_toPush);
		}
	}
	swivelor.throwSequence = g;
	return g;
};
swivelor.totalFrames = [swivelor.options.maxSwivelStepsX, swivelor.options.maxSwivelStepsY];
swivelor.playIntervalDuration = 1000 / swivelor.options.fps;
swivelor.playing = false;
swivelor.grabbing = false;
swivelor.spinning = false;
swivelor.vertical_carousel = function(event, ui) {}
swivelor.startSwivel = function(event, ui) {
	//swivelor.cancelSwivelTimer();
	if (swivelor.playing) {
		swivelor.wasPlaying = true;
	}
	swivelor.pause();
	swivelor.stopThrowing();
	swivelor.options.doSwivel = true;
	swivelor.options.ui = ui;
	swivelor.options.event = event;
	swivelor.grabInitialMousePosition(event, ui);
	swivelor.updateStatusDisplay();
	swivelor.options.grabStartStepX = swivelor.options.currentStepX;
	swivelor.options.grabStartStepY = swivelor.options.currentStepY;
	//console.info("swivelor.options.currentStepX: " + swivelor.options.currentStepX);
	//console.info("swivelor.options.grabStartStepX: " + swivelor.options.grabStartStepX);
	swivelor.introSequence = [];
	//clearInterval(swivelor.introInterval);
	//swivelor.enableSwivelorControls();
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX, swivelor.options.currentStepY], true));
	$("body").addClass("grabbing").bind("mouseup", function() {
		$(this.nodeName).removeClass("grabbing");
	});
};
swivelor.grabInitialMousePosition = function(event, ui) {
	swivelor.positions.swivelPaneOffset = $(".swivel-pane").offset();
	swivelor.positions.swivelPaneWidth = $(".swivel-pane").width();
	swivelor.positions.swivelPaneHeight = $(".swivel-pane").height();
	swivelor.positions.given.pageX = event.pageX;
	swivelor.positions.given.pageY = event.pageY;
	swivelor.positions.start.pageX = event.pageX;
	swivelor.positions.start.pageY = event.pageY;
	swivelor.positions.current.pageX = event.pageX;
	swivelor.positions.current.pageY = event.pageY;
	swivelor.grabHistory = [{
		pageX: event.pageX
	,	pageY: event.pageY
	}];
	swivelor.mouseMoveHistory = [{
		pageX: event.pageX
	,	pageY: event.pageY
	}];
}
swivelor.updateGrabHistory = function(event) {
	swivelor.positions.given.pageX = event.pageX;
	swivelor.positions.given.pageY = event.pageY;
	//console.info("Updating grab history: pageX(" + swivelor.positions.given.pageX + "), pageY(" + swivelor.positions.given.pageY + ")");
	swivelor.grabHistory.unshift({
		pageX: event.pageX
	,	pageY: event.pageY
	});
	if ($(swivelor.grabHistory).length > 3) {
		$(swivelor.grabHistory).splice(3);
	}
};
swivelor.updateMouseMoveHistory = function(event) {
	//console.info("Updating grab history: pageX(" + swivelor.positions.given.pageX + "), pageY(" + swivelor.positions.given.pageY + ")");
	swivelor.mouseMoveHistory.unshift({
		pageX: event.pageX
	,	pageY: event.pageY
	});
	if (swivelor.mouseMoveHistory.length > 2) {
		swivelor.mouseMoveHistory.pop();
	}
};
swivelor.isPosLoaded = function(a) {
	return (typeof swivelor.frames[a[0]] != "undefined" && typeof swivelor.frames[a[0]][a[1]] != "undefined");
};
swivelor.stopSwivel = function(event, ui) {
	var theUI, theEvent;
	if (swivelor.options.ui === undefined && ui === undefined) {
		return;
	}
	else if (ui === undefined) {
		theUI = swivelor.options.ui;
	}
	else {
		theUI = ui;
	}
	if (swivelor.options.event === undefined && event === undefined) {
		return;
	}
	else if (event === undefined) {
		theEvent = swivelor.options.event;
	}
	else {
		theEvent = event;
	}
	//console.info("stop the swiveling!");
	//console.info("swivelor.playing; // " + swivelor.playing);
	//console.info("theEvent.pageX; // " + theEvent.pageX);
	//console.info("theEvent.pageY; // " + theEvent.pageY);
	if (swivelor.wasPlaying == true) {
		swivelor.wasPlaying = false;
		swivelor.play();
	}
	else {
		//console.info("stopSwivel is going to try to throw the stuff...");
		if (swivelor.options.throwable) {
			var m, l, f;
			m = theEvent.pageX - swivelor.mouseMoveHistory[1].pageX;
			l = theEvent.pageY - swivelor.mouseMoveHistory[1].pageY;
			f = true;
			//console.info("m; // " + m);
			//console.info("l; // " + l);
			//console.info("(m || l); // " + (m || l));
			if (m || l) {
				var j, h, c, b, o, n;
				j = Math.sqrt(Math.pow(m, 2) + Math.pow(l, 2));
				h = Math.floor(j / 5);
				// c and b are most previous places the mouse was, before the "drop"
				// happened, and the throw started
				// we use these to determine "mouse speed" and see how far we should throw
				c = swivelor.mouseMoveHistory[1].pageX;
				b = swivelor.mouseMoveHistory[1].pageY;
				// o and n are things we will set to false as we go, in order to determin when to stop pushing new frames into the throw sequence array
				o = true;
				n = true;
				if (h < swivelor.options.minThrowFrames) {
					h = swivelor.options.minThrowFrames;
				}
				else {
					if (h > swivelor.options.maxThrowFrames) {
						h = swivelor.options.maxThrowFrames;
					}
				}
				swivelor.throwSequence = [];
				var _tempThrowSequence = [];
				for (var e = 0; e < h; e++) {
					var g, d, k;
					// e is the frame number we are on now
					// h is the total number of frames to step through on the throw
					// so, it's like saying like "how far through the steps are we?"
					g = e / h;
					// d is g minus 1 (because of zero-based indexing), raised to the second power
					// this gets it well into positive territory, so that we do multiplication with it
					if (swivelor.spinBackwards == true) {
						d = Math.pow((g) - 1, 2);
					}
					else {
						d = Math.pow((g) - 1, 2) * -1;
					}
					// c and b were defined above -- now we are modifying them with "d" and adding them to their previous values
					// this will yield a frame number that is something akin to:
					// "how far along we are in the sequence TIMES how far we should travel past the "mouse dropped" position.
					c = Math.floor(d * m) + c;
					b = Math.floor(d * l) + b;
					// once we've obtained "c" and "b" we send them off to get a "grabPosition" for them
					// getGrabPos will return frame numbers outside of our "max steps" values --- which is fine because...
					// we then send THAT grab position to the position validator, which will return a values
					k = swivelor.validatePos(swivelor.getGrabPos({
						pageX: c
					,	pageY: b
					}), true);
					//console.info("k; // " + k);
					if (!o) {
						k[0] = _tempThrowSequence.last()[0];
					}
					else {
						if (_tempThrowSequence.length && k[0] == _tempThrowSequence.last()[0]) {
							o = false;
						}
					}
					if (!n) {
						k[1] = _tempThrowSequence.last()[1];
					}
					else {
						if (_tempThrowSequence.length && k[1] == _tempThrowSequence.last()[1]) {
							n = false;
						}
					}
					//console.info("Pushing K into _tempThrowSequence: " + k);
					_tempThrowSequence.push(k);
				}
				if (f) {
					//console.info("setting throwing to true!");
					swivelor.throwing = true;
					// saveTheG is more or less just for debugging --- it allows us to access the "last known" throw sequence
					// variable, which itself will be decrimented as throwStep pops nodes off of it
					swivelor.saveTheG = $.merge([], _tempThrowSequence);
					//console.info("swivelor.saveTheG; // " + swivelor.saveTheG);
					//console.info("swivelor.saveTheG.length; // " + swivelor.saveTheG.length);
					// now we merge our _tempThrowSequence into the "real" one, and turn the throw swiveling on
					// once the swivelor.throwSequence array is empty, the throwStep function will turn the throwing off
					swivelor.throwSequence = $.merge([], _tempThrowSequence);
					FL.globalTimer.callbackFunctionAdd("swivelor.throwStep");
				}
			}
		}
	}
}
swivelor.updateStatusDisplay = function() {
	if (swivelor.options.debug == true) {
		$("#swivelor-options-currentStepX .count").html(swivelor.options.currentStepX);
		$("#swivelor-positions-startX .count").html(swivelor.positions.startX);
		$("#swivelor-positions-currentX .count").html(swivelor.positions.currentX);
		$("#swivelor-positions-differenceX .count").html(swivelor.positions.differenceX);
		$("#swivelor-positions-difference_startX_leftX .count").html(swivelor.positions.difference_startX_leftX);
		$("#swivelor-positions-difference_currentX_leftX .count").html(swivelor.positions.difference_currentX_leftX);
		$("#swivelor-positions-difference_startX_rightX .count").html(swivelor.positions.difference_startX_rightX);
		$("#swivelor-positions-difference_currentX_rightX .count").html(swivelor.positions.difference_currentX_rightX);
		$("#swivelor-positions-leftX .count").html(swivelor.positions.leftX);
		$("#swivelor-positions-start-pageX .count").html(swivelor.positions.start.pageX);
		$("#swivelor-positions-current-pageX .count").html(swivelor.positions.current.pageX);
		$("#swivelor-positions-swivelDirectionX .count").html(swivelor.positions.swivelDirectionX);
		$("#swivelor-throwSequence .count").html(swivelor.throwSequence.length);
	}
}
swivelor.updateStep = function(param) {
	//console.info("jQuery.isArray(param); //" + jQuery.isArray(param) + " (" + param + ")");
	var _previousStep, _newStep;
/*
	b = swivelor.validatePos(b);
	if (!a && swivelor.atPosition(b)) {
	return
	}
	swivelor.currentPos = b;
	 */
	if (jQuery.isArray(param)) {
		_newStep = (param);
		swivelor.options.currentStepX = _newStep[0];
		swivelor.options.currentStepY = _newStep[1];
	}
	else {
		if (parseInt(param) >= 0 && parseInt(param) <= swivelor.options.maxSwivelStepsX) {
			_newStep = parseInt(param);
			if (_newStep >= swivelor.options.maxSwivelStepsX) {
				//swivelor.options.currentStepX = _newStep;
				swivelor.options.currentStepX = 0;
				swivelor.options.currentStepY = 0;
			}
			else {
				swivelor.options.currentStepX = _newStep;
				swivelor.options.currentStepY = _newStep;
			}
		}
	}
	_previousStep = [swivelor.options.currentStepX, swivelor.options.currentStepY];
/*
	else if (param == "left" || param == "down") {
	if (swivelor.options.currentStepX >= swivelor.options.maxSwivelStepsX) {
	swivelor.options.currentStepX = 0;
	}
	else {
	swivelor.options.currentStepX = swivelor.options.currentStepX + swivelor.options.by;
	}
	}
	else if (param == "right" || param == "up") {
	if (swivelor.options.currentStepX <= 0) {
	swivelor.options.currentStepX = swivelor.options.maxSwivelStepsX;
	}
	else {
	swivelor.options.currentStepX = swivelor.options.currentStepX - swivelor.options.by;
	}
	}
	 */
	swivelor.updateStatusDisplay();
	return [swivelor.options.currentStepX, swivelor.options.currentStepY];
}
swivelor.keepSwiveling = function(event, ui) {
	var theUI, theEvent, newStepIndexAttr, newStepIndex, _potentialNewStep, _potentialNewStepX, _potentialNewStepY, _totalFramesToSwivelX, _whatPercentPerMouseMoveX, _whatPercentToMoveThisTimeX;
	//console.group(swivelor.options.grabStartStepX);
	//console.info("swivelor.options.currentStepX: " + swivelor.options.currentStepX);
	//console.info("swivelor.options.grabStartStepX: " + swivelor.options.grabStartStepX);
	if (swivelor.trowing) {
		return;
	}
	if (swivelor.options.doSwivel != true) {
		//console.info("shit, why is swivelor.options.doSwivel false? ");
		return;
	}
	if (swivelor.options.ui === undefined && ui === undefined) {
		return;
	}
	else if (ui === undefined) {
		theUI = swivelor.options.ui;
	}
	else {
		theUI = ui;
	}
	if (swivelor.options.event === undefined && event === undefined) {
		return;
	}
	else if (event === undefined) {
		theEvent = swivelor.options.event;
	}
	else {
		theEvent = event;
	}
	swivelor.options.ui = theUI;
	swivelor.options.event = theEvent;
	if (swivelor.playing == true) {
		swivelor.wasPlaying = true;
		swivelor.pause();
	}
	swivelor.updateMouseMoveHistory(theEvent);
	if (swivelor.options.doSwivel == true) {
		//console.info("swivelor.options.currentStepX (doSwivel is true): " + swivelor.options.currentStepX);
		swivelor.$surface = $(theEvent.target);
		// how many pixels the left-hand side of the swivel panel is from the left-hand side of the viewport
		swivelor.positions.leftX = (swivelor.positions.swivelPaneOffset.left);
		// how many pixels the right-hand side of the swivel panel is from the left-hand side of the viewport
		//swivelor.positions.rightX = (swivelor.positions.swivelPaneOffset.left + swivelor.positions.swivelPaneWidth);
		// how many pixels the uppermost side of the swivel panel is from top of the viewport
		swivelor.positions.upY = (swivelor.positions.swivelPaneOffset.top);
		// how many pixels the bottommost side of the swivel panel is from top of the viewport
		//swivelor.positions.downY = (swivelor.positions.swivelPaneOffset.top + swivelor.positions.swivelPaneHeight);
		// the "mouse down" spot (with the offset being accounted for)
		swivelor.positions.startX = (swivelor.positions.start.pageX - swivelor.positions.leftX);
		swivelor.positions.startY = (swivelor.positions.start.pageY - swivelor.positions.upY);
		// where the mouse currently is (with the offset being accounted for)
		swivelor.positions.currentX = (swivelor.positions.current.pageX - swivelor.positions.leftX);
		swivelor.positions.currentY = (swivelor.positions.current.pageY - swivelor.positions.upY);
		// the difference, in pixels, between where the mouse started, and where the mouse is
		// example: [left of the mousedown] (322 âˆ’ 156) Ã— âˆ’1 = -166
		// example: [right of the mousedown] (322 âˆ’ 751) Ã— âˆ’1 = 429
		swivelor.positions.differenceX = ((swivelor.positions.startX - swivelor.positions.currentX) * -1);
		if (swivelor.spinBackwards != true) {
			swivelor.positions.differenceX = swivelor.positions.differenceX * -1;
		}
		// example: [above the mousedown] (250 âˆ’ 97) Ã— âˆ’1 = -153
		// example: [below of the mousedown] (250 âˆ’ 426) Ã— âˆ’1 = 176
		swivelor.positions.differenceY = ((swivelor.positions.startY - swivelor.positions.currentY) * -1);
		// example: 39 * 1.25 == 48.75
		_totalFramesToSwivelX = (swivelor.options.maxSwivelStepsX * swivelor.options.rotationsPerSlideX);
		// example: 1 * 1 == 1
		_totalFramesToSwivelY = (swivelor.options.maxSwivelStepsY * swivelor.options.rotationsPerSlideY);
		// example: (800 / 48.75) / 2 = 8.205128205
		_whatPercentPerMouseMoveX = ((swivelor.positions.swivelPaneWidth / _totalFramesToSwivelX) / 2);
		// example: (533 / 1) / 2 = 266.5
		_whatPercentPerMouseMoveY = ((swivelor.positions.swivelPaneHeight / _totalFramesToSwivelY) / 2);
		// example: [left of the mousedown] -166 Ã· 8.205128205 = âˆ’20.23125
		// example: [right of the mousedown] 429 Ã· 8.205128205 = 52.284375001
		_whatPercentToMoveThisTimeX = (swivelor.positions.differenceX / _whatPercentPerMouseMoveX);
		// example: [above the mousedown] -153 Ã· 266.5 = âˆ’0.574108818
		// example: [below of the mousedown] 176 Ã· 266.5 = 0.660412758
		_whatPercentToMoveThisTimeY = (swivelor.positions.differenceY / _whatPercentPerMouseMoveY);
		// example: [left of the mousedown] Math.floor(âˆ’20.23125) = -21
		// example: [right of the mousedown] Math.floor(52.284375001) = 52
		_potentialNewStepX = swivelor.options.grabStartStepX + Math.floor(_whatPercentToMoveThisTimeX);
		// example: [above the mousedown] Math.floor(âˆ’0.574108818) = 0
		// example: [below of the mousedown] Math.floor(0.660412758) =0
		_potentialNewStepY = swivelor.options.grabStartStepY + Math.floor(_whatPercentToMoveThisTimeY);
		_potentialNewStep = swivelor.validatePos([_potentialNewStepX, _potentialNewStepY], true);
		newStepIndexAttr = $('#swiveler-step-' + _potentialNewStep[0]).attr('index');
		newStepIndex = $('#swiveler-step-' + _potentialNewStep[0]).index();
		if ((theUI.position.left > (swivelor.options.stepWidthPixels * -1)) && (swivelor.options.doSwivel == true)) {
			newLeft = (theUI.position.left - (swivelor.options.stepWidthPixels));
			swivelor.$surface.css('left', newLeft + 'px');
			theUI.position.left = newLeft;
		}
		if (_potentialNewStepX == swivelor.options.currentStepX) {
			return;
		}
		//console.info("_potentialNewStep; // " + _potentialNewStep);
		//console.info("newStepIndex; // " + newStepIndex);
		swivelor.gotoPos(_potentialNewStep);
	}
	//console.groupEnd();
}
swivelor.atPosition = function(a) {
	return (a[0] == swivelor.options.currentStepX && a[1] == swivelor.options.currentStepY);
}
swivelor.play = function() {
	if (swivelor.playing) {
		return;
	}
	//console.info("Begin play!");
	//swivelor.pause();
	//swivelor.stopSwivel();
	swivelor.playing = true;
	FL.globalTimer.callbackFunctionAdd("swivelor.gotoPrevFrameX");
	$("#forward, #rewind").blur().button("disable").button("refresh");
	$("#play").focus().button("refresh");
	//swivelor.playInterval = setInterval(swivelor.gotoNextFrameX, swivelor.playIntervalDuration)
};
swivelor.pause = function() {
	//console.info("Pause play!");
	$("#forward, #rewind").blur().button("enable").button("refresh");
	$("#play").focus().button("refresh");
	FL.globalTimer.callbackFunctionRemove("swivelor.gotoNextFrameX");
	FL.globalTimer.callbackFunctionRemove("swivelor.gotoPrevFrameX");
	swivelor.playing = false;
	//swivelor.stopSwivel();
	if (swivelor.playing != true) {
		return;
	}
};
swivelor.gotoNextFrameX = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX + 1, swivelor.options.currentStepY], true));
};
swivelor.gotoNextFrameY = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX, swivelor.options.currentStepY + 1], true));
};
swivelor.gotoNextFrame = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX + 1, swivelor.options.currentStepY + 1], true));
};
swivelor.gotoPrevFrameX = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX - 1, swivelor.options.currentStepY], true));
};
swivelor.gotoPrevFrameY = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX, swivelor.options.currentStepY - 1], true));
};
swivelor.gotoPrevFrame = function() {
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX - 1, swivelor.options.currentStepY - 1], true));
};
swivelor.gotoPos = function(posArray) {
	//console.info("Position: " + b[0] + ", " + b[1]);
	posArray = swivelor.validatePos(posArray);
	//console.info("swivelor.atPosition(b); // " + swivelor.atPosition(b));
/*
	if (swivelor.atPosition(b)) {
	return
	}
	 */
	swivelor.currentPos = posArray;
	swivelor.frame = $("#" + swivelor.frames[posArray[0]]);
	//console.info("Position: " + b[0] + ", " + b[1]);
	//console.info("frame: " + swivelor.frame);
	if (typeof swivelor.frame != "undefined") {
		swivelor.currentFrame = swivelor.frame;
		newStep = posArray[0];
		newStepIndex = $('#swiveler-step-' + posArray[0]).index();
		swivelor.updateStep(posArray);
		//console.info("swivelor.$surface: " + swivelor.$surface);
		swivelor.$surface.find('.swivel-content-item').slice(newStepIndex).prependTo(swivelor.$surface);
		//console.info("Current Frame: " + swivelor.currentFrame.find("img").attr("css"));
	}
};
swivelor.playIntro = function() {
	swivelor.unBindKeyboardShortcuts();
	swivelor.disableSwivelorControls();
	swivelor.stopThrowing();
	swivelor.introSequence = swivelor.setUpSpinIntro();
	swivelor.introInterval = setInterval(swivelor.gotoNextIntroFrame, swivelor.playIntervalDuration);
};
swivelor.gotoNextIntroFrame = function() {
	//$.makeArray(swivelor.introSequence);
	swivelor.gotoPos(swivelor.introSequence.shift());
	if (!swivelor.introSequence.length) {
		swivelor.bindKeyboardShortcuts();
		swivelor.enableSwivelorControls();
		clearInterval(swivelor.introInterval);
		//swivelor.makeInteractive()
	}
};
swivelor.throwStep = function() {
	//console.dir(swivelor.throwSequence);
	//console.info("FL.globalTimer.callbackFunctions; //" + FL.globalTimer.callbackFunctions);
	//console.info("swivelor.throwSequence.length; // " + swivelor.throwSequence.length);
	if (swivelor.throwSequence.length) {
		swivelor.options.grabStartStepX = swivelor.throwSequence[0][0];
		swivelor.options.grabStartStepY = swivelor.throwSequence[0][1];
		swivelor.gotoPos(swivelor.throwSequence.shift());
		if (!swivelor.throwSequence.length) {
			swivelor.stopThrowing();
		}
	}
	else {
		swivelor.stopThrowing();
	}
};
swivelor.stopThrowing = function() {
	//swivelor.spinDown();
	//console.info("setting throwing to false!");
	//console.info("swivelor.throwSequence; // " + swivelor.throwSequence);
	//console.info("FL.globalTimer.callbackFunctions; // " + FL.globalTimer.callbackFunctions);
	//alert("setting throwing to false");
	swivelor.throwSequence = [];
	swivelor.throwing = false;
	swivelor.completeSpinDown();
	FL.globalTimer.callbackFunctionRemove("swivelor.throwStep");
	//console.info("FL.globalTimer.callbackFunctions; // (after) " + FL.globalTimer.callbackFunctions);
	//clearInterval(swivelor.throwInterval);
	if (!swivelor.throwing) {
		return;
	}
};
swivelor.getGrabPos = function(d) {
	var i, h, e, b, g, f, c, a;
	i = d.pageX - swivelor.positions.start.pageX;
	h = d.pageY - swivelor.positions.start.pageY;
	e = i / swivelor.options.grabRotateDistance;
	b = h / swivelor.options.grabRotateDistance;
	g = Math.round(swivelor.options.maxSwivelStepsX * e);
	f = Math.round(swivelor.options.maxSwivelStepsY * b);
	c = swivelor.positions.start.pageX + g;
	a = swivelor.positions.start.pageY + f;
	//console.group("getGrabPos");
	//console.info("i; // " + i);
	//console.info("d.pageX; // " + d.pageX);
	//console.info("swivelor.positions.start.pageX; // " + swivelor.positions.start.pageX);
	//console.info("h; // " + h);
	//console.info("d.pageY; // " + d.pageY);
	//console.info("swivelor.positions.start.pageY; // " + swivelor.positions.start.pageY);
	//console.info("e; // " + e);
	//console.info("swivelor.options.grabRotateDistance; // " + swivelor.options.grabRotateDistance);
	//console.info("b; // " + b);
	//console.info("g; // " + g);
	//console.info("swivelor.options.maxSwivelStepsX; // " + swivelor.options.maxSwivelStepsX);
	//console.info("f; // " + f);
	//console.info("c; // " + c);
	//console.info("a; // " + a);
	//console.groupEnd();
	return [c, a]
};
swivelor.validatePos = function(c, b) {
	if (typeof c === "undefined") {
		//console.error("c: " + c);
		swivelor.stopThrowing();
		return;
	}
	try {
		var msg = ("c[0], c[1]: " + c[0] + ", " + c[1]);
		//console.info(msg);
	}
	catch (e) {
		//console.error("c: " + c);
		swivelor.stopThrowing();
		return;
	}
	for (var a = 0; a < 2; a++) {
		if (b || swivelor.options.infiniteAxisX) {
			while (c[a] > swivelor.options.maxSwivelStepsX) {
				c[a] -= (swivelor.options.maxSwivelStepsX + 1);
			}
			while (c[a] < 0) {
				c[a] += swivelor.options.maxSwivelStepsX;
			}
		}
		else {
			if (c[a] > swivelor.options.maxSwivelStepsX - 1) {
				c[a] = swivelor.options.maxSwivelStepsX - 1;
			}
			if (c[a] < 0) {
				c[a] = 0;
			}
		}
	}
	return c
};
/*
swivelor.spinDown = function(){
//swivelor.$surface = $(".swivel-content-items.ui-draggable");
//swivelor.options.introInitialRow
swivelor.cancelSwivelTimer();
swivelor.options.runSwivelCountdownTimerDisplay = true;
//call the completeSpinDown after a certain amount of time
if (swivelor.options.debug == true) {
$("#spinDownTimerCount .count").html(2500);
}
swivelor.spinDownTimeoutID = window.setTimeout(swivelor.completeSpinDown, 2500);
};
 */
/*
swivelor.cancelSwivelTimer = function(){
swivelor.options.runSwivelCountdownTimerDisplay = false;
if (typeof swivelor.spinDownTimeoutID == "number") {
window.clearTimeout(swivelor.spinDownTimeoutID);
delete swivelor.spinDownTimeoutID;
}
}
 */
swivelor.completeSpinDown = function() {
	swivelor.positions.start.pageX = 0;
	swivelor.positions.start.pageY = 0;
	swivelor.positions.current.pageX = 0;
	swivelor.positions.current.pageY = 0;
	swivelor.positions.swivelDirectionX = "none";
	swivelor.options.doSwivel = false;
	//swivelor.options.runSwivelCountdownTimerDisplay = false;
	//if (swivelor.options.debug == true) {
	//	alert("Spin down complete!");
	//}
	swivelor.updateStatusDisplay();
};
swivelor.horizontal_carousel = function(event, ui) {
	//console.info("ui.position.left: " + ui.position.left);
	//console.info("swivelor.options.doSwivel; // " + swivelor.options.doSwivel);
	swivelor.positions.given.pageX = event.pageX;
	swivelor.positions.given.pageY = event.pageY;
	//swivelor.positions.start.pageX = swivelor.positions.given.pageX;
	//swivelor.positions.start.pageY = swivelor.positions.given.pageY;
	swivelor.positions.current.pageX = event.pageX;
	swivelor.positions.current.pageY = event.pageX;
/*
	swivelor.positions.given.pageX = event.pageX - swivelor.positions.swivelPaneOffset.left;
	swivelor.positions.given.pageY = event.pageY - swivelor.positions.swivelPaneOffset.top;
	swivelor.positions.current.pageX = swivelor.positions.given.pageX;
	swivelor.positions.current.pageY = swivelor.positions.given.pageY;
	 */
	swivelor.updateStatusDisplay();
	swivelor.keepSwiveling(event, ui);
};
swivelor.preload = function(arrayOfImages) {
	$(arrayOfImages).each(function(index, value) {
		//console.info("pushing into arrayOfImages (index, value): " + index + ", " + value);
		//console.info("arrayOfImages.length; // " + arrayOfImages.length);
		$('<img/>')[0].src = this;
		if ((index + 1) == arrayOfImages.length) {
			swivelor.imagesAreLoaded = true;
		}
		else {
			swivelor.imagesAreLoaded = false;
		}
		//console.info("swivelor.imagesAreLoaded; // " + swivelor.imagesAreLoaded);
		// Alternatively you could use:
		// (new Image()).src = this;
	});
};
swivelor.test = function() {
	//console.info("swivelor.test called");
};
swivelor.setUpGrabbable = function() {
	swivelor.introSequence = [];
	clearInterval(swivelor.introInterval);
	swivelor.enableSwivelorControls();
	//console.log("swivelor.options.stepWidthPixels", swivelor.options.stepWidthPixels);
	swivelor.$swivelContentItems.draggable({
		axis: 'x'
	,	grid: [(swivelor.options.stepWidthPixels * 1), 0]
	,	drag: swivelor.horizontal_carousel
	,	start: swivelor.startSwivel
	,	stop: swivelor.stopSwivel
	});
	$('.ui-widget-overlay').one("click", function() {
		$("#swivelWrapper").dialog('close');
	});
};
swivelor.init = function() {
	swivelor.options.doSwivel = true;
/*
	$("#productDetail #leftColumn .altImage").css({
		width: "44px",
		height: "44px"
	});
	*/
	$("#productDetail #leftColumn .altImage").last().css({
		"float": "right"
	});
	$("#alternateViews").append('<a  id="launchSwivel" href="#360"><img src="/media/images/swivel-images/360-icon.png" alt="Click to see a 360 degree view of the product"></a>');

	$("#launchSwivel").css({
		border: 0
	,	position: 'absolute'
	,	top: ((($("#productDetailsMainproductName").height() + $("#productImages").height()) - 5) + 'px')
	,	left: (($("#productImages").width() - 20) + 'px')
	}).one('click', swivelor.setup).focus();
};
swivelor.reinit = function() {
	//console.info("re initting!");
	//clearInterval(swivelor.introInterval);
	//swivelor.enableSwivelorControls();
	$("#launchSwivel").one('click', function() {
		//console.info("clicked!");
		$("object, embed").hide();
		$('#swivelWrapper').dialog('open');
		$('.ui-widget-overlay').one("click", function() {
			$("#swivelWrapper").dialog('close');
		});
		swivelor.bindKeyboardShortcuts();
		if (swivelor.options.doIntro == true) {
			swivelor.introSequence = swivelor.setUpSpinIntro();
			window.setTimeout(swivelor.playIntro, (swivelor.options.introDelay + 250));
		}
/*
		else {
		swivelor.setUpGrabbable();
		}
		 */
	}).focus();
};
swivelor.hideSwivelor = function() {
	$("object, embed").show();
	swivelor.pause();
	//$("#launchSwivel").button('enable').unbind('click');
	$("#launchSwivel").unbind('click');
	// unbind our custom keyboar shortcuts to handl left & right arrows, the spacebar, and clicking outside the dialog
	swivelor.unBindKeyboardShortcuts();
	// reinit sets the "360" button back up to open the dialog -- when the dialog launches it will re-bind the keyboard shortcuts
	swivelor.reinit();
};
swivelor.unBindKeyboardShortcuts = function() {
	$('body, .ui-widget-overlay, html').unbind();
};
swivelor.enableSwivelorControls = function() {
	$("#forward, #play, #rewind").button('enable').button("refresh");
};
swivelor.disableSwivelorControls = function() {
	$("#forward, #play, #rewind").button('disable').button("refresh");
};
swivelor.bindKeyboardShortcuts = function() {
	$('body').keydown(function(event) {
		// handle cursor keys
		if (event.keyCode == 37) {
			//console.info("left arrow key pressed");
			$("#rewind").trigger('click');
		}
		else if (event.keyCode == 39) {
			//console.info("right arrow key pressed");
			$("#forward").trigger('click');
		}
	});
	$('body').click(function(event) {
		// handle spacebar
		//console.info("outside clicked!");
		event.stopPropagation();
		if ($("#play").is(":focus")) {
			//console.info("outside clicked: #play already has focus");
		}
		else {
			if ($(event.target).hasClass("ui-widget-overlay")) {
				//console.info("outside clicked: #play DOES NOT have focus, give it to it");
				$("#play").focus().button("refresh");
			}
		}
	});
	$(".ui-widget-overlay").click(function() {
		$(".ui-dialog-titlebar-close").trigger('click');
	});
	$('body, .ui-widget-overlay, html').keypress(function(event) {
		// handle spacebar
		if (event.keyCode == 32) {
			//console.info("spacebar pressed!");
			event.preventDefault();
			if ($("#play").is(":focus")) {
				//console.info("spacebar pressed: #play has focus");
			}
			else {
				//console.info("spacebar pressed: #play DOES NOT have focus");
				$("#play").trigger('click');
			}
		}
	});
}
swivelor.resetPositions = function() {
	//console.group("stop");
	//console.info("swivelor.options.currentStepX; // " + swivelor.options.currentStepX);
	var _newIndex = swivelor.options.currentStepX;
	swivelor.$swivelContentItems.children().each(function(index) {
		var _prevIndex = $(this).attr("index");
		var _prevID = $(this).attr("id");
		//console.info(index + ": " + _prevID + " id's index is: " + _prevIndex);
		//console.info(index + ": index (before): " + $(this).attr("index"));
		$(this).attr("index", _newIndex);
		//console.info(index + ": " + _prevID + " id's new index is: " + _newIndex);
		$(this).children().first().css({
			backgroundPosition: ((_newIndex * swivelor.options.stepWidthPixels) * -1) + 'px 0px'
		});
		//console.info(index + " (after): " + $(this).attr("id"));
	});
	//console.groupEnd();
/*
	while (_index <= swivelor.options.maxSwivelStepsX) {
	var loop_value = _index;
	if (loop_value <= 9 && loop_value >= 0) {
	loop_value = "00" + loop_value;
	}
	else if (loop_value <= 100 && loop_value >= 10) {
	loop_value = "0" + loop_value;
	}
	if (swivelor.options.useSprite == true) {
	swivelor.$swivelContentItems.append('<div id="swiveler-step-' + swivelor.options.swivelSteps + '" class="swivel-content-item "><div style="width: ' + swivelor.options.stepWidthPixels + 'px; height: ' + swivelor.$swivelContentItems.children().first().height() + 'px; background-image: url(/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-sprite__y-000__z-' + swivelor.options.zAxis + '.jpg); background-position: ' + ((swivelor.options.swivelSteps * swivelor.options.stepWidthPixels) * -1) + 'px 0px; float: left; clear: none;"><span class="none">&nbsp;</span></div></div>');
	}
	else {
	swivelor.arrayOfImages.push('/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-' + loop_value + '__y-000__z-' + swivelor.options.zAxis + '.jpg');
	swivelor.$swivelContentItems.append('<div id="swiveler-step-' + swivelor.options.swivelSteps + '" class="swivel-content-item "><img width=' + swivelor.options.stepWidthPixels + ' src="/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-' + loop_value + '__y-000__z-' + swivelor.options.zAxis + '.jpg"></div>');
	}
	swivelor.frames[swivelor.options.swivelSteps] = 'swiveler-step-' + swivelor.options.swivelSteps;
	swivelor.options.swivelSteps = swivelor.options.swivelSteps + swivelor.options.by;
	}
	 */
};
swivelor.setup = function() {
	$("object, embed").hide();
	swivelor.bodyClass = $('body.swivelor').attr('class').split(' ');
	swivelor.bodyClass = swivelor.bodyClass.unique();
	swivelor.bodyClass = jQuery.grep(swivelor.bodyClass, function(value) {
		return value != "";
	});
	swivelor.productID = jQuery.grep(swivelor.bodyClass, function(value) {
		if (value.indexOf('swivelorProduct-') === 0) {
			return value;
		}
	})[0].substring(16);
	var _foundGoodSize = false;
	swivelor.zindices = [1200, 800, 500, 255, 150, 75, 48];
	$.each(swivelor.zindices, function(index, value) {
		if (_foundGoodSize == false) {
			$.ajax({
				url: "/media/images/swivel-images/" + swivelor.productID + "/z-" + value + "/y-000/directory-properties.json"
			,	dataType: "json"
			,	cache: false
			,	async: false
			,	success: function(data) {
					//console.log("ajax call success data", data);
					// grabRotateDistance, stepWidthPixels, stepHeightPixels
					if (data.images_width != "" && data.images_height != "") {
						if (data.images_width > swivelor.options.maxFrameWidth || data.images_height > swivelor.options.maxFrameHeight) {}
						else {
							_foundGoodSize = true;
							swivelor.options.stepWidthPixels = data.images_width;
							swivelor.options.givenFrameWidth = data.images_width;
							if (data.images_width > swivelor.options.maxFrameWidth) {
								swivelor.options.grabRotateDistance = swivelor.options.maxFrameWidth;
							}
							else {
								swivelor.options.grabRotateDistance = data.images_width;
							}
							swivelor.options.stepHeightPixels = data.images_height;
							swivelor.options.givenFrameHeight = data.images_height;
						}
						//console.log("data.images_spinBackwards", data.images_spinBackwards);
						if (data.images_spinBackwards != "") {
							swivelor.options.spinBackwards = data.images_spinBackwards;
						}
						//console.log("swivelor.defaultOptions.maxSwivelStepsX", swivelor.defaultOptions.maxSwivelStepsX);
						//console.log("data.images_numberOf", data.images_numberOf);
						//console.log("swivelor.options.maxSwivelStepsX", swivelor.options.maxSwivelStepsX);
						swivelor.options.zAxis = data['images_z-axis'];
						//swivelor.options.zAxis = 800;
						swivelor.options.maxSwivelStepsX = (parseInt(data.images_numberOf) - 1);
						//console.log("swivelor.options.maxSwivelStepsX", swivelor.options.maxSwivelStepsX);
						//console.log("swivelor.options.speed", swivelor.options.speed);
						//console.log("swivelor.options.speed", swivelor.options.speed);
					}
					else {
						//console.error("not setting stepWidthPixels");
					}
				}

			,	error: function(data) {
					//console.error("ajax call errored");
					//console.log("data", data);
				}
			});
		}
		else {
			//console.log("Found a good size now");
		}
	});
	//console.info("swivelor.productID; // " + swivelor.productID);
	swivelor.$body = $('<div id="swivelWrapper" class="swivel-paneWrapper"><div class="productImageWrapper swivel-pane "><div class="swivel-content"><div class="swivel-content-items"><div class="swivel-content-item "><img height="255" width="255" style="margin-top: 50px;" src="/media/images/product-grid/quick_looks_background.gif" alt="Loading..."></div></div></div></div><div id="swivel-controlsWrapper"><div id="swivel-controls"><span id="swivel-toolbar" class="ui-widget-header ui-corner-all"><button id="rewind" >Previous Frame</button><button id="play">Play</button><button id="forward">Next Frame</button></span></div></div></div>');
	//$("#launchSwivel").button('disable').unbind('click');
	$("#launchSwivel").unbind('click');
	$('body').append(swivelor.$body);
	$("#forward").button({
		text: false
	,	icons: {
			primary: "ui-icon-seek-next"
		}
	}).click(function() {
		if (swivelor.playing != true) {
			if (swivelor.spinBackwards == true) {
				swivelor.gotoNextFrameX();
			}
			else {
				swivelor.gotoPrevFrameX();
			}
		}
	});
	$("#rewind").button({
		text: false
	,	icons: {
			primary: "ui-icon-seek-prev"
		}
	}).click(function() {
		if (swivelor.playing != true) {
			if (swivelor.spinBackwards == true) {
				swivelor.gotoPrevFrameX();
			}
			else {
				swivelor.gotoNextFrameX();
			}
		}
	});
	$("#play").button({
		text: false
	,	icons: {
			primary: "ui-icon-play"
		}
	}).click(function() {
		var options;
		if (swivelor.playing != true) {
			options = {
				label: "Pause"
			,	icons: {
					primary: "ui-icon-pause"
				}
			};
			swivelor.play();
		}
		else {
			options = {
				label: "Play (spacebar)"
			,	icons: {
					primary: "ui-icon-play"
				}
			};
			swivelor.pause();
			//$("#forward, #rewind").button("enable").button("refresh");
		}
		$(this).button("option", options);
	});
	//console.info("set up the dialog now...");
	$(".productImageWrapper.swivel-pane").css({
		width: swivelor.options.grabRotateDistance
	});
	swivelor.options.swivelorDialogWidthPixels = (swivelor.options.stepWidthPixels + 102);
	swivelor.options.swivelorDialogHeightPixels = (swivelor.options.stepHeightPixels + 154);
	if (swivelor.options.swivelorDialogWidthPixels < swivelor.options.minSwivelorDialogWidthPixels) {
		swivelor.options.swivelorDialogWidthPixels = swivelor.options.minSwivelorDialogWidthPixels;
	}
	if (swivelor.options.swivelorDialogWidthPixels > swivelor.options.maxSwivelorDialogWidthPixels) {
		swivelor.options.swivelorDialogWidthPixels = swivelor.options.maxSwivelorDialogWidthPixels;
	}
	if (swivelor.options.swivelorDialogHeightPixels < swivelor.options.minSwivelorDialogHeightPixels) {
		swivelor.options.swivelorDialogHeightPixels = swivelor.options.minSwivelorDialogHeightPixels;
	}
	if (swivelor.options.swivelorDialogHeightPixels > swivelor.options.maxSwivelorDialogHeightPixels) {
		swivelor.options.swivelorDialogHeightPixels = swivelor.options.maxSwivelorDialogHeightPixels;
	}



	$("#swivelWrapper").dialog({
		width: swivelor.options.swivelorDialogWidthPixels
	,	height: swivelor.options.swivelorDialogHeightPixels
	,	close: swivelor.hideSwivelor
	,	open: function() {
			$("#play").focus().button("refresh");
		}

	,	modal: true
	});
	swivelor.bindKeyboardShortcuts();
	//$("#launchSwivel").disable();
/*
	if (swivelor.options.debug != true) {
	//console.info = function(){
	};
	//console.info = function(){
	};
	//console.dir = function(){
	};
	};
	 */
	FL.globalTimer.callbackFunctions_given = $.merge([], FL.globalTimer.callbackFunctions);
	FL.globalTimer.callbackFunctions_thisScript = $.merge([], swivelor.options.callbackFunctions);
	FL.globalTimer.functionsReset();
	swivelor.$swivelPane = $(".swivel-pane");
	swivelor.$swivelContent = $(".swivel-content");
	swivelor.$swivelContentItems = $(".swivel-content-items");
	swivelor.$surface = swivelor.$swivelContentItems;
	swivelor.positions.swivelPaneOffset = $(".swivel-pane").offset();
	swivelor.positions.swivelPaneWidth = $(".swivel-pane").width();
	swivelor.positions.swivelPaneHeight = $(".swivel-pane").height();
	swivelor.positions.given.pageX = 0;
	swivelor.positions.given.pageY = 0;
	swivelor.positions.start.pageX = 0;
	swivelor.positions.start.pageY = 0;
	swivelor.positions.current.pageX = 0;
	swivelor.positions.current.pageY = 0;
	//console.info("loop through swivelSteps and create images (or the sprite)");
	while (swivelor.options.swivelSteps <= swivelor.options.maxSwivelStepsX) {
		var loop_value = swivelor.options.swivelSteps;
		if (loop_value <= 9 && loop_value >= 0) {
			loop_value = "00" + loop_value;
		}
		else if (loop_value <= 100 && loop_value >= 10) {
			loop_value = "0" + loop_value;
		}
		if (swivelor.options.useSprite == true) {
			swivelor.$swivelContentItems.append('<div index="' + swivelor.options.swivelSteps + '" id="swiveler-step-' + swivelor.options.swivelSteps + '" class="swivel-content-item" style="width: ' + swivelor.options.stepWidthPixels + 'px; height: ' + swivelor.options.stepHeightPixels + 'px;"><div style="width: ' + swivelor.options.stepWidthPixels + 'px; height: ' + swivelor.$swivelContentItems.children().first().height() + 'px; background-image: url(/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-sprite__y-000__z-' + swivelor.options.zAxis + '.jpg); background-position: ' + ((swivelor.options.swivelSteps * swivelor.options.stepWidthPixels) * -1) + 'px 0px; float: left; clear: none;"><span class="none">&nbsp;</span></div></div>');
		}
		else {
			swivelor.arrayOfImages.push('/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-' + loop_value + '__y-000__z-' + swivelor.options.zAxis + '.jpg');
			swivelor.$swivelContentItems.append('<div index="' + swivelor.options.swivelSteps + '" id="swiveler-step-' + swivelor.options.swivelSteps + '" class="swivel-content-item "><img width=' + swivelor.options.stepWidthPixels + ' src="/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-' + loop_value + '__y-000__z-' + swivelor.options.zAxis + '.jpg"></div>');
		}
		swivelor.frames[swivelor.options.swivelSteps] = 'swiveler-step-' + swivelor.options.swivelSteps;
		swivelor.options.swivelSteps = swivelor.options.swivelSteps + swivelor.options.by;
	}
	if (swivelor.options.useSprite == true) {
		//console.info("Using the sprite, push it into the arrayOfImages");
		swivelor.arrayOfImages.push('/media/images/swivel-images/' + swivelor.productID + '/z-' + swivelor.options.zAxis + '/y-000/' + swivelor.productID + '__x-sprite__y-000__z-' + swivelor.options.zAxis + '.jpg');
	}
	//console.info("pre load the images now");
	swivelor.preload(swivelor.arrayOfImages);
	swivelor.$swivelContent.css({
		width: ((((swivelor.options.maxSwivelStepsX + 1) * swivelor.options.stepWidthPixels)) + "px")
	,	height: (swivelor.options.stepHeightPixels + 'px')
	});
	swivelor.gotoPos(swivelor.validatePos([swivelor.options.currentStepX, swivelor.options.currentStepY], true));
	swivelor.$swivelContentItems.children().last().remove();
	//swivelor.options.doSwivel
	if (swivelor.options.doIntro == true) {
		swivelor.introSequence = swivelor.setUpSpinIntro();
		window.setTimeout(swivelor.playIntro, (swivelor.options.introDelay) + 800);
		window.setTimeout(swivelor.setUpGrabbable, ((swivelor.options.introDelay + 800) + (swivelor.options.introDuration * 5900)));
	}
	else {
		swivelor.setUpGrabbable();
	}
};