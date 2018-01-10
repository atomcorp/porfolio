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
    } else if (counter % 3 === 2) {
      skill.style.left = objWidth + 'px';
    } else if (counter % 3 === 0) {
      skill.style.left = (objWidth * 2) + 'px';
      top += objHeight;
    }
    counter++;
  }
}
  
// }