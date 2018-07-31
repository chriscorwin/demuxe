const activations = [
	'<span class="text">Send to Site</span>',
	'<span class="text">AdRoll</span>',
	'<img src="/images/slices/activation-tiles/activation-tile.aol.svg" />',
	'<span class="text">BlueKai</span>',
	'<img src="/images/slices/activation-tiles/activation-tile.dataxu.svg" />',
	'<img src="/images/slices/activation-tiles/activation-tile.youtube.svg" />',
	'<img src="/images/slices/activation-tiles/activation-tile.double-click.svg" />',
	'<img src="/images/slices/activation-tiles/activation-tile.sfmc.svg" />',
	'<img src="/images/slices/activation-tiles/activation-tile.media-math.svg" />',
	'<span class="text">MoPub</span>',
	'<img src="/images/slices/activation-tiles/activation-tile.app-nexus.svg" />',
	'<img src="/images/slices/activation-tiles/activation-tile.wordpress.svg" />',
	'<span class="text">RocketFuel</span>',
	'<span class="text">SAS Institute</span>',
	'<img src="/images/slices/activation-tiles/activation-tile.commerce-cloud.svg" />'
];

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

const nextPage = () => {
	if ( pageVersion === '201' ) {
		if (accountParam === 'nto-apparel') {
			window.location = '/jb/'
			return;
		}
		window.location = `/segments/manage-segments?version=${pageVersion}&account=${accountParam}&trigger=successToast`;
		return;
		// window.location = `./index.html?version=${pageVersion}&account=${accountParam}`;
	} else {
		window.location = `/segments/manage-segments?trigger=successToast`;
	}
};


const makeFilledSegmentDetail = (label) => {
	return document.createRange().createContextualFragment(`
		<div class="slds-col slds-p-vertical_xx-small slds-p-horizontal_small slds-size_1-of-3 segment-box slds-m-top_medium">
			<div class="segment-box_label slds-p-vertical_xxx-small">Segment Name</div>
			<div class="segment-box_contents">${label}</div>
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

const getSegmentName = (pageVersion, accountParam) => {
	if (pageVersion === '201') {
		if (accountParam === 'nto-apparel') {
			return 'Winter Jackets - New High Value';
		}
		return '<span style="font-size: 12px;">Winter Jackets Propensity Customers</span>';
	}

	return 'Beach Travelers';
}

const getSegmentDescription = (pageVersion, accountParam) => {
	if (pageVersion === '201') {
		if (accountParam === 'nto-apparel') {
			return '';
		}
		return 'Interested in snow & winter activities';
	}

	return ' ';
}

const $newSegmentName = makeFilledSegmentDetail(getSegmentName(pageVersion, accountParam));
const $newSegmentDescription = makeFilledSegmentDescription(getSegmentDescription(pageVersion, accountParam));

const $segmentName = document.querySelector('#segment-name');
const $segmentDescription = document.querySelector('#segment-description');

if (pageVersion === '201' && accountParam === 'nto-apparel') {
	document.getElementById('details-contents').replaceChild($newSegmentName, $segmentName);
	document.getElementById('details-contents').replaceChild($newSegmentDescription, $segmentDescription);
}

$segmentName.addEventListener('click', () => {
	document.getElementById('details-contents').replaceChild($newSegmentName, $segmentName);
	document.getElementById('details-contents').replaceChild($newSegmentDescription, $segmentDescription);
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

const checkbox = document.getElementById('activate-toggle');
// Activate by default -- toggle still works
checkbox.addEventListener('change', (event) => {
	if (event.target.checked) {
		activate();
	} else {
		deactivate();
	}
})


// activating by default
document.getElementById('details-contents').replaceChild($newSegmentName, $segmentName);
activate();

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
