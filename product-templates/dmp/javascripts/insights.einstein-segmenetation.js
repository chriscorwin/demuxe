var active = graph.nodes[0];
var d3 = d3;

var svg = d3.select('#canvas');
const canvas = document.getElementById('canvas');
var width = window
	.getComputedStyle(canvas)
	.getPropertyValue('width')
	.replace('px', '');
var height = window
	.getComputedStyle(canvas)
	.getPropertyValue('height')
	.replace('px', '');

var charge = d3.forceManyBody();
charge.strength(-5000);

const partyNumbers = ['','1st', '2nd', '3rd'];
const partyColors = ['', 'purple', 'blue', 'green'];
var buildAttribute = function buildAttribute(html, attr) {
	var stats = attr.stats ? `<div class="stats">${attr.stats}</div>` : '';

	var className = attr.cmp ? ' dolla' : '';
	className += ' slds-size--1-of-2';

	var attribute = `
		<li class="${partyColors[attr.party]}${className}">${attr.main}
			${stats}
		</li>
	`;

	return html + attribute;
};


var fillForm = function fillForm(d) {
	var devicesFormatted = d.devices
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	var attributes = d.attributes.reduce(buildAttribute, '');

	var hasCPM = d.attributes.find(function findCPM(attr) {
		return attr.cpm;
	});

	var cpmContent = '';


	if (hasCPM) {
		cpmContent += `
			<div id="cpm" class="slds-col slds-p-horizontal_medium">
				<div class="slds-media">
					<div class="slds-media__figure">
						<span class="slds-avatar">
							<img class="bull" src="/images/icons/cpm.svg" />
						</span>
					</div>
					<div class="slds-media__body">
						<div class="contents">$${d.cpm}</div>
						<div class="sub">CPM</div>
					</div>
				</div>
			</div>
		`;
	}
	var formContents = `
		<div class="slds-grid slds-grid_vertical slds-p-bottom_medium">
			<div>
				<span id="rank" class="slds-badge">Rank ${d.rank}</span>
			</div>
			<div class="slds-m-top_medium">
				<input onClick="this.setSelectionRange(0, this.value.length)"  id="personaName" value="${d.value}"/>
				<!-- svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="editIcon"><path d="M4.4 15.4l4.1 4.1c.2.2.5.2.6 0L19.4 9.2c.2-.2.2-.4 0-.6l-4.1-4.1c-.2-.2-.4-.2-.6 0L4.4 14.8c-.2.2-.2.5 0 .6zM16.7 2.6c-.2.2-.2.5 0 .7l4 4c.2.2.5.2.7 0l1.1-1.1c.8-.7.8-1.8 0-2.6l-2.1-2.1c-.8-.8-1.9-.8-2.7 0l-1 1.1zM1 22.2c-.1.5.3.9.8.8l5-1.2c.2 0 .3-.1.4-.2l.1-.1c.1-.1.1-.4-.1-.6l-4.1-4.1c-.2-.2-.5-.2-.6-.1l-.1.1c-.1.1-.2.3-.2.4l-1.2 5z"/></svg -->
			</div>
			<div class="slds-grid slds-grid_pull-padded-medium slds-m-top_medium">
				<div id="devices" class="slds-col slds-p-horizontal_medium">
					<div class="slds-media">
						<div class="slds-media__figure">
							<span class="slds-avatar">
								<img class="bull" src="/images/icons/devices.svg" />
							</span>
						</div>
						<div class="slds-media__body">
							<div class="contents">${devicesFormatted}</div>
							<div class="sub">Devices</div>
						</div>
					</div>
				</div>
				${cpmContent}
			</div>
		</div>
	`;

	// get unique parties.
	// Filter each of the attributes, searching the attributes array to find the index of the
	// very first instance of an attribute with the party matching focusAttribute's party to see if
	// focusAttribute is the first attribute with that party. If so, it gets added to the filtered
	// parties array, otherwise it is ignored. Reduce the results further to extract just the party number
	// and then sort the final array so that it displays in an intelligent order
	const usedParties = d.attributes.filter((focusAttribute, i, attributes) => attributes.indexOf(
			attributes.find((potentialMatch) => focusAttribute.party === potentialMatch.party)
	) === i).reduce((partyNumbers, party) => [ ...partyNumbers, party.party ], []).sort();

	formContents += `
		<div id="formBody" class="slds-p-horizontal_medium slds-p-bottom_small slds-p-top_xx-small">
			<p id="formBodyHead" class="slds-m-vertical_small">Attributes that define this persona</p>
			<ul class="slds-list_horizontal slds-grid slds-wrap slds-m-vertical_small">
				${attributes}
			</ul>
			<div id="key" class="slds-p-around_medium">
				<ul class="slds-list_horizontal slds-align_absolute-center">
					${usedParties.map((party) => `<li class="${partyColors[party]}">${partyNumbers[party]} Party</li>`)}
				</ul>
			</div>
			<div id="actions">
				${actionButtons}
			</div>
		</div>
	`;

	document.getElementById('form').innerHTML = formContents;

	document.getElementById('personaName').onchange = function(event) {
		active.value = this.value;
		d.value = this.value;
		document.getElementById(d.id + 'label').innerHTML = getNodeText(d);
		document.getElementById('all-personas').src = '/images/slices/insights.einstein-segmentation.bottom.updated.svg';
	};

	document.getElementById('personaName').onfocus = function(event) {
		document.getElementById('editIcon').style.fill = '#0070D2';
	};

	document.getElementById('personaName').onblur = function(event) {
		document.getElementById('editIcon').style.fill = '#54698d';
	};
};

var getNodeText = function getNodeText(d) {
	return (
		'<div class="nodeLabelText">' +
		d.value +
		'</div><div class="nodeLabelBackground">' +
		d.value +
		'</div>'
	);
};
var getNodeId = function getNodeId(d) {
	return d.id;
};
var getNodeFillColor = function getNodeFillColor(d) {
	if (active === d) {
		return '#1674D9';
	}

	// if (d.isHovered) {
	// 	return '#1674D9';
	// }

	return '#C4C9D3';
};

var getNodeOpacity = function getNodeOpacity(d) {
	if (active === d) {
		if (d.isHovered) {
			return '0.7';
		}
		return '1';
	}

	if (d.isHovered) {
		return '0.7';
	}

	return '1';
};
var getTooltip = function getTooltip(d) {
	var devices = Math.round(d.devices / 1000);
	var html = [
		'<div class="title">',
		d.value,
		'</div>',
		'<div class="body"><span class="muted">Devices:</span> ',
		devices,
		'k</div>',
		'<div class="footer"><em>Click to view attributes</em></div>'
	].join('');

	return html;
};

var getLineTooltip = function getLineTooltip(d) {
	var html = [
		'<div class="title">Overlap</div>',
		'<div class="body">',
		d.overlap,
		'K</div>'
	].join('');

	return html;
};

// make the little circles below the form to switch the forms
var makeDots = function makeDots(data) {
	$dots = document.querySelector('#dots');
	$dots.style.width = data.length * 24 + 'px';

	for (var i = 0; i < data.length; i++) {
		var id = data[i].id;
		$dots.insertAdjacentHTML(
			'beforeend',
			`<div class="dot" id="${id}Dot"></div>`
		);

		var $dot = document.querySelector(`#${id}Dot`);
		$dot.dataset.id = id;
		$dot.addEventListener('click', function(evt) {
			var id = this.dataset.id;

			var node = graph.nodes.find(function findNode(node) {
				return node.id === id;
			});
			selectNode(node);
		});
	}
};
makeDots(graph.nodes);

var findPrevious = function findPrevious() {
	var current = 0;
	graph.nodes.find(function findNode(node, i, nodes) {
		current = i;
		return node.id === active.id;
	});

	return current - 1;
};

var findNext = function findNext() {
	var current = 0;
	graph.nodes.find(function findNode(node, i, nodes) {
		current = i;
		return node.id === active.id;
	});

	return current + 1;
};

document.querySelector('#formLeft').addEventListener('click', function(evt) {
	var previous = findPrevious();

	if (previous >= 0) {
		selectNode(graph.nodes[previous]);
	}
});

document.querySelector('#formRight').addEventListener('click', function(evt) {
	var next = findNext();

	if (next < graph.nodes.length) {
		selectNode(graph.nodes[next]);
	}
});

var setActiveDot = function setActiveDot(id) {
	var $dots = document.querySelectorAll('.dot');

	$dots.forEach(function($dot) {
		$dot.classList.remove('active');
	});

	document.querySelector('#' + id + 'Dot').classList.add('active');
};

var selectNode = function selectNode(node) {
	setActiveDot(node.id);
	fillForm(node);
	active = node;
	ticked();

	if (findPrevious() < 0) {
		document.querySelector('#formLeft img').src =
			'/images/icons/chevronleft-disable.svg';
		document.querySelector('#formLeft').classList.add('disable');
	} else {
		document.querySelector('#formLeft img').src =
			'/images/icons/chevronleft.svg';
		document.querySelector('#formLeft').classList.remove('disable');
	}

	if (findNext() >= graph.nodes.length) {
		document.querySelector('#formRight img').src =
			'/images/icons/chevronright-disable.svg';
		document.querySelector('#formRight').classList.add('disable');
	} else {
		document.querySelector('#formRight img').src =
			'/images/icons/chevronright.svg';
		document.querySelector('#formRight').classList.remove('disable');
	}
};



var simulation = d3
	.forceSimulation()
	.force('link', d3.forceLink().id(getNodeId))
	.force('charge', charge)
	.force('r', forceRadial(100))
	.force('center', d3.forceCenter(width / 2, height / 2));

var tip = d3.tip().attr('class', 'd3-tip').html(getTooltip);

var lineTip = d3.tip().attr('class', 'd3-tip').html(getLineTooltip);

lineTip.offset(function(d, g) {
	var source = d.source;
	var target = d.target;
	var top = Math.abs(source.y - target.y) * 0.5;
	// var left = Math.abs(source.x - target.x) * 0.5;
	return [top - 10, 0];
});

var link = svg
	.append('g')
	.attr('class', 'links')
	.selectAll('line')
	.data(graph.links)
	.enter()
	.append('line')
	.attr('stroke-width', function getLinkStrength(d) {
		return d.overlap / 3;
	})
	// .on('mouseover', function(d) {
	// 	d.isHovered = true;
	// 	lineTip.show(d);
	// })
	// .on('mouseout', function(d) {
	// 	d.isHovered = false;
	// 	lineTip.hide(d);
	// });

var node = svg
	.append('g')
	.attr('class', 'nodes')
	.selectAll('circle')
	.data(graph.nodes)
	.enter()
	.append('circle')
	.attr('r', function getNodeRadius(d) {
		return d.r;
	})
	.attr('id', function getNodeId(d) {
		return d.id + 'Node';
	})
	.call(
		d3
			.drag()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended)
	)
	// .on('mouseover', function(d) {
	// 	d.isHovered = true;
	// 	d3.select('#' + d.id + 'label').style('opacity', '0');
	// 	tip.show(d);
	// 	d3
	// 		.select(this)
	// 		.attr('fill', getNodeFillColor(d))
	// 		.attr('opacity', getNodeOpacity(d));
	// })
	// .on('mouseout', function(d) {
	// 	d.isHovered = false;
	// 	d3.select('#' + d.id + 'label').style('opacity', '1');
	// 	tip.hide(d);
	// 	d3
	// 		.select(this)
	// 		.attr('fill', getNodeFillColor(d))
	// 		.attr('opacity', getNodeOpacity(d));
	// });

var titleBox = d3
	.select('#topPersonas')
	.append('div')
	.attr('class', 'titleBox')
	.selectAll('squares')
	.data(graph.nodes)
	.enter()
	.append('div')
	.attr('id', function(d) {
		return d.id + 'label';
	})
	.html(getNodeText)
;

// var title = svg.append('g')
// 				.attr('class', 'title')
// 				.selectAll('text')
// 				.data(graph.nodes)
// 				.enter().append('text')
// 					.attr('id', function(d) { return d.id + 'labelText'; })
// 					.text(getNodeText);

// node.append('title')
// 		.text(function (d) { return d.value; });

simulation.nodes(graph.nodes).on('tick', ticked);

simulation.force('link').links(graph.links);

svg.call(tip);
svg.call(lineTip);

var getNodeX = function getNodeX(d) {
	return d.x;
};

var getNodeY = function getNodeY(d) {
	return d.y;
};

function ticked() {
	link
		.attr('x1', function(d) {
			return d.source.x;
		})
		.attr('y1', function(d) {
			return d.source.y;
		})
		.attr('x2', function(d) {
			return d.target.x;
		})
		.attr('y2', function(d) {
			return d.target.y;
		});

	node
		.attr('cx', getNodeX)
		.attr('cy', getNodeY)
		.attr('fill', getNodeFillColor)
		.attr('opacity', getNodeOpacity);

	// relative
	var addToY = -420;
	var addToX = -40;

	titleBox
		.attr('style', function(d) {

			var newY = ((d.y + addToY) + ((d.y / 5) * -1));

			if (d.id === 'p1') {
				newY += 20;
			}

			if (d.id === 'p2') {
				newY += 50;
			}

			if (d.id === 'p3') {
				newY -= 20;
			}

			if (d.id === 'p4') {
				newY += 5;
			}

			if (d.id === 'p5') {
				newY -= 15;
			}

			var styles =
				'top: ' + newY + 'px; left: ' + (d.x + addToX) + 'px;';
			if (d.isHovered === true) {
				styles += 'display: none;';
			}
			return styles;
		})
		.html(getNodeText);
}

function dragstarted(d) {
	selectNode(d);

	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
	tip.hide(d);
}

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended(d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;

	// Calling tip.show(d) causes the tooltip to show without the arrow for some reason
	// tip.show(d);
}

// https://bl.ocks.org/mbostock/cd98bf52e9067e26945edd95e8cf6ef9
function forceRadial(radius, x, y) {
	var nodes;
	var strength = constant(0.1);
	var strengths;
	var radiuses;

	if (typeof radius !== 'function') radius = constant(+radius);
	if (x == null) x = 0;
	if (y == null) y = 0;

	function force(alpha) {
		for (var i = 0, n = nodes.length; i < n; ++i) {
			var node = nodes[i],
				dx = node.x - x || 1e-6,
				dy = node.y - y || 1e-6,
				r = Math.sqrt(dx * dx + dy * dy),
				k = (radiuses[i] - r) * strengths[i] * alpha / r;
			node.vx += dx * k;
			node.vy += dy * k;
		}
	}

	function initialize() {
		if (!nodes) return;
		var i,
			n = nodes.length;
		strengths = new Array(n);
		radiuses = new Array(n);
		for (i = 0; i < n; ++i) {
			radiuses[i] = +radius(nodes[i], i, nodes);
			strengths[i] = isNaN(radiuses[i])
				? 0
				: +strength(nodes[i], i, nodes);
		}
	}

	force.initialize = function(_) {
		(nodes = _), initialize();
	};

	force.strength = function(_) {
		return arguments.length
			? (
					(strength = typeof _ === 'function' ? _ : constant(+_)),
					initialize(),
					force
				)
			: strength;
	};

	force.radius = function(_) {
		return arguments.length
			? (
					(radius = typeof _ === 'function' ? _ : constant(+_)),
					initialize(),
					force
				)
			: radius;
	};

	force.x = function(_) {
		return arguments.length ? ((x = +_), force) : x;
	};

	force.y = function(_) {
		return arguments.length ? ((y = +_), force) : y;
	};

	return force;
}

function constant(x) {
	return function() {
		return x;
	};
}

selectNode(graph.nodes[0]);
