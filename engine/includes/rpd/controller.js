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

const showHomeForm = (RPDController) => {
	RPDController.querySelector('.slds-docked-composer__body_form').innerHTML = `
<fieldset class="slds-form-element slds-form_compound">
	<div class="slds-form-element__control">
		<div class="slds-form-element__group slds-grid slds-wrap">
			<ul class="slds-button-group-list slds-col slds-size_1-of-1">
				<li>
					<button id="addRapidDiv" class="slds-button slds-button_neutral"><svg class="slds-button__icon slds-button__icon_small slds-button__icon_left" aria-hidden="true">
						<use xlink:href="/icons/utility-sprite/svg/symbols.svg#steps"></use>
					</svg>Add a Rapid Div</button>
				</li>
			</ul>
		</div>
	</div>
</fieldset>
`;
	
	RPDController.querySelector('.slds-docked-composer__footer').classList.add('slds-hidden');
}

const setSelection = (rpdDiv, RPDController) => {
	RPDController.querySelector('.slds-docked-composer__body_form').innerHTML = `
<fieldset class="slds-form-element slds-form_compound">
	<div class="slds-form-element__control">
		<div class="slds-form-element__group slds-grid slds-wrap">
			<textarea rows=5 class="slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_xx-small">
${rpdDiv.outerHTML}
			</textarea>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Top</label>
				<div class="slds-form-element__control">
					<input id="${rpdDiv.attributes.id}Top" placeholder="Top" class="slds-input" type="text" value="${rpdDiv.dataset.top}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Left</label>
				<div class="slds-form-element__control">
					<input id="${rpdDiv.attributes.id}Left" placeholder="Left" class="slds-input" type="text" value="${rpdDiv.dataset.left}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Width</label>
				<div class="slds-form-element__control">
					<input id="${rpdDiv.attributes.id}Width" placeholder="Width" class="slds-input" type="text" value="${rpdDiv.dataset.width}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Height</label>
				<div class="slds-form-element__control">
					<input id="${rpdDiv.attributes.id}Height" placeholder="Height" class="slds-input" type="text" value="${rpdDiv.dataset.height}" />
				</div>
			</div>
		</div>
	</div>
</fieldset>
	`;

	RPDController.querySelector('.slds-docked-composer__footer').classList.remove('slds-hidden');
}

const updateOffsets = (rpdDiv, e) => {
	updateData(rpdDiv);

	return {
		divLeft: rpdDiv.offsetLeft,
		divTop: rpdDiv.offsetTop,
		mouseLeft: e.clientX,
		mouseTop: e.clientY,
		left: e.clientX - rpdDiv.offsetLeft,
		top: e.clientY - rpdDiv.offsetTop
	};
}

const addListeners = (rpdDiv, RPDController) => {
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
		setSelection(rpdDiv, RPDController);

		rpdDiv.classList.add('grabbing');

		offsets = updateOffsets(rpdDiv, e);

		rpdDiv.addEventListener('mousemove', handleMove);
	});
	rpdDiv.addEventListener('mouseup', (e) => {
		rpdDiv.classList.remove('grabbing');

		offsets = {};

		rpdDiv.removeEventListener('mousemove', handleMove);

		setSelection(rpdDiv, RPDController);
	});

}

const updateData = (rpdDiv) => {
	rpdDiv.dataset.top = rpdDiv.offsetTop;
	rpdDiv.dataset.left = rpdDiv.offsetLeft;
	rpdDiv.dataset.width = rpdDiv.offsetWidth;
	rpdDiv.dataset.height = rpdDiv.offsetHeight;
}

const addRapidDiv = (target, RPDController) => {
	const uniqueID = `rpdDiv${Date.now()}`;
	const rapidDiv = `
		<div id="${uniqueID}" class="rapidDiv">
			Rapid Div ${uniqueID}
		</div>
`;

	target.insertAdjacentHTML('beforeend', rapidDiv);

	const rpdDiv = target.querySelector(`#${uniqueID}`);

	updateData(rpdDiv);
	addListeners(rpdDiv, RPDController);
}


