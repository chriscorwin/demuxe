document.querySelector('#approved-usages-dropdown').addEventListener('click', function (evt) {
	evt.stopPropagation();
	this.parentElement.classList.remove('highlight');

	// count the number of boxes checked
	const numChecked = this.querySelectorAll('input:checked').length;
	const numTotal = this.querySelectorAll('input[type=checkbox]').length;

	// update the "number selected"
	$numSelected = document.querySelector('#numSelected')
	if (numChecked === 0) {
		$numSelected.innerHTML = 'No features selected';
	} else {
		$numSelected.innerHTML = `${numChecked} of ${numTotal} selected`;
	}
});

document.querySelector('#approved-usages-dropdown-trigger').addEventListener('click', function (evt) {
	const parentClasses = this.classList;
	const dropdownClasses = document.querySelector('#approved-usages-dropdown').classList;
	if (dropdownClasses.contains('slds-hide')) {
		dropdownClasses.remove('slds-hide');
	} else {
		dropdownClasses.add('slds-hide');
	}

	parentClasses.add('highlight');
});