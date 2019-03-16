// CHANGES HERE REQUIRE SERVER RESTART
module.exports = {
	header: {
		avatar: 'images/avatar4.png',
		help: true,
		setup: true
	},
	journeyName: "Journey Name",
	controls: {
		states: {
			initial: [
				{
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
				},
				{
					type: 'combobox',
					versionName: "Version 1",
					versions: [
						{
							id: 'a',
							name: 'version a',
							icon: '/icons/utility-sprite/svg/symbols.svg#down'
						}
					]
				},
				{
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
				},
				{
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
				},
				{
					type: 'button',
					iconPath: '/icons/utility-sprite/svg/symbols.svg#settings',
					hasOverflow: true
				},
				{
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
				},
				{
					type: 'button',
					text: 'Activate',
					variant: 'brand'
				}
			],
			disabled: [
				{
					type: 'button-group',
					items: [
						{
							iconPath: '/icons/utility-sprite/svg/symbols.svg#undo',
							title: 'Undo',
							isDisabled: true
						},
						{
							iconPath: '/icons/utility-sprite/svg/symbols.svg#redo',
							title: 'Redo',
							isDisabled: true
						}
					]
				},
				{
					type: 'combobox',
					versionName: "Version 1",
					isDisabled: true,
					versions: [
						{
							id: 'a',
							name: 'version a',
							icon: '/icons/utility-sprite/svg/symbols.svg#down'
						}
					]
				},
				{
					type: 'button-group',
					items: [
						{
							iconPath: '/icons/utility-sprite/svg/symbols.svg#edit',
							title: 'Edit',
							isDisabled: true
						},
						{
							iconPath: '/icons/symbols.svg#copy-diamond',
							style: 'padding: 6px 4px 0px 0; height: 26px;',
							title: 'Copy',
							isDisabled: true
						}
					]
				},
				{
					type: 'button-group',
					items: [
						{
							iconPath: '/icons/symbols.svg#upload-right',
							title: 'Share',
							isDisabled: true
						},
						{
							iconPath: '/icons/symbols.svg#trophy',
							title: 'Win',
							isDisabled: true
						}
					]
				},
				{
					type: 'button',
					iconPath: '/icons/utility-sprite/svg/symbols.svg#settings',
					hasOverflow: true,
					isDisabled: true
				},
				{
					type: 'button-group',
					items: [
						{
							text: 'Save',
							isDisabled: true
						},
						{
							iconPath: '/icons/utility-sprite/svg/symbols.svg#down',
							title: 'More',
							isDisabled: true
						},
						{
							text: 'Validate',
							isDisabled: true
						},
						{
							text: 'Test',
							isDisabled: true
						}
					]
				},
				{
					type: 'button',
					text: 'Activate',
					isDisabled: true
				}
			],
			running: [
				{
					type: 'combobox',
					versionName: "Version 1",
					versions: [
						{
							id: 'a',
							name: 'version a',
							icon: '/icons/utility-sprite/svg/symbols.svg#down'
						}
					]
				},
				{
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
				},
				{
					type: 'button',
					iconPath: '/icons/utility-sprite/svg/symbols.svg#settings',
					hasOverflow: true
				},
				{
					type: 'button',
					text: 'Pause',
					hasOverflow: true,
					variant: 'brand'
				}
			],
			stopped: [
				{
					type: 'combobox',
					versionName: "Version 1",
					versions: [
						{
							id: 'a',
							name: 'version a',
							icon: '/icons/utility-sprite/svg/symbols.svg#down'
						}
					]
				},
				{
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
				},
				{
					type: 'button',
					iconPath: '/icons/utility-sprite/svg/symbols.svg#settings',
					hasOverflow: true
				},
				{
					type: 'button',
					text: 'New Version',
					hasOverflow: true
				}
			]
		},

	}
};
// CHANGES HERE REQUIRE SERVER RESTART
