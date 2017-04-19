const skills = function() {
	let dom = {
		skill: document.querySelectorAll('.skill'),
		container: document.querySelector('.skills__container')
	};
	
	let state = {
		moveMargin: false,
		moveRadius: false,
		moveContainerRadius: false,
		moveClicked: false
	};

	// what does this do?
	// randomly assign different margins to the skills boxes

	function _getMargin() {
		const margin = [];
		// margins are the set css shorthand top/right/bottom/left
		// margins must add up to 60 / 60
		margin.push(Math.floor((Math.random() * 30) + 1)); // top
		margin.push(Math.floor((Math.random() * 30) + 1)); // right
		margin.push(30 - margin[0]); // bottom
		margin.push(30 - margin[1]); // left
		const pixeledMargin = margin.map(function(position) {
			return position + 'px';
		});

		return pixeledMargin;
	}

	function _getRadius(range, min) {
		// threshold = range, min
		// range = how many points it can deviate
		// min = what point it starts at (plus the range)
		// eg (10, 10) is between 10%-20%; (50, 50) is between 50%-100%
		const radius = [];
		radius.push(Math.floor((Math.random() * range) + min)); // top
		radius.push(Math.floor((Math.random() * range) + min)); // right
		radius.push(Math.floor((Math.random() * range) + min)); // bottom
		radius.push(Math.floor((Math.random() * range) + min)); // left
		const pointsRadius = radius.map(function(position) {
			return position + '%';
		});
		return pointsRadius;
	}

	function _setMargin() {
		for (const skill of dom.skill) {
			const margin = _getMargin();
			skill.style.margin = margin.join(' ');
		}
	}

	function _setRadius() {
		for (const skill of dom.skill) {
			const radius = _getRadius(50, 51);
			skill.style['border-radius'] = radius.join(' ');
		}
	}

	function _setContainerRadius() {
		const containerRadius = _getRadius(20, 20);
		dom.container.style['border-radius'] = containerRadius.join(' ');
	}

	function init() {
		_addClickListener();
		setContainerSize();
		_setMargin();
		_runSkillsAnimations();
		state.moveContainerRadius = setInterval (function() {
			_setContainerRadius();
		}, 945);
	}

	function _runSkillsAnimations() {
		_setMargin();
		_setRadius();
		state.moveMargin = setInterval (function() {
			_setMargin();
		}, 1000);
		state.moveRadius = setInterval (function() {
			_setRadius();
		}, 625);
	}

	function cancelSkills() {
		clearInterval(state.moveMargin);
		clearInterval();
	}


	function _removeClickedSkill() {
		/* jshint validthis: true */
		// have to remove this click listener otherwise it will be called instantly if clicked again
		this.removeEventListener('click', _removeClickedSkill, false);
		_runSkillsAnimations();
		this.classList.remove('clicked');
		clearInterval(state.moveRadius);
	}

	function setContainerSize() {
		// get whatevers more height or width
		// assign smaller number to the other
		// 240 is the 120 padding * 2

		// todo: something stopping this being over 900px wide, but still being square
		const width = (dom.container.offsetWidth - 240);
		const height = (dom.container.offsetHeight - 240);
		if (width > height) {
			dom.container.style.width = (height - (height / 4)) + 'px';
			dom.container.style.height = height + 'px';
		} else {
			dom.container.style.height = width + 'px';
			dom.container.style.width = (width - (width / 4)) + 'px';
		}
	}

	 /**
     * Solve for the 4th value
     * @param Number width       Numerator from the right side of the equation
     * @param Number height      Denominator from the right side of the equation
     * @param Number numerator   Numerator from the left side of the equation
     * @param Number denominator Denominator from the left side of the equation
     * @return Number
     */
    function solve(width, height, numerator, denominator) {
        // solve for width
        if (undefined !== width) {
            return round() ? Math.round(width / (numerator / denominator)) : width / (numerator / denominator);
        }
        // solve for height
        else if (undefined !== height) {
            return round() ? Math.round(height * (numerator / denominator)) : height * (numerator / denominator);
        }
        else {
	        return undefined;
        }
    }

	/**
	 * Positioning elements
	 * 
	 * 1st. define the container
	 * must be proportional rectangle
	 * must work when resizing container
	 * max-width is 900
	 * max-height is height of screen (minus som padding)
	 * so get height of screen (minus padding) 
	 * 
	 * 2nd. work out optimal grid
	 * mine should be 3x4 (w*h, Numerator*Denominator)
	 * ratio is (original height / original width) x new width = new height
	 * for eg if screen is 804 height / 730 width
	 * 730 / (3 / 4) = 973.3333333333334 (get the width)
	 * 803 * (3 / 4) = 602.25 (get the height)
	 * then, if result is more than width make reduce height by 10 (or so) and try again 
	 */

	function _clickedSkill() {
		/* jshint validthis: true */
		let skill = this;
		// turn off 
		cancelSkills();
		// http://stackoverflow.com/questions/16553264/why-is-jshint-throwing-a-possible-strict-violation-on-this-line/16553290#16553290
		skill.classList.add('clicked');
		let margin = _getMargin();
		skill.style.margin = margin.join(' ');
		state.moveClicked = setInterval (function() {
			let margin = _getMargin();
			skill.style.margin = margin.join(' ');
		}, 1000);		
		skill.addEventListener('click', _removeClickedSkill, false);
	}

	function _addClickListener() {
		for (const skill of dom.skill) {
			skill.addEventListener('click', _clickedSkill, false);
		}
	}

	return {
		init: init,
		cancelSkills: cancelSkills,
		setContainerSize: setContainerSize
	};
};

var newSkill = skills();
newSkill.init();