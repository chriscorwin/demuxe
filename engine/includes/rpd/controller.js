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

const addClasses = (rpdDiv, classes) => {
	let newClasses = `${classes.replace(/, /g, ',').replace(/ /g, ',')}`;

	const newClassesArray = newClasses.split(',');
	newClassesArray.forEach(newClass => rpdDiv.classList.add(newClass));
}

const removeClasses = (rpdDiv, classes) => {
	let classesToRemove = `${classes.replace(/, /g, ',').replace(/ /g, ',')}`;

	const classesToRemoveArray = classesToRemove.split(',');
	classesToRemoveArray.forEach(targetClass => rpdDiv.classList.remove(targetClass));
}

const toggleClasses = (rpdDiv, classes) => {
	let classesToToggle = `${classes.replace(/, /g, ',').replace(/ /g, ',')}`;

	const classesToToggleArray = classesToToggle.split(',');
	classesToToggleArray.forEach(targetClass => rpdDiv.classList.toggle(targetClass));
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
	const id = rpdDiv.attributes.id.value;
	RPDController.querySelector('.slds-docked-composer__body_form').innerHTML = `
<fieldset class="slds-form-element slds-form_compound">
	<div class="slds-form-element__control">
		<div class="slds-form-element__group slds-grid slds-wrap">
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Rapid Component Code</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}HTMLHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top-left slds-hide" role="tooltip" id="${id}HTMLHelp" style="position: absolute;top: 30px;left: -16px;width: 320px;">
						<div class="slds-popover__body">You must update or insert the code for this Rapid Component in 
						the applicable <code>*-contents.ejs</code> file in <code>/demo-overrides/{product}/{venue}/</code>. 
						If this file does not yet exist, you must create it. Try doing a global search on <code>rpdDiv1548883102089</code> 
						to determine if/where this Rapid Component exists in the code base.</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<textarea rows=5 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${rpdDiv.outerHTML}</textarea>
				</div>
			</div>

			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">ID</label>
				<div class="slds-form-element__control">
					<input id="${id}ID" placeholder="ID" class="slds-input" type="text" value="${rpdDiv.dataset.id}" />
				</div>
			</div>

			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Classes</label>
				<div class="slds-form-element__control">
					<input id="${id}Classes" placeholder="Classes" class="slds-input" type="text" value="${rpdDiv.dataset.classes}" />
				</div>
			</div>

			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Top</label>
				<div class="slds-form-element__control">
					<input id="${id}Top" placeholder="Top" class="slds-input" type="number" value="${rpdDiv.dataset.top}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Left</label>
				<div class="slds-form-element__control">
					<input id="${id}Left" placeholder="Left" class="slds-input" type="number" value="${rpdDiv.dataset.left}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Width</label>
				<div class="slds-form-element__control">
					<input id="${id}Width" placeholder="Width" class="slds-input" type="number" value="${rpdDiv.dataset.width}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-2">
				<label class="slds-form-element__label" for="text-input-id-1">Height</label>
				<div class="slds-form-element__control">
					<input id="${id}Height" placeholder="Height" class="slds-input" type="number" value="${rpdDiv.dataset.height}" />
				</div>
			</div>

			<div class="slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_x-small">onclick</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">addClass('
					<input id="${id}onclickAddClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onclickAddClass}" />
				')</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">removeClass('
					<input id="${id}onclickRemoveClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onclickRemoveClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">toggleClass('
					<input id="${id}onclickToggleClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onclickToggleClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Raw onclick JS:</label>
				<div class="slds-form-element__control">
					<textarea id="${id}onclickRaw" rows=1 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${decodeURI(rpdDiv.dataset.onclickRaw)}</textarea>
				</div>
			</div>
		</div>
	</div>
</fieldset>
	`;

	RPDController.querySelector(`#${id}onclickAddClass`).addEventListener('change', (e) => {
		const addClassClasses = e.target.value;
		rpdDiv.dataset.onclickAddClass = addClassClasses;
		rpdDiv.querySelector('.onclickAddClass').text = `document.querySelector('#${id}').addEventListener('click', (e) => {
	addClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onclickRemoveClass`).addEventListener('change', (e) => {
		const removeClassClasses = e.target.value;
		rpdDiv.dataset.onclickRemoveClass = removeClassClasses;
		rpdDiv.querySelector('.onclickRemoveClass').text = `document.querySelector('#${id}').addEventListener('click', (e) => {
	removeClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onclickToggleClass`).addEventListener('change', (e) => {
		const toggleClassClasses = e.target.value;
		rpdDiv.dataset.onclickToggleClass = toggleClassClasses;
		rpdDiv.querySelector('.onclickToggleClass').text = `document.querySelector('#${id}').addEventListener('click', (e) => {
	toggleClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onclickRaw`).addEventListener('change', (e) => {
		const rawClickCode = e.target.value;
		rpdDiv.dataset.onclickRaw = encodeURI(rawClickCode);
		rpdDiv.querySelector('.onclickRaw').text = `document.querySelector('#${id}').addEventListener('click', (e) => {
	${rawClickCode}
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}ID`).addEventListener('change', (e) => {
		rpdDiv.dataset.id = `${e.target.value}`;
		rpdDiv.id = e.target.value;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}Classes`).addEventListener('change', (e) => {
		while (rpdDiv.classList.length > 0) {
			rpdDiv.classList.remove(rpdDiv.classList.item(0));
		}

		addClasses(rpdDiv, e.target.value);
		addClasses(rpdDiv, 'rapidDiv');

		rpdDiv.dataset.classes = rpdDiv.classList.value;
		
		setSelection(rpdDiv, RPDController);
	});


	RPDController.querySelector(`#${id}Top`).addEventListener('change', (e) => {
		rpdDiv.style.top = `${e.target.value}px`;
		updatePositionData(rpdDiv);
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}Left`).addEventListener('change', (e) => {
		rpdDiv.style.left = `${e.target.value}px`;
		updatePositionData(rpdDiv);	
		setSelection(rpdDiv, RPDController);	
	});
	RPDController.querySelector(`#${id}Width`).addEventListener('change', (e) => {
		rpdDiv.style.width = `${e.target.value}px`;
		updatePositionData(rpdDiv);
		setSelection(rpdDiv, RPDController);		
	});
	RPDController.querySelector(`#${id}Height`).addEventListener('change', (e) => {
		rpdDiv.style.height = `${e.target.value}px`;
		updatePositionData(rpdDiv);
		setSelection(rpdDiv, RPDController);		
	});

	RPDController.querySelector('.slds-docked-composer__footer').classList.remove('slds-hidden');
}

const updateOffsets = (rpdDiv, e) => {
	updatePositionData(rpdDiv);

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

const updatePositionData = (rpdDiv) => {
	rpdDiv.dataset.top = rpdDiv.offsetTop;
	rpdDiv.dataset.left = rpdDiv.offsetLeft;
	rpdDiv.dataset.width = rpdDiv.offsetWidth;
	rpdDiv.dataset.height = rpdDiv.offsetHeight;
}

const addRapidDiv = (target, RPDController) => {
	const uniqueID = `rpdDiv${Date.now()}`;
	const rapidDiv = `
		<div 
			id="${uniqueID}" 
			class="rapidDiv"
			data-width="200"
			data-height="200"
			data-top="500"
			data-left="30"
			data-classes="rapidDiv"
			data-id="${uniqueID}"
			data-onclick-add-class=""
			data-onclick-remove-class=""
			data-onclick-toggle-class=""
			data-onclick-raw=""
		>
			<script class="onclickAddClass"></script>
			<script class="onclickRemoveClass"></script>
			<script class="onclickToggleClass"></script>
			<script class="onclickRaw"></script>
			Rapid Div ${uniqueID}
		</div>
`;

	target.insertAdjacentHTML('beforeend', rapidDiv);

	const rpdDiv = target.querySelector(`#${uniqueID}`);

	updatePositionData(rpdDiv);
	addListeners(rpdDiv, RPDController);
}



