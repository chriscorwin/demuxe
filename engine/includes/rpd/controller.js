const showHide = (target) => {
	if (target.style.display === 'none') {
		target.style.display = 'block';
	} else {
		target.style.display = 'none'
	}
}

const toggleOpen = (classList) => {
	if (classList.contains('slds-is-open')) {
		classList.remove('slds-is-open');
		classList.add('slds-is-closed');
	} else {
		classList.add('slds-is-open');
		classList.remove('slds-is-closed');
	}
}

const addRapidDiv = (target) => {
	target.insertAdjacentHTML('beforeend', `<div class="rapidDiv">This is a rapid div</div>`);
}


