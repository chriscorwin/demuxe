const rpdController = document.getElementById('RPDController');

const showHideRPDController = () => {
	if (rpdController.style.display === 'none') {
		rpdController.style.display = 'block';
	} else {
		rpdController.style.display = 'none'
	}
}

const toggleRPDController = () => {
	const sectionStyles = document.querySelector('#RPDController > div > section').classList;

	if (sectionStyles.contains('slds-is-open')) {
		sectionStyles.remove('slds-is-open');
		sectionStyles.add('slds-is-closed');
	} else {
		sectionStyles.add('slds-is-open');
		sectionStyles.remove('slds-is-closed');
	}
}

const addListener = () => {
	console.log('KONAMI CODE LISTENER ACTIVE. To deactivate, add ?disableKonami=true to URL. UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A to show/hide RPD Controller');
	let cursor = 0;
	const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	document.addEventListener('keydown', (e) => {
		cursor = (e.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
		if (cursor == KONAMI_CODE.length) {
			showHideRPDController();
			cursor = 0;
		};
	});
}

document.querySelector('#closeRPDController').addEventListener('click', showHideRPDController);
document.querySelector('#minimizeRPDController').addEventListener('click', toggleRPDController);