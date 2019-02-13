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
	
	RPDController.querySelector('#addRapidDiv').addEventListener('click', () => {
		addRapidDiv(RPDController.parentNode, RPDController) 
	});

	RPDController.querySelector('.slds-docked-composer__footer').classList.add('slds-hidden');
}

const setSelection = (rpdDiv, RPDController) => {
	// Bail if edit mode isn't activated
	if (RPDController.style.display === 'none') return;
	const id = rpdDiv.attributes.id.value;

	const rpdDivClone = rpdDiv.cloneNode(true);

	rpdDivClone.classList.remove('clicked');
	rpdDivClone.classList.remove('receivedDrop');
	rpdDivClone.classList.remove('hoverOverDropTarget');
	rpdDivClone.classList.remove('wasDropped');
	rpdDivClone.classList.remove('wasDroppedOverTarget');

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
						the applicable <code>*-contents.ejs</code> file in <code>/demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/</code>. 
						If no <code>/demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/</code> files exist yet, you must create one for your Rapid Component 
						to live in. If you're having trouble finding this Rapid Component, try doing a global search on <code>${rpdDiv.id}</code> 
						to determine if/where this Rapid Component exists in the code base.</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<textarea rows=5 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${rpdDivClone.outerHTML}</textarea>
				</div>
			</div>

			<!-- STYLE DATA -->
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
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_xx-small">
				<div class="slds-form-element__control">
					<div class="slds-checkbox">
						<input type="checkbox" name="options" id="${id}isHidden" ${rpdDiv.dataset.isHidden === 'true' ? 'checked' : ''} />
						<label class="slds-checkbox__label" for="${id}isHidden">
							<span class="slds-checkbox_faux"></span>
							<span class="slds-form-element__label">Is Hidden</span>
						</label>
					</div>
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image (${rpdDiv.dataset.backgroundImage})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}BackgroundImageHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}BackgroundImageHelp" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImage" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImage}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on mouseover (${rpdDiv.dataset.backgroundImageOnMouseover})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}BackgroundImageOnMouseoverHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}BackgroundImageOnMouseoverHelp" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnMouseover" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnMouseover}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on click (${rpdDiv.dataset.backgroundImageOnClick})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}BackgroundImageOnClickHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}BackgroundImageOnClickHelp" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnClick" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnClick}" />
				</div>
			</div>


			<!-- POSITION DATA -->
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

			<!-- INTERACTION DATA -->
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

			<div class="slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_x-small">onmouseover</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">addClass('
					<input id="${id}onmouseoverAddClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoverAddClass}" />
				')</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">removeClass('
					<input id="${id}onmouseoverRemoveClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoverRemoveClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">toggleClass('
					<input id="${id}onmouseoverToggleClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoverToggleClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Raw onmouseover JS:</label>
				<div class="slds-form-element__control">
					<textarea id="${id}onmouseoverRaw" rows=1 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${decodeURI(rpdDiv.dataset.onmouseoverRaw)}</textarea>
				</div>
			</div>

			<div class="slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_x-small">onmouseout</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">addClass('
					<input id="${id}onmouseoutAddClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoutAddClass}" />
				')</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">removeClass('
					<input id="${id}onmouseoutRemoveClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoutRemoveClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">toggleClass('
					<input id="${id}onmouseoutToggleClass" placeholder="classes, here" class="slds-input" style="width: auto;" type="text" value="${rpdDiv.dataset.onmouseoutToggleClass}" />
				');</label>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Raw onmouseout JS:</label>
				<div class="slds-form-element__control">
					<textarea id="${id}onmouseoutRaw" rows=1 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${decodeURI(rpdDiv.dataset.onmouseoutRaw)}</textarea>
				</div>
			</div>

			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_xx-small">
				<div class="slds-form-element__control">
					<div class="slds-checkbox">
						<input type="checkbox" name="options" id="${id}isDraggable" ${rpdDiv.dataset.isDraggable === 'true' ? 'checked' : ''} />
						<label class="slds-checkbox__label" for="${id}isDraggable">
							<span class="slds-checkbox_faux"></span>
							<span class="slds-form-element__label">Is Draggable</span>
						</label>
					</div>
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on hover over target (${rpdDiv.dataset.backgroundImageOnHover})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}backgroundImageOnHover').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}backgroundImageOnHover" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnHover" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnHover}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on dropped (${rpdDiv.dataset.backgroundImageOnDropped})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}backgroundImageOnDropped').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}backgroundImageOnDropped" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnDropped" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnDropped}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on dropped over target (${rpdDiv.dataset.backgroundImageOnDroppedOverTarget})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}backgroundImageOnDroppedOverTarget').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}backgroundImageOnDroppedOverTarget" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnDroppedOverTarget" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnDroppedOverTarget}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Raw on dropped JS:</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}onWasDroppedRaw').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}onWasDroppedRaw" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">DOM elements for <code>dropped</code> and <code>target</code> are made avaiable to this code, eg:<br>
						<code>
						// Remove dropped when dropped <br>
						// over target<br>
						if (target) {<br>
						&nbsp;&nbsp;&nbsp;&nbsp;dropped.remove();<br>
						}
						</code> </div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<textarea id="${id}onWasDroppedRaw" rows=1 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${decodeURI(rpdDiv.dataset.onWasDroppedRaw)}</textarea>
				</div>
			</div>


			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_none slds-m-top_xx-small">
				<div class="slds-form-element__control">
					<div class="slds-checkbox">
						<input type="checkbox" name="options" id="${id}isDropTarget" ${rpdDiv.dataset.isDropTarget === 'true' ? 'checked' : ''} />
						<label class="slds-checkbox__label" for="${id}isDropTarget">
							<span class="slds-checkbox_faux"></span>
							<span class="slds-form-element__label">Is Drop Target</span>
						</label>
					</div>
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Accepts only drops with class (otherwise accepts all drop)</label>
				<div class="slds-form-element__control">
					<input id="${id}acceptsOnlyDropsWithClass" placeholder="Class" class="slds-input" type="text" value="${rpdDiv.dataset.acceptsOnlyDropsWithClass}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on hovered (${rpdDiv.dataset.backgroundImageOnHovered})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}backgroundImageOnHoveredHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}backgroundImageOnHoveredHelp" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnHovered" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnHovered}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">
					Background Image on received dropped (${rpdDiv.dataset.backgroundImageOnReceivedDrop})
				</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}backgroundImageOnReceivedDropHelp').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}backgroundImageOnReceivedDropHelp" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">image must live in /demo-overrides/${RPDController.dataset.productTemplate}/${RPDController.dataset.demoVenue}/images/</div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<input id="${id}BackgroundImageOnReceivedDrop" placeholder="Background Image" accept=".jpg, .jpeg, .png, .svg, .gif" class="slds-input" type="file" value="${rpdDiv.dataset.backgroundImageOnReceivedDrop}" />
				</div>
			</div>
			<div class="slds-form-element slds-col slds-size_1-of-1 slds-m-left_small slds-m-top_xx-small">
				<label class="slds-form-element__label" for="text-input-id-1">Raw on received dropped JS:</label>
				<div class="slds-form-element__icon">
					<button class="slds-button slds-button_icon" aria-describedby="help" onclick="(function(){document.getElementById('${id}onReceivedDropRaw').classList.toggle('slds-hide');})()">
						<svg class="slds-button__icon" aria-hidden="true">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons/utility-sprite/svg/symbols.svg#info" />
						</svg>
						<span class="slds-assistive-text">Help</span>
					</button>
					<div class="slds-popover slds-popover_tooltip slds-nubbin_top slds-hide" role="tooltip" id="${id}onReceivedDropRaw" style="position: absolute;top: 30px;left: -152px;width: 320px;">
						<div class="slds-popover__body">DOM elements for <code>dropped</code> and <code>target</code> are made avaiable to this code, eg:<br>
						<code>
						// Remove dropped when dropped <br>
						// over target<br>
						if (target) {<br>
						&nbsp;&nbsp;&nbsp;&nbsp;dropped.remove();<br>
						}
						</code> </div>
					</div>
				</div>
				<div class="slds-form-element__control">
					<textarea id="${id}onReceivedDropRaw" rows=1 class="slds-form-element slds-col slds-size_1-of-1 slds-textarea">${decodeURI(rpdDiv.dataset.onReceivedDropRaw)}</textarea>
				</div>
			</div>
		</div>
	</div>
</fieldset>
	`;

	// ON CLICK
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

	// ON MOUSEOVER
	RPDController.querySelector(`#${id}onmouseoverAddClass`).addEventListener('change', (e) => {
		const addClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoverAddClass = addClassClasses;
		rpdDiv.querySelector('.onmouseoverAddClass').text = `document.querySelector('#${id}').addEventListener('mouseover', (e) => {
	addClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoverRemoveClass`).addEventListener('change', (e) => {
		const removeClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoverRemoveClass = removeClassClasses;
		rpdDiv.querySelector('.onmouseoverRemoveClass').text = `document.querySelector('#${id}').addEventListener('mouseover', (e) => {
	removeClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoverToggleClass`).addEventListener('change', (e) => {
		const toggleClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoverToggleClass = toggleClassClasses;
		rpdDiv.querySelector('.onmouseoverToggleClass').text = `document.querySelector('#${id}').addEventListener('mouseover', (e) => {
	toggleClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoverRaw`).addEventListener('change', (e) => {
		const rawMouseOverCode = e.target.value;
		rpdDiv.dataset.onmouseoverRaw = encodeURI(rawMouseOverCode);
		rpdDiv.querySelector('.onmouseoverRaw').text = `document.querySelector('#${id}').addEventListener('mouseover', (e) => {
	${rawMouseOverCode}
});`
		setSelection(rpdDiv, RPDController);
	});

	// ON MOUSEOUT
	RPDController.querySelector(`#${id}onmouseoutAddClass`).addEventListener('change', (e) => {
		const addClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoutAddClass = addClassClasses;
		rpdDiv.querySelector('.onmouseoutAddClass').text = `document.querySelector('#${id}').addEventListener('mouseout', (e) => {
	addClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoutRemoveClass`).addEventListener('change', (e) => {
		const removeClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoutRemoveClass = removeClassClasses;
		rpdDiv.querySelector('.onmouseoutRemoveClass').text = `document.querySelector('#${id}').addEventListener('mouseout', (e) => {
	removeClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoutToggleClass`).addEventListener('change', (e) => {
		const toggleClassClasses = e.target.value;
		rpdDiv.dataset.onmouseoutToggleClass = toggleClassClasses;
		rpdDiv.querySelector('.onmouseoutToggleClass').text = `document.querySelector('#${id}').addEventListener('mouseout', (e) => {
	toggleClasses(e.target, '${e.target.value}');
});`
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onmouseoutRaw`).addEventListener('change', (e) => {
		const rawMouseOutCode = e.target.value;
		rpdDiv.dataset.onmouseoutRaw = encodeURI(rawMouseOutCode);
		rpdDiv.querySelector('.onmouseoutRaw').text = `document.querySelector('#${id}').addEventListener('mouseout', (e) => {
	${rawMouseOutCode}
});`
		setSelection(rpdDiv, RPDController);
	});

	// DRAGGABLE/DROPPABLE
	RPDController.querySelector(`#${id}isDraggable`).addEventListener('change', (e) => {
		rpdDiv.dataset.isDraggable = `${e.target.checked}`;

		if (rpdDiv.dataset.isDraggable === 'true') {
			rpdDiv.classList.add('draggable');
		} else {
			rpdDiv.classList.remove('draggable');
		}

		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}isDropTarget`).addEventListener('change', (e) => {
		rpdDiv.dataset.isDropTarget = `${e.target.checked}`;

		if (rpdDiv.dataset.isDropTarget === 'true') {
			rpdDiv.classList.add('isDropTarget');
		} else {
			rpdDiv.classList.remove('isDropTarget');
		}

		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}acceptsOnlyDropsWithClass`).addEventListener('change', (e) => {
		rpdDiv.dataset.acceptsOnlyDropsWithClass = e.target.value;
		
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}onReceivedDropRaw`).addEventListener('change', (e) => {
		const rawReceivedDropCode = e.target.value;
		rpdDiv.dataset.onReceivedDropRaw = encodeURI(rawReceivedDropCode);
		rpdDiv.querySelector('.onReceivedDropRaw').text = `window.rawReceivedDropCode = window.rawReceivedDropCode || {};
rawReceivedDropCode['${id}'] = (dropped, target) => {
	${rawReceivedDropCode}
};`
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}onWasDroppedRaw`).addEventListener('change', (e) => {
		const rawWasDroppedCode = e.target.value;
		rpdDiv.dataset.onWasDroppedRaw = encodeURI(rawWasDroppedCode);
		rpdDiv.querySelector('.onWasDroppedRaw').text = `window.rawWasDroppedCode = window.rawWasDroppedCode || {};
rawWasDroppedCode['${id}'] = (dropped, target) => {
	${rawWasDroppedCode}
};`
		setSelection(rpdDiv, RPDController);
	});


	// ATTRIBUTES
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

	RPDController.querySelector(`#${id}BackgroundImage`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImage').innerHTML = `
		#${id} {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImage = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnMouseover`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnMouseover').innerHTML = `
		#${id}:hover {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnMouseover = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnClick`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnClick').innerHTML = `
		#${id}.clicked {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnClick = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnHover`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnHover').innerHTML = `
		#${id}.hoverOverDropTarget {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnHover = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnDropped`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnDropped').innerHTML = `
		#${id}.wasDropped {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnDropped = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnDroppedOverTarget`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnDroppedOverTarget').innerHTML = `
		#${id}.wasDroppedOverTarget {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnDroppedOverTarget = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnHovered`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnHovered').innerHTML = `
		#${id}.receivedDropHover {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnHovered = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});
	RPDController.querySelector(`#${id}BackgroundImageOnReceivedDrop`).addEventListener('change', (e) => {
		const fileName = `/images/${e.target.files[0].name}`;
		rpdDiv.querySelector('.backgroundImageOnReceivedDrop').innerHTML = `
		#${id}.receivedDrop {
			background-image: url('${fileName}');
		}	
`
		rpdDiv.dataset.backgroundImageOnReceivedDrop = `${fileName}`;
		setSelection(rpdDiv, RPDController);
	});

	RPDController.querySelector(`#${id}isHidden`).addEventListener('change', (e) => {
		rpdDiv.dataset.isHidden = `${e.target.checked}`;

		if (rpdDiv.dataset.isHidden === 'true') {
			rpdDiv.classList.add('slds-hide');
		} else {
			rpdDiv.classList.remove('slds-hide');
		}

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

const canDrag = (target, RPDController) => {
	const editModeEnabled = RPDController.style.display !== 'none';
	const targetIsDraggable = target.dataset.isDraggable === 'true';
	
	return editModeEnabled || targetIsDraggable;
}

const checkDropOverlap = (rpdDiv, fireDrop) => {
	const rpdRect = rpdDiv.getBoundingClientRect();

	rpdDiv.parentNode.querySelectorAll(`.isDropTarget`).forEach((target) => {
		if (target.dataset.acceptsOnlyDropsWithClass !== '' && !rpdDiv.classList.contains(target.dataset.acceptsOnlyDropsWithClass)) { return; }

		const targetRect = target.getBoundingClientRect();
		
		let horizontalInRange = false;
		let verticalInRange = false;

		if (rpdRect.top > targetRect.top && rpdRect.top < targetRect.bottom) {
			verticalInRange = true;
		} else if (rpdRect.bottom > targetRect.top && rpdRect.bottom < targetRect.bottom) {
			verticalInRange = true;
		} else if (rpdRect.top === targetRect.top || rpdRect.bottom === targetRect.bottom) {
			verticalInRange = true;
		}

		if (rpdRect.left > targetRect.left && rpdRect.left < targetRect.right) {
			horizontalInRange = true;
		} else if (rpdRect.right > targetRect.left && rpdRect.right < targetRect.right) {
			horizontalInRange = true;
		} else if (rpdRect.left === targetRect.left || rpdRect.right === targetRect.right) {
			horizontalInRange = true;
		}

		target.classList.remove('receivedDropHover');
		rpdDiv.classList.remove('hoverOverDropTarget');
		if (horizontalInRange && verticalInRange) {
			target.classList.add('receivedDropHover');
			rpdDiv.classList.add('hoverOverDropTarget');

			if (fireDrop) {
				target.classList.remove('receivedDropHover');
				rpdDiv.classList.remove('hoverOverDropTarget');
				target.classList.add('receivedDrop');
				rpdDiv.classList.add('wasDroppedOverTarget');

				// Is there an associated receivedDrop script? Fire it.
				if (target.dataset.onReceivedDropRaw) { window.rawReceivedDropCode[target.id](rpdDiv, target); }
				// Is there an associated wasDropped script? Fire it.
				if (rpdDiv.dataset.onWasDroppedRaw) { window.rawWasDroppedCode[rpdDiv.id](rpdDiv, target); }
			}
		}
	});

	if (fireDrop) {
		rpdDiv.classList.add('wasDropped');
		if (rpdDiv.dataset.onWasDroppedRaw) { window.rawWasDroppedCode[rpdDiv.id](rpdDiv); }
	}

	return true;
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

		checkDropOverlap(rpdDiv, false);
	}

	rpdDiv.addEventListener('mousedown', (e) => {
		rpdDiv.classList.add('clicked');

		setSelection(rpdDiv, RPDController);

		if (canDrag(rpdDiv, RPDController)) {
			rpdDiv.classList.add('grabbing');

			offsets = updateOffsets(rpdDiv, e);
	
			rpdDiv.addEventListener('mousemove', handleMove);
		}
	});
	rpdDiv.addEventListener('mouseup', (e) => {
		rpdDiv.classList.remove('grabbing');

		if (canDrag(rpdDiv, RPDController)) {
			offsets = {};

			rpdDiv.removeEventListener('mousemove', handleMove);

			setSelection(rpdDiv, RPDController);

			checkDropOverlap(rpdDiv, true);
		}
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
			data-is-draggable=""
			data-onmouseover-add-class=""
			data-onmouseover-remove-class=""
			data-onmouseover-toggle-class=""
			data-onmouseover-raw=""
			data-onmouseout-add-class=""
			data-onmouseout-remove-class=""
			data-onmouseout-toggle-class=""
			data-onmouseout-raw=""
			data-background-image=""
			data-background-image-on-mouseover=""
			data-background-image-on-click=""
			data-background-image-on-received-drop=""
			data-background-image-on-hover=""
			data-background-image-on-hovered=""
			data-background-image-on-dropped=""
			data-background-image-on-dropped-over-target=""
			data-on-was-dropped-raw=""
			data-on-received-drop-raw=""
			data-accepts-only-drops-with-class=""
		>
			<style class="backgroundImage"></style>
			<style class="backgroundImageOnMouseover"></style>
			<style class="backgroundImageOnClick"></style>
			<style class="backgroundImageOnHover"></style>
			<style class="backgroundImageOnDropped"></style>
			<style class="backgroundImageOnDroppedOverTarget"></style>
			<style class="backgroundImageOnReceivedDrop"></style>
			<style class="backgroundImageOnHovered"></style>

			<script class="onWasDroppedRaw"></script>
			<script class="onReceivedDropRaw"></script>
			<script class="onclickAddClass"></script>
			<script class="onclickRemoveClass"></script>
			<script class="onclickToggleClass"></script>
			<script class="onclickRaw"></script>
			<script class="onmouseoverAddClass"></script>
			<script class="onmouseoverRemoveClass"></script>
			<script class="onmouseoverToggleClass"></script>
			<script class="onmouseoverRaw"></script>
			<script class="onmouseoutAddClass"></script>
			<script class="onmouseoutRemoveClass"></script>
			<script class="onmouseoutToggleClass"></script>
			<script class="onmouseoutRaw"></script>
			Rapid Div ${uniqueID}
		</div>
`;

	target.insertAdjacentHTML('beforeend', rapidDiv);

	const rpdDiv = target.querySelector(`#${uniqueID}`);

	updatePositionData(rpdDiv);
	addListeners(rpdDiv, RPDController);
}



