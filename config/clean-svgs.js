console.group(`
============================================================
Demuxe: Running \`config/clean-svgs.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const util = require('util');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { execSync } = require('child_process');

const cleanSVGs = (configData) => {
	const dirPath = './magick-flows-web-root/magick-flows/';
	const dir = fs.readdirSync(dirPath);

	dir.forEach(fileOrDirectory => {
		const fileOrDirectoryPath = path.join(dirPath, fileOrDirectory);

		// We only care about directories.
		if (!fs.statSync(fileOrDirectoryPath).isDirectory()) return;

		// Make sure main-src directory exists and is not empty
		if (!fs.existsSync(path.join(fileOrDirectoryPath, '/main-src/')) || fs.readdirSync(path.join(fileOrDirectoryPath, '/main-src/')).length <= 0) return;


		console.log(`svgo --folder=${fileOrDirectoryPath}/main-src/ --output=${fileOrDirectoryPath}/main-svgo-processed/ --config=./config/svgo.config.json --pretty`);
		console.log('this could take a few minutes...')
		execSync(`svgo --folder=${fileOrDirectoryPath}/main-src/ --output=${fileOrDirectoryPath}/main-svgo-processed/ --config=./config/svgo.config.json --pretty`);

		console.log(`mkdir -p ${fileOrDirectoryPath}/main-src-originals && mv ${fileOrDirectoryPath}/main-src/* ${fileOrDirectoryPath}/main-src-originals/`);
		execSync(`mkdir -p ${fileOrDirectoryPath}/main-src-originals && mv ${fileOrDirectoryPath}/main-src/* ${fileOrDirectoryPath}/main-src-originals/`);

		// do lineheight stuff
		const subDirectoryContents = fs.readdirSync(path.join(fileOrDirectoryPath, 'main-svgo-processed'));

		subDirectoryContents.forEach(subFileOrDirectory => {
			if (subFileOrDirectory === '.DS_Store') {
				console.log('is DS_Store. Skip');
				return;
			}
			console.log(`considering file: ${subFileOrDirectory}`);
			const fileContents = fs.readFileSync(path.join(fileOrDirectoryPath, 'main-svgo-processed', subFileOrDirectory), 'utf8');
			const dom = new JSDOM(fileContents);

			const correctThese = dom.window.document.querySelectorAll('text[line-spacing]');
			correctThese.forEach((correctThis) => {
				const fontSize = correctThis.getAttribute('font-size');
				const lineSpacing = correctThis.getAttribute('line-spacing');
				const difference = fontSize - lineSpacing;
				const distance = Math.ceil(Math.abs(difference));
				const adjust = (distance > 4 && difference >= 0) ? distance : 4;
				const finalAdjust = (difference >= 0) ? adjust : (distance <= fontSize) ? -1 : -adjust;
				console.log(difference, finalAdjust);
				correctThis.querySelectorAll('tspan').forEach((t) => {
					t.setAttribute('y', t.getAttribute('y') - finalAdjust);
				});
			});

			fs.writeFileSync(path.join(fileOrDirectoryPath, 'main-svgo-processed', subFileOrDirectory), dom.serialize(), 'utf8');
		});

		console.log(`mkdir -p ${fileOrDirectoryPath}/main && mv ${fileOrDirectoryPath}/main-svgo-processed/* ${fileOrDirectoryPath}/main/`);
		execSync(`mkdir -p ${fileOrDirectoryPath}/main && mv ${fileOrDirectoryPath}/main-svgo-processed/* ${fileOrDirectoryPath}/main/`);

	});
}

module.exports = cleanSVGs;

console.log(`...end: \`config/clean-svgs.js\`
------------------------------------------------------------`);
console.groupEnd();




