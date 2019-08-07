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

	console.log(`
stdout: ${stdout}`);

	const presentationIdRegex = /d\/(.*)\)/;
	const presentationId = stdout.match(presentationIdRegex) && stdout.match(presentationIdRegex)[1];

	console.log(`
Your Google Slides presentation ID is: ${presentationId}

If you would like the generated slide deck (at https://docs.google.com/presentation/d/${presentationId})
to update next time you run the npm run upload command, update your config settings (probably in /config/config.json)
with the following (if you have not yet done so):

"presentationid": "${presentationId}"

`);
});
