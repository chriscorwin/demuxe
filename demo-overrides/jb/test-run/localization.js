// CHANGES HERE REQUIRE SERVER RESTART
const header = {
	avatar: 'images/avatar4.png',
	help: true,
	setup: true
};

const journeyName = "Journey Name";

const undoRedo = {
	type: 'button-group',
	items: [
		{
			iconPath: '/icons/utility-sprite/svg/symbols.svg#undo',
			title: 'Undo'
		},
		{
			iconPath: '/icons/utility-sprite/svg/symbols.svg#redo',
			title: 'Redo'
		}
	]
};

const version1ComboBox = {
	type: 'combobox',
	versionName: "Version 1",
	versions: [
		{
			id: 'a',
			name: 'version a',
			icon: '/icons/utility-sprite/svg/symbols.svg#down'
		}
	]
};

const editCopy = {
	type: 'button-group',
	items: [
		{
			iconPath: '/icons/utility-sprite/svg/symbols.svg#edit',
			title: 'Edit',
			isSelected: true
		},
		{
			iconPath: '/icons/symbols.svg#copy-diamond',
			style: 'padding: 6px 4px 0px 0; height: 26px;',
			title: 'Copy'
		}
	]
};

const uploadTrophy = {
	type: 'button-group',
	items: [
		{
			iconPath: '/icons/symbols.svg#upload-right',
			title: 'Share'
		},
		{
			iconPath: '/icons/symbols.svg#trophy',
			title: 'Win'
		}
	]
}

const settingsButton = {
	type: 'button',
	iconPath: '/icons/utility-sprite/svg/symbols.svg#settings',
	hasOverflow: true
};

const saveValidateTest = {
	type: 'button-group',
	items: [
		{
			text: 'Save'
		},
		{
			iconPath: '/icons/utility-sprite/svg/symbols.svg#down',
			title: 'More'
		},
		{
			text: 'Validate'
		},
		{
			text: 'Test'
		}
	]
};

const activateButton = {
	type: 'button',
	text: 'Activate',
	variant: 'brand'
};

const initialControls = [
	undoRedo,
	version1ComboBox,
	editCopy,
	uploadTrophy,
	settingsButton,
	saveValidateTest,
	activateButton
];

const disabledControls = initialControls.map((control) => {
	const disabledControl = Object.assign({}, control, {isDisabled: true, isSelected: false});
	if (disabledControl.items) {
		disabledControl.items = disabledControl.items.map((item) => Object.assign({}, item, {isDisabled: true, isSelected: false}));
	}
	return disabledControl;
});


module.exports = {
	states: {
		initial: {
			header,
			journeyName,
			controls: initialControls
		},
		disabled: {
			header,
			journeyName,
			controls: disabledControls
		},
		running: {
			header,
			journeyName,
			controls: [
				version1ComboBox,
				uploadTrophy,
				settingsButton,
				{
					type: 'button',
					text: 'Pause',
					hasOverflow: true,
					variant: 'brand'
				}
			]
		},
		stopped: {
			header,
			journeyName,
			controls: [
				version1ComboBox,
				uploadTrophy,
				settingsButton,
				{
					type: 'button',
					text: 'New Version',
					hasOverflow: true
				}
			]
		}
	}
};
// CHANGES HERE REQUIRE SERVER RESTART
