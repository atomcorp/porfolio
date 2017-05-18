const projects = function() {

  const dom = {
    images: document.querySelectorAll('.project__images'),
    projects: document.querySelectorAll('.project'),
    underline: document.querySelector('.project__underline')
  };

  let state = {
    activeProjectId: 1,
    isAnimating: false,
    animationDuration: 1000
  };

  function init() {
    _addEls();
    _setImageDimensions();
    _setUnderline();
  }

  function _setImageDimensions() {
    // get all images dimensions, should all be the same
    // for not lets just use the first
    state.slideWidth = dom.images[0].clientWidth;
  }

  function _addEls() {
    for (const project of dom.projects) {
      project.addEventListener('click', function() {
        /* jshint validthis: true */
        if (state.isAnimating === false) {
          const self = this;  
          state.isAnimating = true;
          _setActiveProject(self.dataset.projectId);
          _moveProjectImages();
          _moveUnderline();
          setTimeout(function() {
            state.isAnimating = false;
          }, state.animationDuration)
        }
      }, false);
    }  
  }

  function _setActiveProject(newId = 1) {
    state.priorActiveProjectId = state.activeProjectId;
    state.activeProjectId = parseInt(newId);
  }

  function _moveProjectImages() {
    // how many do we need to move
    let movement = 0;
    movement = (state.slideWidth * state.activeProjectId) - state.slideWidth;
    for (const image of dom.images) {
      image.style.transform = `translateX(-${movement}px)`;
    }
  }

  /* 
  * issue: if left to it's own devices _setUnderline() will run before the google font is loaded, 
  * and hence the size will be wrong. It shouldn't matter in this scenario, as fonts will
  * load before we ever get to this section but for future reference: 
  * http://stackoverflow.com/questions/5680013/how-to-be-notified-once-a-web-font-has-loaded
  */
  function _setUnderline() {
    // create underline an place it under the first item
    dom.underline.style.width = dom.projects[0].getBoundingClientRect().width + 'px';
  }

  function _moveUnderline() {
    const parentOffset = document.querySelector('.porfolio__projects').getBoundingClientRect().left;
    const distance = dom.projects[state.activeProjectId - 1].getBoundingClientRect().left - parentOffset;
    dom.underline.style.width = dom.projects[state.activeProjectId - 1].getBoundingClientRect().width + 'px';
    dom.underline.style.transform = `translateX(${distance}px)`;
  }


  return {
    init: init
  };

};

var newProjects = projects();
newProjects.init();