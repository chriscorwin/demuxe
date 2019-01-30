const enableEditMode = (elm) => {
	elm.classList.add('editMode');
}

const disableEditMode = (elm) => {
	elm.classList.remove('editMode');
}

const showHide = (target, parent) => {
	if (target.style.display === 'none') {
		target.style.display = 'block';

		enableEditMode(parent);
	} else {
		target.style.display = 'none'
		
		disableEditMode(parent);
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

const editModeEnabled = () => {

}

const updateOffsets = (rpdDiv, e) => {
	return {
		divLeft: rpdDiv.offsetLeft,
		divTop: rpdDiv.offsetTop,
		mouseLeft: e.clientX,
		mouseTop: e.clientY,
		left: e.clientX - rpdDiv.offsetLeft,
		top: e.clientY - rpdDiv.offsetTop
	};
}

const addListeners = (rpdDiv) => {
	let offsets;

	const handleMove = (e) => {
		e.preventDefault();
		
		const mouseTop = e.clientY;
		const mouseLeft = e.clientX;
		rpdDiv.style.top = `${mouseTop - offsets.top}px`;
		rpdDiv.style.left = `${mouseLeft - offsets.left}px`;

		offsets = updateOffsets(rpdDiv, e);
	}

	rpdDiv.addEventListener('mousedown', (e) => {
		rpdDiv.classList.add('grabbing');

		offsets = updateOffsets(rpdDiv, e);

		rpdDiv.addEventListener('mousemove', handleMove);
	});
	rpdDiv.addEventListener('mouseup', (e) => {
		rpdDiv.classList.remove('grabbing');

		offsets = {};

		rpdDiv.removeEventListener('mousemove', handleMove);
	});

}

const addRapidDiv = (target) => {
	const uniqueID = `rpdDiv${Date.now()}`;
	const rapidDiv = `
		<div id="${uniqueID}" class="rapidDiv">
			Rapid Div ${uniqueID}
		</div>
`;

	target.insertAdjacentHTML('beforeend', rapidDiv);

	const rpdDiv = target.querySelector(`#${uniqueID}`);
	addListeners(rpdDiv);
}


