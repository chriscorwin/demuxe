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
const im = require('imagemagick');
const Pageres = require('pageres');
var looksSame = require('looks-same');

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

		// Make sure the only file isn't the freaking DS_Store file
		if (fs.readdirSync(path.join(fileOrDirectoryPath, '/main-src/')).length === 1 && fs.existsSync(path.join(fileOrDirectoryPath, '/main-src/', '.DS_Store'))) return;

		console.log(`svgo --folder=${fileOrDirectoryPath}/main-src/ --output=${fileOrDirectoryPath}/main-svgo-processed/ --config=./config/svgo.config.json --pretty`);
		console.log('this could take a few minutes...')
		// SVGO needs customized to make sure all IDs begin with a letter. IDs may not begin with a number.
		// Therefore, if you npm update SVGO you have to add back in this modification:
		/*
			// Escapes a string for being used as ID
			var escapeIdentifierName = function(str) {
			    return 'a' + str.replace(/[\. ]/g, '_').replace(/\=/g, '').replace(/\@/g, '').replace(/\“/g, '').replace(/\”/g, '');
			};
		*/
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

			const correctLineSpacing = dom.window.document.querySelectorAll('text[line-spacing]');
			correctLineSpacing.forEach((correctThis) => {
				const fontSize = correctThis.getAttribute('font-size');
				const lineSpacing = correctThis.getAttribute('line-spacing');
				const difference = fontSize - lineSpacing;
				const distance = Math.ceil(Math.abs(difference));
				const adjust = (distance > 4 && difference >= 0) ? distance : 4;
				// I'm dealing with Line Height 20, Font Size 18, and it needs pulled up 4 pixels.
				// Thus -1 isn't cutting it. No idea why I had this -1 here originally.
				// ALSO: Making this adjust a negative ends up moving it down instead of up
				// (because the final step is to do t.getAttribute('y') - adjust, and if adjust is negative
				// it then becomes the equivalent of t.getAttribute('y') + adjust)
				// Go go gadget time machine to tell myself to document this!
				// TODO: invent time machine.
				const finalAdjust = (difference >= 0) ? adjust : (distance <= fontSize) ? -1 : -adjust;
				correctThis.querySelectorAll('tspan').forEach((t) => {
					t.setAttribute('y', t.getAttribute('y') - finalAdjust);
				});
			});

			fs.writeFileSync(path.join(fileOrDirectoryPath, 'main', subFileOrDirectory), dom.window.document.body.innerHTML, 'utf8');


			// Move the PNG out of /main into /png-compare
			console.log(`mkdir -p ${fileOrDirectoryPath}/png-compare && mv ${fileOrDirectoryPath}/main/${subFileOrDirectory.replace('.svg', '.png')} ${fileOrDirectoryPath}/png-compare/`);
			// TODO: make this mv instead of cp. It is copy now for debug purposes
			execSync(`mkdir -p ${fileOrDirectoryPath}/png-compare && cp ${fileOrDirectoryPath}/main/${subFileOrDirectory.replace('.svg', '.png')} ${fileOrDirectoryPath}/png-compare/`);

			// Resize PNG to make it 1280x720 so it matches SVG
			im.resize({
					srcPath: path.join(fileOrDirectoryPath, 'png-compare', subFileOrDirectory.replace('.svg', '.png')),
					dstPath: path.join(fileOrDirectoryPath, 'png-compare', subFileOrDirectory.replace('.svg', '.png')),
					width: 1280
				},
				function(err, stdout){
					console.log('error', err);

					console.log('resized PNG', stdout);

					(async (fileOrDirectoryPath, subFileOrDirectory) => {
						await new Pageres({delay: 2, filename: 'svg' + subFileOrDirectory.replace('.svg', '')})
							.src(path.join(fileOrDirectoryPath, 'main', subFileOrDirectory), ['1280x720'], {crop: false})
							.dest(path.join(fileOrDirectoryPath, 'png-compare'))
							.run();

						// Compare the png of the SVG with the exported PNG
						const svgPNG = path.join(fileOrDirectoryPath, 'png-compare', 'svg' + subFileOrDirectory.replace('.svg', '.png'));
						const exportedPNG = path.join(fileOrDirectoryPath, 'png-compare', subFileOrDirectory.replace('.svg', '.png'));

						looksSame(svgPNG, exportedPNG, function(error, {equal}) {
							console.log('error', error, 'equal', equal);

							const passFail = equal ? 'passed-svg' : 'failed-svg';

							execSync(`mkdir -p ${fileOrDirectoryPath}/${passFail}`);

							const diffResultPNG = path.join(fileOrDirectoryPath, passFail, subFileOrDirectory.replace('.svg', '.png'))

							looksSame.createDiff({
								reference: svgPNG,
								current: exportedPNG,
								diff: diffResultPNG,
								highlightColor: '#ff0000', // color to highlight the differences
								// strict: true, // strict comparsion
								ignoreAntialiasing: true, // ignore antialising by default
								ignoreCaret: false // ignore caret by default
							}, function(error) {
								console.error('error', error);

								// Create animated gif
								im.convert([path.join(fileOrDirectoryPath, 'png-compare', '*' + subFileOrDirectory.replace('.svg', '*')), '-resize', '1280x720', '-delay', '500', path.join(fileOrDirectoryPath, passFail, subFileOrDirectory.replace('.svg', '.gif'))],
									function(err, stdout){
										console.log('error', err);

										console.log('created gif', stdout);
										// output path to animated gif to terminal
										console.log('Animated gif of difference:', path.join(fileOrDirectoryPath, 'png-compare', subFileOrDirectory.replace('.svg', '.gif')));
									}
								);
							});
						});
					})(fileOrDirectoryPath, subFileOrDirectory);
				}
			);










		});
	});
}

module.exports = cleanSVGs;

console.log(`...end: \`config/clean-svgs.js\`
------------------------------------------------------------`);
console.groupEnd();




