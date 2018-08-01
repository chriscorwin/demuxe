const navigate = () => {
	const base = window.location.pathname.split('/').slice(0, 3).join('/');
	window.location = `${base}/audience-discovery-segments.html`;
};

const $grid = document.querySelector('#grid');
for (var i = 0; i < 20; i++) {
	$grid.insertAdjacentHTML('beforeend', `<div class="slds-col slds-p-horizontal_small slds-m-bottom_small slds-size_1-of-1 slds-small-size_1-of-2 slds-medium-size_1-of-3 slds-large-size_1-of-4"><img id="card${i}" class="card" src="/img/slices/cards/card.${i}.svg" /></div>`);
	document.querySelector('#card' + i).onclick = (e) => {
		// e.target.onclick = () => {
		//  window.location = '';
		// }
		const sp1 = document.createElement('div');

		sp1.id = e.target.id;
		sp1.classList.add('card');
		sp1.classList.add('clicked-card');

		sp1.insertAdjacentHTML('beforeend', '<a onClick="navigate()" class="slds-button slds-button_neutral">View Categories (45)</a><a onClick="navigate()" class="slds-button slds-button_neutral">View Segments (752)</a>');
		const clicked = document.getElementById(e.target.id);
		clicked.parentNode.replaceChild(sp1, clicked);
	};
}
