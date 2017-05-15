const projects = function() {

  const dom = {
    images: document.querySelectorAll('.project__images'),
    projects: document.querySelectorAll('.project')
  };

  let state = {
    activeProjectId: 1,
    activeProjectIndex: 1
  };

  function init() {
    _addEls();
    _setImageDimensions();
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
        const self = this;  
        _setActiveProject(self.dataset.projectId);
        _moveProjectImages();
      }, false);
    }
    
  }

  function _setActiveProject(newId = 1) {
    // expects a number 
    state.priorProjectId = state.activeProjectId;
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


  return {
    init: init
  };

};

var newProjects = projects();
newProjects.init();