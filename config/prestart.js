console.group(`
============================================================
Demuxe: Running \`config/prestart.js\` now...
------------------------------------------------------------
`);

const cleanSVGs = require('./clean-svgs.js');

const prestart = (configData) => {
	console.log('running prestart');
	cleanSVGs(configData);
}

module.exports = prestart;

console.log(`...end: \`config/prestart.js\`
------------------------------------------------------------`);
console.groupEnd();