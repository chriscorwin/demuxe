const config = require('../config/config.json');

const { exec } = require('child_process');

const slides_id = config.presentationid ? `-a ${config.presentationid} -e` : '';

console.log(`md2gslides slides/${config.productTemplate}.${config.demoVenue}.${config.brandTheme}.md ${slides_id}`);

exec(`md2gslides slides/${config.productTemplate}.${config.demoVenue}.${config.brandTheme}.md ${slides_id}`, (err, stdout, stderr) => {
	if (err) {
		console.error(`error ${err}`);
		return;
	}

	if (stderr) {
		console.warn(`stderr: ${stderr}`);
	}

	console.log(`stdout: ${stdout}`);
});

