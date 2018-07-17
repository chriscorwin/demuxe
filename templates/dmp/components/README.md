Files in this folder should be entirely self-contained and include-able in any other file like this:

<%- include('components/chart.activation-partners.ejs') %>

You can pass params to an include, like this:

<%- include('components/toast', {
	contents: 'Will be available only under ‘Northern Trail Outfitters - Apparel&rsquo; account as &lsquo;Winter Jackets &ndash; New High Value&rsquo;',
	title: '&lsquo;Winter Jackets Propensity Customers&rsquo; segment provisioned successfully.',
	theme: 'success'			
}) %>