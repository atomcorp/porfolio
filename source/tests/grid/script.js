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

// first.
// make the container the right pro

var dom = {
	grid: document.querySelector('.grid__container'),
	body: document.querySelector('html'),
	skills: document.querySelectorAll('.grid'),
};

var state = {
	ratio: [3, 4],
	breaker: 0,
	container: {}
};


// always portrait so get height and use that on width
function defineContainer() {
	var container = dom.grid;
	var width = container.offsetWidth;
	var height = container.offsetHeight;
	// just knock a 1/4 of the height from the height and apply to width
	dom.grid.style.width = height - ( height / 4 ) + 'px';
	gridObjects();
}

defineContainer();

function gridObjects() {
	// now we have the container divide it up into a 3 x 4 grid
	var container = dom.grid;
	var width = container.offsetWidth;
	var height = container.offsetHeight;
	var objWidth = width / state.ratio[0];
	var objHeight = height / state.ratio[1];
	var top = 0;
	var left = 0;
	var counter = 1;
	for (var skill of dom.skills) {
		skill.style.width = objWidth + 'px';
		skill.style.height = objHeight + 'px';
		skill.style.top = top + 'px';
		// cols
		if (counter % 3 === 1) {
			// 1st col
			console.log(counter, 'col 1');
		} else if (counter % 3 === 2) {
			console.log(counter, 'col 2');
			skill.style.left = objWidth + 'px';
		} else if (counter % 3 === 0) {
			console.log(counter, 'col 3');
			skill.style.left = (objWidth * 2) + 'px';
			top += objHeight;
		}

		// rows
		counter++;
			// 1, 4, 7, 10
			// 2, 5, 8, 11
			// 3, 6, 9, 12
			// 1  2  3 
			// 4  5  6
			// 7  8  9
			// 10 11 12
	}
}

// function createContainer() {
// 	// get current width
// 	var grid = dom.grid;
// 	// grid is max-width 900, height 100% of screen;
// 	state.width = grid.offsetWidth;
// 	state.height = grid.offsetHeight;
// 	console.log(state.width, state.height);
// 	state.breaker = 0;
// 	// get height and width and turn in to correct ratio
// 	if (state.width > state.height) {
// 		// we always want this, why would it be portait?
// 		// get width and work out optimal height
// 		var optimalHeight = state.width / state.ratio;
// 		testHeightFunction(optimalHeight);
// 	} else {

// 	}
// }

// function testHeightFunction(optimalHeight) {
// 	if (optimalHeight > state.height) {
// 		console.log(optimalHeight, 'greater');
// 		recursiveChecker();
// 	} else {
// 		console.log(optimalHeight, 'lower');
// 	}
// }

// function recursiveChecker() {
// 	state.breaker++;
// 	if (state.breaker > 100) {
// 		return;
// 	} else {
// 		state.width = state.width - 10;
// 		var testHeight = state.width / state.ratio;
// 		testHeightFunction(testHeight);
// 	}
	
// }