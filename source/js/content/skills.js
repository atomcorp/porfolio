var skills = function() {

	var dom = {
		skill: document.querySelectorAll('.skill'),
		container: document.querySelector('.skills__container')
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
		margin.push(Math.floor((Math.random() * 15) + 1)); // top
		margin.push(Math.floor((Math.random() * 15) + 1)); // right
		margin.push(15 - margin[0]); // bottom
		margin.push(15 - margin[1]); // left
		for (var i = 0; i < margin.length; i++) {
			margin[i] += 'px';
		}
		return margin;
	};

	function _getRadius(range, min) {
		// threshold = range, min
		// range = how many points it can deviate
		// min = what point it starts at (plus the range)
		// eg (10, 10) is between 10%-20%; (50, 50) is between 50%-100%
		var radius = [];
		radius.push(Math.floor((Math.random() * range) + min)); // top
		radius.push(Math.floor((Math.random() * range) + min)); // right
		radius.push(Math.floor((Math.random() * range) + min)); // bottom
		radius.push(Math.floor((Math.random() * range) + min)); // left
		for (var i = 0; i < radius.length; i++) {
			radius[i] += '%';
		}
		return radius;
	};

	function _setMargin() {
		for (skill of dom.skill) {
			var margin = _getMargin();
			skill.style.margin = margin.join(' ');
		}
	};

	function _setRadius() {
		for (skill of dom.skill) {
			var radius = _getRadius(50, 51);
			skill.style['border-radius'] = radius.join(' ');
		}
		var containerRadius = _getRadius(20, 20);
		dom.container.style['border-radius'] = containerRadius.join(' ');
	};

	function runSkills() {
		setContainer();
		_setMargin();
		if (!state.interval) {
			state.interval = setInterval (function() {
				_setMargin();
			}, 1000);
			setInterval (function() {
				_setRadius();
			}, 1000);
		}
	};

	function cancelMargin() {
		clearInterval(state.interval);
	};

	function setContainer() {
		// get whatevers more height or width
		// assign smaller number to the other
		var width = dom.container.offsetWidth;
		var height = dom.container.offsetHeight;
		if (width > height) {
			dom.container.style.width = height + 'px';
			dom.container.style.height = height + 'px';
		} else {
			dom.container.style.height = width + 'px';
			dom.container.style.width = width + 'px';
		}
	}

	return {
		runSkills: runSkills,
		cancelMargin: cancelMargin,
		setContainer: setContainer
	}
}

var newSkill = skills();
newSkill.runSkills();