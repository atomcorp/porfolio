var skills = function() {

	var dom = {
		skill: document.querySelectorAll('.skill')
	};

	var state = {
		interval: false
	};

	// what does this do?
	// randomly assign different margins to the skills boxes

	function _getMargin() {
		var margin = [];
		// margins are the set css shorthand top/right/bottom/left
		// margins must add up to 60 / 60
		margin.push(Math.floor((Math.random() * 30) + 1)); // top
		margin.push(Math.floor((Math.random() * 30) + 1)); // right
		margin.push(30 - margin[0]); // bottom
		margin.push(30 - margin[1]); // left
		for (var i = 0; i < margin.length; i++) {
			margin[i] += 'px';
		}
		return margin;
	};

	function _getRadius() {
		var radius = [];
		radius.push(Math.floor((Math.random() * 50) + 51)); // top
		radius.push(Math.floor((Math.random() * 50) + 51)); // right
		radius.push(Math.floor((Math.random() * 50) + 51)); // bottom
		radius.push(Math.floor((Math.random() * 50) + 51)); // left
		for (var i = 0; i < radius.length; i++) {
			radius[i] += '%';
		}
		return radius;
	};

	function _setMargin() {
		for (skill of dom.skill) {
			var margin = _getMargin();
			var radius = _getRadius();
			skill.style.margin = margin.join(' ');
			skill.style['border-radius'] = radius.join(' ');
		}
	};

	function runMargin() {
		_setMargin();
		if (!state.interval) {
			state.interval = setInterval (function() {
				_setMargin();
			}, 1000);
		}
	};

	function cancelMargin() {
		clearInterval(state.interval);
	};

	return {
		runMargin: runMargin,
		cancelMargin: cancelMargin
	}
}

var newSkill = skills();
// newSkill.runMargin();