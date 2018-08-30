const getConsentSourcesData = () => {
	const deviceData = [
		{
			name: 'Policy Regime Consent',
			y: 75,
			color: '#73ACE8'
		},
		{
			name: 'Backfill Consent',
			y: 10,
			color: '#FFD33F'
		},
		{
			name: '1st Party Consent',
			y: 10,
			color: '#F49E60'
		},
		{
			name: '2nd Party Consent',
			y: 5,
			color: '#EE7C8F'
		}

	];

	return [
		{
			data: deviceData,
			size: '80%',
			innerSize: '70%'
		}
	];
};

// Gets options for the Cumulative 1st Party Overview chart
const getConsentSourcesOptions = () => {
	return {
		legend: {
			verticalAlign: 'bottom',
			enabled: true
		},
		title: {
			text: ''
		},
		chart: {
			type: 'pie',
			height: 200,
			style: {
				fontFamily: 'Salesforce Sans'
			}
		},
		plotOptions: {
			pie: {
				shadow: false,
				center: ['50%', '50%'],
				dataLabels: {
					enabled: false
				}
			},
			series: {
				animation: {
					duration: 2000
				}
			}
		},
		series: getConsentSourcesData()
	};
};

Highcharts.setOptions({credits: { enabled: false }});
const consentSourcesChart = Highcharts.chart('consent-sources-chart', getConsentSourcesOptions());


const makeGraphLine = (data) => (`
	<div class="slds-col slds-size_1-of-1 slds-grid">
		<div class="slds-col slds-size_1-of-5 slds-p-right_medium" style="text-align: right;">${data.label}</div>
		<div class="slds-col slds-size_4-of-5"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="550" height="30" viewBox="0 0 550 30">
			<g transform="scale(1,-1) translate(0,-30)">
				<rect x="0" y="10" fill="#D8DDE6" width="550" height="30"></rect>
				<rect x="0" y="10" fill="#C398F5" height="30" stroke="#fff" stroke-width="2">
					<animate attributeName="width" from="0" to="${data.width}" dur="0.5s" fill="freeze"/>
					<animate attributeName="stroke-dasharray" from="0, 0, 30" to="0, ${data.width}, 30" dur="0.5s" fill="freeze" />
					<animate attributeName="" from="0" to="2" dur="1s" fill="freeze" />
				</rect>
			</g>
		</svg></div>
	</div>`);

const graphLines = [
	{label: 'Data Collection', width: 460},
	{label: 'Targeting', width: 339},
	{label: 'Analytics', width: 106},
	{label: 'Data Sharing', width: 324},
	{label: 'Data Selling', width: 85},
	{label: 'Re-Identification', width: 92}
];

const makeGraphLines = () => graphLines.reduce((lines, line) => lines + makeGraphLine(line), '');


document.querySelector('#consent-distribution-graph').innerHTML = makeGraphLines();
