//use the myApp object if it already exists, else start a new object
window.myApp = window.myApp || {};

/** @namespace */
myApp.globalTimer = myApp.globalTimer || {};
/** @constant */
myApp.globalTimer.THRESHOLD = 10000;
/** @todo what is this? */
myApp.globalTimer.lastTick_;
/** @todo what is this? */
myApp.globalTimer.callbackFunctions_default = ['myApp.globalTimer.lametest'];
/** @todo what is this? */
myApp.globalTimer.callbackFunctions = myApp.globalTimer.callbackFunctions || [];

/** @constant */
myApp.globalTimer.highFrequencyTimerSpeedDefault = 50;
/** @todo what is this? */
myApp.globalTimer.highFrequencyTimerSpeed = myApp.globalTimer.highFrequencyTimerSpeedDefault;
/** @constant */
myApp.globalTimer.lowFrequencyTimerSpeedDefault = 4000;


/**
 *  @see myApp.globalTimer.fetchUpdatedData
 *  @see myApp.globalTimer.lastTick_
 *  @see myApp.globalTimer.THRESHOLD
 */
myApp.globalTimer.detectWakeFromSleep_ = function() {
	var now = new Date().getTime();
	var delta = now - myApp.globalTimer.lastTick_;
	if (delta > myApp.globalTimer.THRESHOLD) {
		// The app probably just woke up after being asleep.
		myApp.globalTimer.fetchUpdatedData();
	}
	myApp.globalTimer.lastTick_ = now;
};

/**
 *  This function has no content.
 */
myApp.globalTimer.fetchUpdatedData = function() {
	//console.info("All awake!");
};

/**
 *  This function has no purpose?
 *
 *	@see myApp.setup.lametest
 */
myApp.globalTimer.lametest = function() {
	if (typeof myApp.setup.lametest === "undefined") {
		myApp.setup.lametest = "is defined";
		//console.log("We have now defined myApp.setup.lametest: you should not see this message again.");
	}
};

/**
 *  Executes a function by name.
 */
myApp.globalTimer.executeFunctionByName = function(functionName, context /*, args */ ) {
	var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	return context[func].apply(context, args);
}

/**
 *  @see myApp.globalTimer.callbackFunctions
 *  @see myApp.globalTimer.callbackFunctions_default
 *  @see myApp.globalTimer.callbackFunctions_given
 *  @see myApp.globalTimer.callbackFunctions_thisScript
 */
myApp.globalTimer.functionsReset = function() {
	myApp.globalTimer.callbackFunctions = [];
	if (myApp.globalTimer.callbackFunctions_given != myApp.globalTimer.callbackFunctions_default) {
		myApp.globalTimer.callbackFunctions = $.merge(myApp.globalTimer.callbackFunctions, myApp.globalTimer.callbackFunctions_default);
	}
	myApp.globalTimer.callbackFunctions = $.merge(myApp.globalTimer.callbackFunctions, myApp.globalTimer.callbackFunctions_given);
	myApp.globalTimer.callbackFunctions = $.merge(myApp.globalTimer.callbackFunctions, myApp.globalTimer.callbackFunctions_thisScript);
}

/**
 *  @see myApp.globalTimer.callbackFunctions
 *  @see myApp.globalTimer.executeFunctionByName
 */
myApp.globalTimer.callback = function() {
	$.each(myApp.globalTimer.callbackFunctions, function(index, value) {
		myApp.globalTimer.executeFunctionByName(value, window);
	});
};

/**
 *  @see myApp.globalTimer.callbackFunctions
 */
myApp.globalTimer.callbackFunctionRemove = function(name) {
	//console.log("Attempting to remove " + name + " now...");
	myApp.globalTimer.callbackFunctions = jQuery.grep(myApp.globalTimer.callbackFunctions, function(value) {
		return value != name;
	});
	myApp.globalTimer.callbackFunctions = myApp.globalTimer.callbackFunctions.unique();
	//console.log("myApp.globalTimer.callbackFunctions after: " + myApp.globalTimer.callbackFunctions);
};

/**
 *  @see myApp.globalTimer.callbackFunctions
 */
myApp.globalTimer.callbackFunctionAdd = function(name) {
	//console.log("Attempting to remove " + name + " now...");
	myApp.globalTimer.callbackFunctions = $.merge(myApp.globalTimer.callbackFunctions, [name]);
	myApp.globalTimer.callbackFunctions = myApp.globalTimer.callbackFunctions.unique();
	//console.log("myApp.globalTimer.callbackFunctions after: " + myApp.globalTimer.callbackFunctions);
};

/**
 *  @see myApp.globalTimer.callback
 *  @see myApp.globalTimer.highFrequencyTimerId_
 *  @see myApp.globalTimer.highFrequencyTimerSpeed
 */
myApp.globalTimer.init = function() {
	myApp.globalTimer.highFrequencyTimerId_ = window.setInterval(myApp.globalTimer.callback, myApp.globalTimer.highFrequencyTimerSpeed);
};