var skills = function() {

	var dom = {
		skill: document.querySelectorAll('.skill'),
		container: document.querySelector('.skills__container')
	};

	var state = {
		moveMargin: false,
		moveRadius: false,
		moveContainerRadius: false
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
	};

	function _setContainerRadius() {
		var containerRadius = _getRadius(20, 20);
		dom.container.style['border-radius'] = containerRadius.join(' ');
	};

	function runSkills() {
		_addClickListener();
		setContainerSize();
		_setMargin();
		state.moveMargin = setInterval (function() {
			_setMargin();
		}, 1000);
		state.moveRadius = setInterval (function() {
			_setRadius();
		}, 625);
		state.moveContainerRadius = setInterval (function() {
			_setContainerRadius();
		}, 945);
	};

	function cancelSkills() {
		clearInterval(state.moveMargin);
		clearInterval(state.moveRadius);
	};

	function setContainerSize() {
		// get whatevers more height or width
		// assign smaller number to the other
		// 240 is the 120 padding * 2

		// todo: something stopping this being over 900px wide, but still being square
		var width = (dom.container.offsetWidth - 240);
		var height = (dom.container.offsetHeight - 240);
		console.log(width, height)
		if (width > height) {
			dom.container.style.width = (height - (height / 4)) + 'px';
			dom.container.style.height = height + 'px';
		} else {
			dom.container.style.height = width + 'px';
			dom.container.style.width = (width - (width / 4)) + 'px';
		}
	};

	function _clickedSkill() {
		// turn off 
		// cancelSkills();
		this.classList.add("clicked");
	}

	function _addClickListener() {
		for (skill of dom.skill) {
			skill.addEventListener('click', _clickedSkill, false);
		}
	};

	return {
		runSkills: runSkills,
		cancelSkills: cancelSkills,
		setContainerSize: setContainerSize
	}
}

var newSkill = skills();
newSkill.runSkills();