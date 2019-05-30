const checkBox = (boxId) => {
	const box = document.querySelector(boxId);
	const boxWrapper = document.querySelector(boxId + 'wrapper');
	box.checked = !box.checked;

	if (box.checked) {
		boxWrapper.classList.add('checked');
	} else {
		boxWrapper.classList.remove('checked');
	}
};

const goHome = () => {
	window.location = `/index.html`;
};

const makeFilledSegmentDetail = (label, contents) => {
	return document.createRange().createContextualFragment(`
		<div class="slds-col slds-p-vertical_xx-small slds-p-horizontal_small slds-size_1-of-3 segment-box slds-m-top_medium">
			<div class="segment-box_label slds-p-vertical_xxx-small">${label}</div>
			<div class="segment-box_contents">${contents}</div>
		</div>
	`);
}

const makeFilledSegmentDescription = (description) => {
	return document.createRange().createContextualFragment(`
		<div class="slds-col slds-p-vertical_xx-small slds-p-horizontal_small slds-size_2-of-3 segment-box slds-m-top_medium" style="height: 93px;">
			<div class="segment-box_label">Description</div>
			<div class="segment-box_contents">${description}</div>
		</div>
	`)
}

const segmentName = getSegmentName();
const segmentType = getSegmentType();
const categoryName = getCategoryName();
const subCategoryName = getSubCategoryName();
const segmentDescription = getSegmentDescription();

const $newSegmentNameElm = makeFilledSegmentDetail('Segment Name', segmentName);
const $newSegmentTypeElm = makeFilledSegmentDetail('Segment Type', segmentType);
const $newCategoryNameElm = makeFilledSegmentDetail('Category Name', categoryName);
const $newSubCategoryNameElm = makeFilledSegmentDetail('Sub-Category Name', subCategoryName);
const $newSegmentDescriptionElm = makeFilledSegmentDescription(segmentDescription);

const $segmentName = document.querySelector('#segment-name');
const $segmentType = document.querySelector('#segment-type');
const $categoryName = document.querySelector('#category-name');
const $subCategoryName = document.querySelector('#sub-category-name');
const $segmentDescription = document.querySelector('#segment-description');

$segmentName.addEventListener('click', () => {
	segmentName.length > 0 && document.getElementById('details-contents').replaceChild($newSegmentNameElm, $segmentName);
	segmentType.length > 0 && document.getElementById('details-contents').replaceChild($newSegmentTypeElm, $segmentType);
	categoryName.length > 0 && document.getElementById('details-contents').replaceChild($newCategoryNameElm, $categoryName);
	subCategoryName.length > 0 && document.getElementById('details-contents').replaceChild($newSubCategoryNameElm, $subCategoryName);
	segmentDescription.length > 0 && document.getElementById('details-contents').replaceChild($newSegmentDescriptionElm, $segmentDescription);
});


const $activationContents = document.querySelector('#activation-contents');
const $activationHeader = document.querySelector('#activation-header');

const activate = () => {
	$activationContents.classList.remove('slds-hide');
	$activationHeader.classList.remove('slds-hide');
}

const deactivate = () => {
	$activationContents.classList.add('slds-hide');
	$activationHeader.classList.add('slds-hide');
}

if (activateByDefault) {
	activate();
}

const checkbox = document.getElementById('activate-toggle');
// Activate by default -- toggle still works
checkbox.addEventListener('change', (event) => {
	if (event.target.checked) {
		activate();
	} else {
		deactivate();
	}
});

document.querySelector('#activation-contents').innerHTML = activations.reduce((contents, activation, i) => {
	return `
		${contents}
		<div id="checkbox${i}wrapper" onclick="checkBox('#checkbox${i}');" class="slds-col slds-size_1-of-3 activation-card slds-p-horizontal_small slds-m-top_medium">
			${activation}
			<span class="slds-checkbox slds-float_right">
				<input type="checkbox" name="options" id="checkbox${i}" value="on" />
				<label class="slds-checkbox__label" for="checkbox${i}">
					<span class="slds-checkbox_faux"></span>
					<span class="slds-form-element__label"></span>
				</label>
			</span>
		</div>
	`;
}, '');
