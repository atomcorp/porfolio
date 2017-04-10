var skills = function() {

	var dom = {
		skill: document.querySelectorAll('.skill')
	};

	// what does this do?
	// randomly assign different margins to the skills boxes

	// margins must add up to 60 / 60

	function _getMargin() {
		var margin = [];
		// margins are the set css shorthand top/right/bottom/left
		margin.push(Math.floor((Math.random() * 60) + 1)); // top
		margin.push(Math.floor((Math.random() * 60) + 1)); // right
		margin.push(60 - margin[0]); // bottom
		margin.push(60 - margin[0]; // left
		return margin;
	}

	function _setMargin() {
		console.log(dom.skill);
		for (skill of dom.skill) {
			var margin = _getMargin();
			console.log(margin, skill);
			skill.style.margin = margin.join(' ');
		}
	}

	function runMargin() {
		_setMargin();
	}

	return {
		runMargin: runMargin
	}
}

var newSkill = skills();
newSkill.runMargin();