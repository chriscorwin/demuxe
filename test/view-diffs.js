// npm run view-diffs
// launches kaleidoscope for each failing snapshot in test demo-flows

const path = require('path');
const fs = require("fs");

const diffs = [];

const showDiff = (path) => {
	const { exec } = require('child_process');
	exec(`ksdiff ${path}`, (err, stdout, stderr) => {
		// if (err) {
		// 	//some err occurred
		// 	console.error(err)
		// } else {
		//  // the *entire* stdout and stderr (buffered)
		//  console.log(`stdout: ${stdout}`);
		//  console.log(`stderr: ${stderr}`);
		// }
	});
}

fs.readdirSync(path.join(__dirname, 'screenshots')).forEach((object) => {
	try{
		if(object !== '.DS_Store' && fs.statSync(path.join(__dirname, 'screenshots', object, '__different_snapshot__')).isDirectory()) {
			fs.readdirSync(path.join(__dirname, 'screenshots', object, '__different_snapshot__')).forEach((file) => {
				if (file === '.DS_Store') return;

				const diffPath = `${path.join(__dirname, 'screenshots', object, file).replace('.new', '')} ${path.join(__dirname, 'screenshots', object, '__different_snapshot__', file)}`;

				showDiff(diffPath);

				diffs.push(diffPath);
			});
		}
	} catch (e) {
		console.error(e);
	}

});

console.log(diffs.join(' \n\n'));