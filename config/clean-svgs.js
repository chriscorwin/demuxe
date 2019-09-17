console.group(`
============================================================
Demuxe: Running \`config/clean-svgs.js\` now...
------------------------------------------------------------
`);
const path = require('path');
const util = require('util');
const fs = require('fs');

const { execSync } = require('child_process');

const cleanSVGs = (configData) => {
	const dirPath = './magick-flows-web-root/magick-flows/';
	const dir = fs.readdirSync(dirPath);

	dir.forEach(fileOrDirectory => {
		const fileOrDirectoryPath = path.join(dirPath, fileOrDirectory);

		// We only care about directories.
		if (!fs.statSync(fileOrDirectoryPath).isDirectory()) return;

		console.log(`svgo --folder=${fileOrDirectoryPath}/main-src/ --output=${fileOrDirectoryPath}/main-svgo-processed/ --config=./config/svgo.config.json --pretty`);
		console.log('this could take a few minutes...')
		execSync(`svgo --folder=${fileOrDirectoryPath}/main-src/ --output=${fileOrDirectoryPath}/main-svgo-processed/ --config=./config/svgo.config.json --pretty`);

		console.log(`mkdir -p ${fileOrDirectoryPath}/main-src-originals && mv ${fileOrDirectoryPath}/main-src/* ${fileOrDirectoryPath}/main-src-originals/`);
		execSync(`mkdir -p ${fileOrDirectoryPath}/main-src-originals && mv ${fileOrDirectoryPath}/main-src/* ${fileOrDirectoryPath}/main-src-originals/`);

		// do lineheight stuff




		console.log(`mkdir -p ${fileOrDirectoryPath}/main && mv ${fileOrDirectoryPath}/main-svgo-processed/* ${fileOrDirectoryPath}/main/`);
		execSync(`mkdir -p ${fileOrDirectoryPath}/main && mv ${fileOrDirectoryPath}/main-svgo-processed/* ${fileOrDirectoryPath}/main/`);

	});
}

module.exports = cleanSVGs;

console.log(`...end: \`config/clean-svgs.js\`
------------------------------------------------------------`);
console.groupEnd();




