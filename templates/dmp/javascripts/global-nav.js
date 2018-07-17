const switchAccount = ( data ) => {
	console.log( 'switch account!', data );
	accountName = data;
	// $ss.click( );
}

// Keep the host and doesn’t show up when we hover on links, use this instead of href! execs hate to see “heroku” up there
const navigatePage = ( url ) => {
	window.location.href = url;
}

const makeCloudIconForJourneyBuilder = ( data ) => {

	console.log('data.appName', data.appName);
	console.log('data.pageVersion', data.pageVersion);
	console.log('data.pageVersion === 201', data.pageVersion === '201');
	console.log('data.accountParam', data.accountParam);
	console.log('data.accountName', data.accountName);
	console.log('data.accountName === Northern Trail Outfitters', data.accountName === 'Northern Trail Outfitters');

	if ( data.pageVersion === '201' && data.appName === 'Journey Builder' ) {
		return (`
			<div class="slds-global-header__logo slds-p-around_x-small"><a href="/jb/"><img src="/img/sf-logo.svg"></a></div>
		`)
	} else {
		return ('')
	}

};


const makeDropdownLink = ( data ) => {
	if ( data.separator ) {
		return ( `
			<li class="slds-dropdown__header" role="separator">
				<span class="slds-text-title_caps">${data.label}</span>
			</li>
		` )
	}

	return ( `
		<li class="slds-dropdown__item" role="presentation">
			<a href="javascript:void(0);" onclick="navigatePage('${data.href}');" id="${data.id}" role="menuitem" tabindex="-1">
				<span class="slds-truncate" title="${data.label}">${data.label}</span>
			</a>
		</li>
	` )
};

const makeAccountDropdownLink = ( data ) => {

	return ( `

		<li class="slds-dropdown__item" role="presentation">

			<a href="javascript:void(0);" onclick="switchAccount('${data.label}'); navigatePage('${data.href}');" id="${data.id}" role="menuitem" tabindex="-1">
				<span class="slds-truncate" title="Northern Trail Outfitters - Electronics">
					<svg style="opacity: ${accountName === data.label ? 1 : 0}" class="slds-icon slds-icon_x-small slds-m-right_small slds-icon-text-default" aria-hidden="true">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#check" />
					</svg>
					${data.label}
				</span>
			</a>
		</li>

	` )
};
const makeUserDropdownLink = ( data ) => {

	return ( `

		<li class="slds-dropdown__item" role="presentation">

			<a href="javascript:void(0);" onclick="switchAccount('${data.label}'); navigatePage('${data.href}');" id="${data.id}" role="menuitem" tabindex="-1">
				<span class="slds-truncate" title="Northern Trail Outfitters - Electronics">
					<svg style="opacity: ${userName === data.label ? 1 : 0}" class="slds-icon slds-icon_x-small slds-m-right_small slds-icon-text-default" aria-hidden="true">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#check" />
					</svg>
					${data.label}
				</span>
			</a>
		</li>

	` )
};

const makeNotificationsMenu = ( data ) => {

	return ( `



		<li class="slds-context-bar__item slds-context-bar__item_tab slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover" style="width: auto; max-width: 20rem;">

			<div class="menu-item ${data.notificationsBadgeIsActive ? 'menu-item_has-badge' : ''} slds-m-right_x-small slds-m-left_xxx-small" title="Show Notifications">
				<img class="icon" src="/img/bell.svg">
				<span class="slds-assistive-text">Show Notifications</span>
			</div>

			<section style="right: -3px; width: 26rem; max-width: 40rem;" class=" slds-dropdown slds-dropdown_right slds-popover slds-nubbin_top-right slds-dynamic-menu" role="dialog" aria-label="My Favourites" aria-describedby="dialog-body-id-17">
				<div class="slds-popover__body slds-p-horizontal_none" id="dialog-body-id-17">
					<div id="listbox-unique-id" role="listbox">

						<ul class="slds-listbox slds-listbox_vertical slds-dropdown_length-10" role="group" aria-label="Notifications">


							<!-- header -->
							<li role="presentation" class="slds-listbox__item">
								<div class="slds-listbox__option slds-listbox__option_plain">
									<div class=" slds-grid slds-gutters slds-grid_vertical-align-center">
										<div class="slds-col">
											<h3 class="slds-text-title_caps" role="presentation">Notifications</h3>
										</div>
										<div class="slds-col_bump-left">
											<button onclick="navigatePage('${data.clearNotificationsHref}');" class="slds-button">Mark all read</button>
											<button class="slds-button">Settings</button>
										</div>
									</div>
								</div>
							</li>



							<!-- body -->
							<li role="presentation" class="slds-listbox__item">
								<div id="listbox-option-id-53" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option" tabindex="0">
									<span class="slds-media__figure">
										<span class="slds-icon_container slds-icon-standard-approval">
											<svg class="slds-icon slds-icon_small slds-p-around_xx-small" aria-hidden="true">
												<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/action-sprite/svg/symbols.svg#approval"></use>
											</svg>
										</span>
									</span>

									<span class="slds-media__body">
										<div class="slds-grid  slds-grid_vertical-align-top">
											<div class="slds-media__body slds-media__body slds-m-bottom_small">
												<h2 class="slds-card__header-title">
													<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="New Attribute Available">
														<span>New Attribute Available</span>
													</a>
												</h2>
											</div>

											<div class="slds-no-flex">
												<div class="slds-dropdown-trigger slds-dropdown-trigger_click ">
													<button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="Show More">
														<svg class="slds-button__icon" aria-hidden="true">
															<use xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#down"></use>
														</svg>
														<span class="slds-assistive-text">Show More</span>
													</button>
												</div>
											</div>
										</div>

										<div class="slds-grid  slds-grid_vertical-align-top">
											<div class="slds-media__body slds-m-bottom_small slds-truncate slds-p-right_large" style=" white-space: normal;">

												<p class="slds-truncate slds-listbox__option-text slds-listbox__option-text_entity"><a href="javascript:void(0);" >Winter Jackets - New High Value</a> from Norther Trail Outfitters Electronics is ready to use.</p>
												<p class="slds-listbox__option-meta slds-listbox__option-meta_entity">6/14/2018</p>
											</div>
											<div class="slds-no-flex">
												<div class="slds-little-blue-pill">
												</div>
											</div>
										</div>
									</span>
								</div>
							</li>


							<li role="presentation" class="slds-listbox__item">
								<div id="listbox-option-id-53" class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option" tabindex="0">
									<span class="slds-media__figure">
										<span class="slds-icon_container slds-icon-standard-approval">
											<svg class="slds-icon slds-icon_small slds-p-around_xx-small" aria-hidden="true">
												<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/action-sprite/svg/symbols.svg#approval"></use>
											</svg>
										</span>
									</span>

									<span class="slds-media__body">
										<div class="slds-grid  slds-grid_vertical-align-top">
											<div class="slds-media__body slds-media__body slds-m-bottom_small">
												<h2 class="slds-card__header-title">
													<a href="javascript:void(0);" class="slds-card__header-link slds-truncate" title="Segment Successfuly Processed">
														<span>Segment Successfuly Processed</span>
													</a>
												</h2>
											</div>

											<div class="slds-no-flex">
												<div class="slds-dropdown-trigger slds-dropdown-trigger_click ">
													<button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" title="Show More">
														<svg class="slds-button__icon" aria-hidden="true">
															<use xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#down"></use>
														</svg>
														<span class="slds-assistive-text">Show More</span>
													</button>
												</div>
											</div>
										</div>

										<div class="slds-grid  slds-grid_vertical-align-top">
											<div class="slds-media__body slds-m-bottom_small slds-truncate slds-p-right_large" style=" white-space: normal;">

												<p class="slds-truncate slds-listbox__option-text slds-listbox__option-text_entity">9 segments ready to activate.</p>
												<p class="slds-listbox__option-meta slds-listbox__option-meta_entity">1h ago</p>
											</div>
											<div class="slds-no-flex">
												<div class="NO-slds-little-blue-pill">
												</div>
											</div>
										</div>
									</span>
								</div>
							</li>

						</ul>
					</div>
				</div>
				<footer class="slds-popover__footer">
					<!-- hi -->
				</footer>
			</section>

		</li>




	` )
};

const makeAccountDropdownLinks = ( accountNavItems ) => accountNavItems.reduce( ( items, item ) => items + makeAccountDropdownLink( item ), '' );
const makeUserDropdownLinks = ( userNavItems ) => userNavItems.reduce( ( items, item ) => items + makeUserDropdownLink( item ), '' );

const makeDropdownLinks = ( dropdownItems ) => dropdownItems.reduce( ( columns, column ) => {
	return columns + `
		<ul class="slds-dropdown__list slds-col slds-p-horizontal_medium slds-size_1-of-${dropdownItems.length}" role="menu">
			${column.reduce((links, link) => links + makeDropdownLink(link), '')}
		</ul>
	`;
}, '' );

const makeNavItem = ( navItem ) => {
	const activeClass = navItem.isActive ? ' slds-is-active' : '';
	const dropdownIcon = !navItem.dropdownItems && !navItem.lookLikeDropdown ? '' : `
		<div class="slds-context-bar__icon-action slds-p-left_none">
			<button class="slds-button slds-button_icon slds-button_icon slds-context-bar__button" aria-haspopup="true" title="Open menu item submenu">
				<svg width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path fill="#4F6A92" d="M9.15909091,1.01136364 L4.84090909,5.375 C4.70454545,5.46590909 4.52272727,5.46590909 4.38636364,5.375 L0.0681818182,1.01136364 C-0.0227272727,0.875 -0.0227272727,0.693181818 0.0681818182,0.556818182 L0.522727273,0.102272727 C0.659090909,-0.0340909091 0.886363636,-0.0340909091 1.02272727,0.102272727 L4.38636364,3.51136364 C4.52272727,3.64772727 4.70454545,3.64772727 4.84090909,3.51136364 L8.20454545,0.102272727 C8.34090909,0.0113636364 8.56818182,0.0113636364 8.70454545,0.102272727 L9.15909091,0.556818182 C9.25,0.693181818 9.25,0.875 9.15909091,1.01136364 Z" id="Shape"></path>
				</svg>
				<span class="slds-assistive-text">Open menu item submenu</span>
			</button>
		</div>
	`;
	const dropdownMenu = !navItem.dropdownItems ? '' : `
		<div class="slds-dropdown slds-dropdown_left slds-grid" style="max-width: 50rem;">
			${makeDropdownLinks(navItem.dropdownItems)}
		</div>
	`;

	return `
		<li class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover${activeClass}">
			<a href="javascript:void(0);" id="${navItem.id}" onclick="navigatePage('${navItem.href}');" class="slds-context-bar__label-action" title="${navItem.label}">
				<span class="slds-truncate" title="${navItem.label}">${navItem.label}</span>
			</a>
			${dropdownIcon}
			${dropdownMenu}
		</li>
	`
}

const makeNavLinks = ( navItems ) => navItems.reduce( ( items, item ) => items + makeNavItem( item ), '' );
const makePrimaryNav = ( data ) => {

	return ( `
		<div class="slds-context-bar__primary">
			<div class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
				<span class="slds-context-bar__label-action slds-context-bar__app-name">
					${makeCloudIconForJourneyBuilder(data)}
					<span class="slds-truncate" title="${data.appName}">${data.appName}</span>
				</span>
			</div>
		</div>
		<nav class="slds-context-bar__secondary xslds-size_6-of-12" role="navigation"><ul class="slds-grid">
			${makeNavLinks(data.navItems)}
		</ul></nav>
		<ul class="slds-grid slds-col--bump-left" role="tablist">
			<li class="slds-context-bar__item slds-context-bar__item_tab" style="width: auto;">
				<div class="menu-item slds-m-right_small" id="pins"><img class="icon" src="/img/slds-icons/utility/pin-dark-blue.svg" /> <span>0</span></div>
			</li>
			<li class="slds-context-bar__item slds-context-bar__item_tab" style="width: auto;">
				<div class="menu-item slds-m-right_small"><img class="icon" src="/img/cart.svg" /> 0</div>
			</li>






			${makeNotificationsMenu(data)}







			<li class="slds-context-bar__item slds-context-bar__item_tab slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover" style="width: auto; max-width: 20rem;">
				<a href="javascript:void(0);" class="slds-context-bar__label-action" title="${data.accountName}">
					<span class="slds-truncate" title="${data.accountName}">${data.accountName}</span>
				</a>
				<div class="slds-context-bar__icon-action slds-p-left_none">
					<button class="slds-button slds-button_icon slds-button_icon slds-context-bar__button" aria-haspopup="true" title="Open menu item submenu">
						<svg class="slds-m-left_small" width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
							<path fill="#4F6A92" d="M9.15909091,1.01136364 L4.84090909,5.375 C4.70454545,5.46590909 4.52272727,5.46590909 4.38636364,5.375 L0.0681818182,1.01136364 C-0.0227272727,0.875 -0.0227272727,0.693181818 0.0681818182,0.556818182 L0.522727273,0.102272727 C0.659090909,-0.0340909091 0.886363636,-0.0340909091 1.02272727,0.102272727 L4.38636364,3.51136364 C4.52272727,3.64772727 4.70454545,3.64772727 4.84090909,3.51136364 L8.20454545,0.102272727 C8.34090909,0.0113636364 8.56818182,0.0113636364 8.70454545,0.102272727 L9.15909091,0.556818182 C9.25,0.693181818 9.25,0.875 9.15909091,1.01136364 Z" id="Shape"></path>
						</svg>
						<span class="slds-assistive-text">Open menu item submenu</span>
					</button>
				</div>
				<div class="slds-dropdown slds-dropdown_right" style="width: auto; min-width: 10rem;">
					<ul class="slds-dropdown__list" role="menu">
						<li class="slds-dropdown__item" role="presentation">

							<div class="slds-form-element slds-m-around--small">
								<div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
									<svg class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#search" />
									</svg>
									<input type="text" id="text-input-id-1" class="slds-input" placeholder="Find Instance" />
								</div>
							</div>

						</li>

						${accountName === 'Ducati' ? '' : makeAccountDropdownLinks(data.accountNavItems)}

					</ul>
				</div>
			</li>
		</ul>
	` )
}
const makePrimaryNavJourneyBuilder = ( data ) => {

	return ( `
		<div class="slds-context-bar__primary">
			<div class="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
				<span class="slds-context-bar__label-action slds-context-bar__app-name">
					${makeCloudIconForJourneyBuilder(data)}
					<span class="slds-truncate" title="${data.appName}">${data.appName}</span>
				</span>
			</div>
		</div>
		<nav class="slds-context-bar__secondary xslds-size_6-of-12" role="navigation"><ul class="slds-grid">
			${makeNavLinks(data.navItems)}
		</ul></nav>
		<ul class="slds-grid slds-col--bump-left" role="tablist">
			<li class="slds-context-bar__item " style="width: auto;">
				<button class="slds-button slds-p-horizontal_medium">Feedback</button>
			</li>



			<li class="slds-context-bar__item  slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover" style="width: auto; max-width: 20rem;">
				<a href="javascript:void(0);" class="slds-context-bar__label-action" title="${data.accountName}">
					<span class="slds-truncate" title="${data.accountName}">${data.accountName}</span>
				</a>
				<div class="slds-context-bar__icon-action slds-p-left_none">
					<button class="slds-button slds-button_icon slds-button_icon slds-context-bar__button" aria-haspopup="true" title="Open menu item submenu">
						<svg class="slds-m-left_small" width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
							<path fill="#4F6A92" d="M9.15909091,1.01136364 L4.84090909,5.375 C4.70454545,5.46590909 4.52272727,5.46590909 4.38636364,5.375 L0.0681818182,1.01136364 C-0.0227272727,0.875 -0.0227272727,0.693181818 0.0681818182,0.556818182 L0.522727273,0.102272727 C0.659090909,-0.0340909091 0.886363636,-0.0340909091 1.02272727,0.102272727 L4.38636364,3.51136364 C4.52272727,3.64772727 4.70454545,3.64772727 4.84090909,3.51136364 L8.20454545,0.102272727 C8.34090909,0.0113636364 8.56818182,0.0113636364 8.70454545,0.102272727 L9.15909091,0.556818182 C9.25,0.693181818 9.25,0.875 9.15909091,1.01136364 Z" id="Shape"></path>
						</svg>
						<span class="slds-assistive-text">Open menu item submenu</span>
					</button>
				</div>
				<div class="slds-dropdown slds-dropdown_right" style="width: auto; min-width: 10rem;">
					<ul class="slds-dropdown__list" role="menu">
						<li class="slds-dropdown__item" role="presentation">

							<div class="slds-form-element slds-m-around--small">
								<div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
									<svg class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#search" />
									</svg>
									<input type="text" id="text-input-id-1" class="slds-input" placeholder="Find Instance" />
								</div>
							</div>

						</li>

						${accountName === 'Ducati' ? '' : makeAccountDropdownLinks(data.accountNavItems)}

					</ul>
				</div>
			</li>




			<li class="slds-context-bar__item slds-context-bar__item_tab slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_hover" style="width: auto; max-width: 20rem;">



				<a href="javascript:void(0);" class="slds-context-bar__label-action" title="${data.userName}">
					<span class="slds-avatar slds-avatar_circle slds-avatar_small slds-m-horizontal_x-small">
						<img alt="Person name" src="/img/avatar1.jpg" title="User avatar" />
					</span>
					<span class="slds-truncate" title="${data.userName}">${data.userName}</span>
				</a>
				<div class="slds-context-bar__icon-action slds-p-left_none">
					<button class="slds-button slds-button_icon slds-button_icon slds-context-bar__button" aria-haspopup="true" title="Open menu item submenu">
						<svg class="slds-m-left_small" width="10px" height="6px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
							<path fill="#4F6A92" d="M9.15909091,1.01136364 L4.84090909,5.375 C4.70454545,5.46590909 4.52272727,5.46590909 4.38636364,5.375 L0.0681818182,1.01136364 C-0.0227272727,0.875 -0.0227272727,0.693181818 0.0681818182,0.556818182 L0.522727273,0.102272727 C0.659090909,-0.0340909091 0.886363636,-0.0340909091 1.02272727,0.102272727 L4.38636364,3.51136364 C4.52272727,3.64772727 4.70454545,3.64772727 4.84090909,3.51136364 L8.20454545,0.102272727 C8.34090909,0.0113636364 8.56818182,0.0113636364 8.70454545,0.102272727 L9.15909091,0.556818182 C9.25,0.693181818 9.25,0.875 9.15909091,1.01136364 Z" id="Shape"></path>
						</svg>
						<span class="slds-assistive-text">Open menu item submenu</span>
					</button>
				</div>
				<div class="slds-dropdown slds-dropdown_right" style="width: auto; min-width: 10rem;">
					<ul class="slds-dropdown__list" role="menu">
						<li class="slds-dropdown__item" role="presentation">

							<div class="slds-form-element slds-m-around--small">
								<div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
									<svg class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" aria-hidden="true">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/slds-icons/utility-sprite/svg/symbols.svg#search" />
									</svg>
									<input type="text" id="text-input-id-1" class="slds-input" placeholder="Find Instance" />
								</div>
							</div>

						</li>

						${userName === 'Ducati' ? '' : makeUserDropdownLinks(data.userNavItems)}

					</ul>
				</div>
			</li>




		</ul>
	` )
}


const url = new URL( window.location.href );
const versionParam = url.searchParams.get( 'version' );
let pageVersion = url.searchParams.get( 'version' );
const userParam = url.searchParams.get( 'user' ) || 'Dan';

const triggerParam = url.searchParams.get( 'trigger' );

let accountName = 'Ducati';
let userName = '';
let appName = 'Salesforce DMP';

// Set some defaults in case they go straight to /jb-flow.html
if (activePage === 'journeys') {
	accountName = 'nto-general';
	pageVersion = '201';
	userName = 'Dan';
	appName = 'Journey Builder';
}

if ( pageVersion === '201' ) {
	accountName = 'Northern Trail Outfitters - Apparel';
}

if ( accountParam === 'nto-apparel' ) {
	accountName = 'Northern Trail Outfitters - Apparel';
}

if ( accountParam === 'nto-electronics' ) {
	accountName = 'Northern Trail Outfitters - Electronics';
}

if ( accountParam === 'nto-general' ) {
	accountName = 'Northern Trail Outfitters';
	userName = 'Dan';
}

let notificationsBadgeIsActive = triggerParam === 'notificationsBadge' || null;


const navData = {
	appName,
	pageVersion,
	accountName,
	accountParam,
	userName,
	userParam,
	notificationsBadgeIsActive,
	clearNotificationsHref: '?version=201&account=nto-apparel',
	accountNavItems: [
		{
			label: 'Northern Trail Outfitters - Apparel',
			id: 'nto-apparel-account-switcher',
			href: '?version=201&account=nto-apparel&trigger=notificationsBadge',
			isActive: ( accountName === 'Northern Trail Outfitters - Apparel' )
		},
		{
			label: 'Northern Trail Outfitters - Electronics',
			id: 'nto-electronics-account-switcher',
			href: '?version=201&account=nto-electronics',
			isActive: ( accountName === 'Northern Trail Outfitters - Electronics' )
		},
		{
			label: 'Northern Trail Outfitters',
			id: 'nto-general-account-switcher',
			href: '?version=201&account=nto-general',
			isActive: ( accountName === 'Northern Trail Outfitters' )
		}
	],
	navItems: [ {
			label: 'Overview',
			href: `/?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'overview' )
		},
		{
			label: 'Segments',
			id: 'segments-global-nav-link',
			href: pageVersion === '201' ? `/segments.manage-segments.html?version=${pageVersion}&account=${accountParam}` : `/segment-builder.new-segment.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'segments' )
		},
		{
			label: 'Insights',
			href: `?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'insights' ),
			dropdownItems: [
				[ {
						separator: true,
						label: 'Insights'
					},
					{
						label: 'Einstein Segmentation',
						href: `/insights.einstein-segmentation.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
						id: 'einstein-segmentation-link'
					},
					{
						label: 'Top Overlapping Segments'
					},
					{
						label: 'Data Providers'
					},
					{
						label: 'Funnels'
					},
					{
						label: 'Frequency Reports'
					},
					{
						label: 'Campaign Attribution'
					},
					{
						label: 'Attribution'
					},
					{
						label: 'Custom Index Tool'
					}
				],
				[ {
						separator: true,
						label: 'Reporting Center'
					},
					{
						label: 'Manage Reports'
					},
					{
						label: 'View Reports'
					}
				],
				[ {
						separator: true,
						label: 'Content Engagement'
					},
					{
						label: 'Audience Analytics'
					},
					{
						label: 'Engagement'
					},
					{
						label: 'Loyalty'
					},
					{
						label: 'Social Activity'
					},
					{
						label: 'Search Keywords'
					},
					{
						label: 'First Party User Match'
					}
				]
			]
		},
		{
			label: 'Activation',
			href: `?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			lookLikeDropdown: true,
			isActive: ( activePage === 'activation' )
		},
		{
			label: 'Manage',
			href: `?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			lookLikeDropdown: true,
			isActive: ( activePage === 'manage' )
		},
		{
			label: 'Data Studio',
			href: `?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			lookLikeDropdown: true,
			isActive: ( activePage === 'data-studio' )
		}
	]
}


const navDataJourneyBuilder = {
	appName,
	pageVersion,
	accountName,
	accountParam,
	userName,
	userParam,
	notificationsBadgeIsActive,
	clearNotificationsHref: '?version=201&account=nto-apparel',
	userNavItems: [
		{
			label: userName,
			id: 'nto-apparel-name-switcher-main',
			href: `?version=201&account=nto-general&user=${userParam}`,
			isActive: ( userName === userName )
		}
	],
	accountNavItems: [
		{
			label: 'Northern Trail Outfitters - Apparel',
			id: 'nto-apparel-account-switcher',
			href: '?version=201&account=nto-apparel&trigger=notificationsBadge',
			isActive: ( accountName === 'Northern Trail Outfitters - Apparel' )
		},
		{
			label: 'Northern Trail Outfitters - Electronics',
			id: 'nto-electronics-account-switcher',
			href: '?version=201&account=nto-electronics',
			isActive: ( accountName === 'Northern Trail Outfitters - Electronics' )
		},
		{
			label: 'Northern Trail Outfitters',
			id: 'nto-general-account-switcher',
			href: '?version=201&account=nto-general',
			isActive: ( accountName === 'Northern Trail Outfitters' )
		}
	],
	navItems: [ {
			label: 'Journeys',
			href: `/journey-builder.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			id: 'journeys-global-nav-link',
			isActive: ( activePage === 'journeys' )
		},
		{
			label: 'Entry Source',
			id: 'entry-source-global-nav-link',
			href: `/journey-builder.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'entry-source' )
		},
		{
			label: 'History',
			id: 'history-global-nav-link',
			href: `/journey-builder.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'history' )
		},
		{
			label: 'Templates',
			id: 'entry-source-global-nav-link',
			href: `/journey-builder.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
			isActive: ( activePage === 'templatse' )
		}
	]
}
const accountData = {
	appName,
	accountName,
	navItems: [ {
		label: `$data`,
		href: `?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
		isActive: ( activePage === 'insights' ),
		dropdownItems: [
			[ {
					separator: true,
					label: 'Insights'
				},
				{
					label: 'Einstein Segmentation',
					href: `/insights.einstein-segmentation.html?version=${pageVersion}&account=${accountParam}&user=${userParam}`,
					id: 'einstein-segmentation-link'
				},
				{
					label: 'Top Overlapping Segments'
				},
				{
					label: 'Data Providers'
				},
				{
					label: 'Funnels'
				},
				{
					label: 'Frequency Reports'
				},
				{
					label: 'Campaign Attribution'
				},
				{
					label: 'Attribution'
				},
				{
					label: 'Custom Index Tool'
				}
			],
			[ {
					separator: true,
					label: 'Reporting Center'
				},
				{
					label: 'Manage Reports'
				},
				{
					label: 'View Reports'
				}
			],
			[ {
					separator: true,
					label: 'Content Engagement'
				},
				{
					label: 'Audience Analytics'
				},
				{
					label: 'Engagement'
				},
				{
					label: 'Loyalty'
				},
				{
					label: 'Social Activity'
				},
				{
					label: 'Search Keywords'
				},
				{
					label: 'First Party User Match'
				}
			]
		]
	} ]
}


let primaryNavElement =  document.getElementById('primaryNav');

if (typeof(primaryNavElement) != 'undefined' && primaryNavElement != null) {
	document.querySelector( '#primaryNav' )
		.innerHTML = makePrimaryNav( navData );
}

let primaryNavJourneyBuilderElement =  document.getElementById('primaryNavJourneyBuilder');

if (typeof(primaryNavJourneyBuilderElement) != 'undefined' && primaryNavJourneyBuilderElement != null) {
	document.querySelector( '#primaryNavJourneyBuilder' )
		.innerHTML = makePrimaryNavJourneyBuilder( navDataJourneyBuilder );
}

