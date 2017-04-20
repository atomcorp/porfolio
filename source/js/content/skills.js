const skills = function() {
	let dom = {
		skill: document.querySelectorAll('.skill'),
		container: document.querySelector('.skills__border')
	};

	let state = {
		moveMargin: false,
		moveRadius: false,
		moveContainerRadius: false,
		moveClicked: false,
		ratio: [3, 4],
		clicked: {}
	};

	// what does this do?
	// randomly assign different margins to the skills boxes

	function _getPosition() {
		const position = [];
		// position is set for translates 2d vertical/horizontal
		position.push(Math.floor((Math.random() * 30) - 16)); // top
		position.push(Math.floor((Math.random() * 30) - 16)); // right
		const property = position.map(function(position) {
			return position + 'px';
		});

		return property;
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

	function _setPosition() {
		// go through each of the skills and reset the position
		for (const skill of dom.skill) {
			const position = _getPosition();
			skill.style.transform = `translate(${position.join(',')})`;
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
		_setPosition();
		_setContainerRadius();
		// _runSkillsAnimations();
		gridObjects();
		state.moveContainerRadius = setInterval (function() {
			// _setContainerRadius();
		}, 945);
	}

	function _runSkillsAnimations() {
		_setPosition();
		_setRadius();
		state.moveMargin = setInterval (function() {
			_setPosition();
		}, 1000);
		state.moveRadius = setInterval (function() {
			_setRadius();
		}, 625);
	}

	function cancelSkills() {
		clearInterval(state.moveMargin);
		clearInterval(state.moveRadius);
	}

	// always portrait so get height and use that on width
	function setContainerSize() {
		const container = dom.container;
		const width = container.offsetWidth;
		const height = container.offsetHeight;
		// just knock a 1/4 of the height from the height and apply to width
		dom.container.style.width = height - ( height / 4 ) + 'px';
		dom.container.style.height = height + 'px';
	}

	function gridObjects() {
		const gutter = 30;
		// now we have the container divide it up into a 3 x 4 grid
		const container = dom.container;
		const width = container.offsetWidth - gutter;
		const height = container.offsetHeight - gutter;
		const objWidth = (width / state.ratio[0]) - (gutter * 2);
		const objHeight = (height / state.ratio[1]) - (gutter * 2);
		let top = gutter;
		let counter = 1;
		for (const skill of dom.skill) {
			skill.style.width = objWidth + 'px';
			skill.style.height = objHeight + 'px';
			skill.style.top = top + 'px';
			// cols
			if (counter % 3 === 1) {
				// 1st col
				skill.style.left = gutter + 'px';
			} else if (counter % 3 === 2) {
				skill.style.left = (objWidth + (gutter * 3)) + 'px';
			} else if (counter % 3 === 0) {
				skill.style.left = ((objWidth * 2) + (gutter * 5)) + 'px';
				top += (objHeight + (gutter * 2));
			}
			counter++;
		}
	}

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

	function _clickedSkill() {
		/* jshint validthis: true */
		// http://stackoverflow.com/questions/16553264/why-is-jshint-throwing-a-possible-strict-violation-on-this-line/16553290#16553290
		const skill = this;
		state.clicked = {
			top: skill.style.top,
			left: skill.style.left,
			width: skill.style.width,
			height: skill.style.height
		};
		// turn off 
		cancelSkills();
		skill.style = '';
		skill.classList.add('clicked');
		skill.style['z-index'] = 9;
		// just get it to move around while in this state
		let position = _getPosition();
		skill.style.transform = position.join(' ');
		state.moveClicked = setInterval (function() {
			let position = _getPosition();
			skill.style.transform = position.join(' ');
		}, 1000);		
		// remove this, otherwise we'll just reuse this function when we click again
		skill.removeEventListener('click', _clickedSkill, false);
		skill.addEventListener('click', _removeClickedSkill, false);
	}

	function _removeClickedSkill() {
		/* jshint validthis: true */
		const skill = this;
		// have to remove this click listener otherwise it will be called instantly if clicked again
		skill.removeEventListener('click', _removeClickedSkill, false);
		// re-add previous el
		skill.addEventListener('click', _clickedSkill, false);
		_runSkillsAnimations();
		skill.classList.remove('clicked');
		setTimeout(function() {
			skill.style['z-index'] = '';
		}, 1000);
		skill.style.top = state.clicked.top;
		skill.style.left = state.clicked.left;
		skill.style.height = state.clicked.height;
		skill.style.width = state.clicked.width;
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