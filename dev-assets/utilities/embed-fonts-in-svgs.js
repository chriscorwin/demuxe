#! /usr/bin/env node --harmony

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const svgFontEmbedder = require('svg-font-embedder');

const directoryToConvert = path.resolve(process.cwd(), argv._[0] || './demo-overrides');

const svgFiles = svgFontEmbedder(directoryToConvert);

Object.keys(svgFiles).forEach((svgFilePath) => {
	fs.writeFileSync(svgFilePath.replace(/\.svg$/, '.embedded.svg'), svgFiles[svgFilePath].embedded);
});
