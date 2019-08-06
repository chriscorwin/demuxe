// Taken from a script from Mathew Kwok <mathew.kwok@salesforce.com>
const Confettiful = function(el) {
	this.el = el;
	this.containerEl = null;

	this.confettiFrequency = 100;
	this.confettiColors = [
		'#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
		'#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
		'#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
	'#FF5722'
	];
	this.confettiAnimations = ['slow', 'medium', 'fast'];
	this.confettiInterval = null;

	this._setupElements();
	this._renderConfetti();
};
  
Confettiful.prototype._setupElements = function() {
	const containerEl = document.createElement('div');
	const elPosition = this.el.style.position;

	containerEl.classList.add('confetti-container');

	this.el.appendChild(containerEl);

	this.containerEl = containerEl;
};
  
Confettiful.prototype._renderConfetti = function() {
	this.confettiInterval = setInterval(() => {
		const confettiEl = document.createElement('div');
		const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
		const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
		const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
		const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
		
		confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
		confettiEl.style.left = confettiLeft;
		confettiEl.style.width = confettiSize;
		confettiEl.style.height = confettiSize;
		confettiEl.style.backgroundColor = confettiBackground;
		
		confettiEl.removeTimeout = setTimeout(function() {
			confettiEl.parentNode.removeChild(confettiEl);
		}, 1200);
		
		this.containerEl.appendChild(confettiEl);
	}, 20);
};

Confettiful.prototype.remove = function() {
	this.el.removeChild(this.containerEl);
}

window.Confettiful = Confettiful;  