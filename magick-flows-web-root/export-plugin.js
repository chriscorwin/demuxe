const dom = require('sketch/dom');
const ui = require('sketch/ui');


function parse(string, settings_assets) {
	string.split('\n').forEach((line) => {
		let pos = line.indexOf('=');
		if (pos >= 0) {
			settings_assets[line.substr(0, pos)] = line.substr(pos + 1)
		}
	})
}

function readAssets(context) {
	let settings_assets = {};
	context.document.pages().forEach((page) => {
		if (page.name().toLowerCase() === 'magick-flows-export') {
			page.artboards().forEach((artboard) => {
				artboard.layers().forEach((layer) => {
					if (layer.name().toLowerCase() === "settings-assets") {
						parse(layer.attributedString().string(), settings_assets)
					}
				})
			})
		}
	});
	return settings_assets
}

function readMain(context) {
	let settings_main = {};
	context.document.pages().forEach((page) => {
		if (page.name().toLowerCase() === 'magick-flows-export') {
			page.artboards().forEach((artboard) => {
				artboard.layers().forEach((layer) => {
					if (layer.name().toLowerCase() === "settings-main") {
						parse(layer.attributedString().string(), settings_main)
					}
				})
			})
		}
	});
	return settings_main
}


function getArtboards(layers) {
	// console.log(`layers: `, layers);
	let layersToReturn = [];
	let layersToDigThrough = layers || [];
	layers.forEach((layer) => {
		if (layer.type === 'Page') {
			if (layer.layers) {
				layer.layers.forEach((layer2) => {
					layersToDigThrough.push(layer2);
				})
			}
		} else if ( layer.type === 'Artboard') {
			layersToReturn.push(layer)
		}
	});
	layersToDigThrough.forEach((layer) => {
		if (layer.type === 'Page') {
			if (layer.layers) {
				layer.layers.forEach((layer2) => {
					layersToDigThrough.push(layer2);
				})
			}
		} else if ( layer.type === 'Artboard') {
			layersToReturn.push(layer)
		}
	})
	return layersToReturn;
}


function selectedOrAllArtboardsAssets(doc) {
	const layers = doc.getLayersNamed('assets')
	let artboards = getArtboards(layers);

	return artboards

}
function selectedOrAllArtboardsMain(doc) {
	const layers = doc.getLayersNamed('main')
	let artboards = getArtboards(layers);

	return artboards

}



function makeExportName(artboard, format) {
	return [].concat(
		format.prefix ? format.prefix : [],
		artboard.name,
		format.suffix ? format.suffix : [],
		'.',
		format.fileFormat,
	).join('')
}

function absPath(path) {
	return NSString.stringWithString(path).stringByExpandingTildeInPath()
}

function combinePath(a, b) {
	return NSString.stringWithString(a).stringByAppendingPathComponent(b)
}


function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


function onSilentExportAssets(context) {
	let settings_assets = readAssets(context);
	if (!settings_assets.silent_path_assets) {
		console.log('silent_path_assets settings not found');
		return
	} else {
		console.log(`settings_assets.silent_path_assets: `, settings_assets.silent_path_assets);
	}
	const doc = dom.getSelectedDocument();
	const artboards = selectedOrAllArtboardsAssets(doc);
	const fm = NSFileManager.defaultManager();
	const outputPath = absPath(settings_assets.silent_path_assets);
	const tempPath = combinePath(outputPath, '/~~~');
	artboards.forEach((artboard) => {
		artboard.exportFormats.forEach((format) => {
			try {
				dom.export(artboard, {
					output: tempPath,
					formats: format.fileFormat,
					scales: format.size,
					overwriting: true,
				});
				const errorPtr = MOPointer.alloc().init();
				const files = fm.contentsOfDirectoryAtPath_error_(tempPath, errorPtr);
				if (files && files.count()) {
					const tempFilePath = combinePath(tempPath, files.firstObject());

					// assets
					let outputFilePath = combinePath(outputPath, makeExportName(artboard, format));
					if (endsWith(outputFilePath, 'null.png')) {
						outputFilePath = outputFilePath.replace('null.png', '.png');
					}
					if (outputFilePath.startsWith('null')) {
						outputFilePath = outputFilePath.replace('null', '');
					}
					outputFilePath = outputFilePath.replace('null', '');

					fm.removeItemAtPath_error_(outputFilePath, null);
					fm.moveItemAtPath_toPath_error_(tempFilePath, outputFilePath, null)
				}
			} catch (error) {
				console.log(`error: `, error);
			}
		});
		fm.removeItemAtPath_error_(tempPath, null)
	});
	if (artboards.length < 10) {
		console.log(artboards.map((x) => x.name).join(', ') + ' exported')
	} else {
		console.log(`${artboards.length} artboards exported`)
	}
}
function onSilentExportMain(context) {
	let settings_main = readMain(context);
	if (!settings_main.silent_path_main) {
		console.log('silent_path_main settings not found');
		return
	} else {
		console.log(`settings_main.silent_path_main: `, settings_main.silent_path_main);
	}
	const doc = dom.getSelectedDocument();
	const artboards = selectedOrAllArtboardsMain(doc);
	const fm = NSFileManager.defaultManager();
	const outputPath = absPath(settings_main.silent_path_main);
	const tempPath = combinePath(outputPath, '/~~~');
	const outputPathSVG = absPath(settings_main.silent_path_main) + '-src';
	const tempPathSVG = combinePath(outputPathSVG, '/~~~');
	artboards.forEach((artboard) => {
		artboard.exportFormats.forEach((format) => {
			console.log(format.fileFormat)
			const specificTempPath = format.fileFormat === 'svg' ? tempPathSVG : tempPath;
			const specificOutputPath = format.fileFormat === 'svg' ? outputPathSVG : outputPath;
			try {
				dom.export(artboard, {
					output: specificTempPath,
					formats: format.fileFormat,
					scales: format.size,
					overwriting: true,
				});
				const errorPtr = MOPointer.alloc().init();
				const files = fm.contentsOfDirectoryAtPath_error_(specificTempPath, errorPtr);
				if (files && files.count()) {
					const tempFilePath = combinePath(specificTempPath, files.firstObject());

					// main
					let outputFilePath = combinePath(specificOutputPath, makeExportName(artboard, format));
					if (endsWith(outputFilePath, 'null.png')) {
						outputFilePath = outputFilePath.replace('null.png', '.png');
					}
					if (outputFilePath.startsWith('null')) {
						outputFilePath = outputFilePath.replace('null', '');
					}
					outputFilePath = outputFilePath.replace('null', '');

					fm.removeItemAtPath_error_(outputFilePath, null);
					fm.moveItemAtPath_toPath_error_(tempFilePath, outputFilePath, null)
				}
			} catch (error) {
				console.log(`error: `, error);
			}
		});
		fm.removeItemAtPath_error_(tempPath, null)
		fm.removeItemAtPath_error_(tempPathSVG, null)
	});
	if (artboards.length < 10) {
		console.log(artboards.map((x) => x.name).join(', ') + ' exported')
	} else {
		console.log(`${artboards.length} artboards exported`)
	}
}


function onSilentExport(context) {
	onSilentExportAssets(context);
	onSilentExportMain(context);
}

onSilentExport(context)
