const projects = function() {

  const dom = {
    images: document.querySelectorAll('.project__images'),
    projects: document.querySelectorAll('.project'),

  };

  let state = {
    activeProjectId: 1,
    isAnimating: false,
    animationDuration: 1000
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
        if (state.isAnimating === false) {
          const self = this;  
          state.isAnimating = true;
          _setActiveProject(self.dataset.projectId);
          _moveProjectImages();
          _moveProjectLabels();
          setTimeout(function() {
            state.isAnimating = false;
          }, state.animationDuration)
        }
      }, false);
    }  
  }

  function _setActiveProject(newId = 1) {
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

  function _moveProjectLabels() {
    for (const project of dom.projects) {
      const underline = project.querySelector('.project__underline');
      if (parseInt(project.dataset.projectId) === state.activeProjectId) {
        if (underline.classList.contains('project__underline--reverse')) {
          underline.classList.remove('project__underline--reverse');
        }
        underline.classList.add('project__underline--animate');
      } else {
        if (underline.classList.contains('project__underline--animate')) {
          underline.classList.remove('project__underline--animate');
          underline.classList.add('project__underline--reverse');
          setTimeout(function() {
            underline.classList.remove('project__underline--reverse');
          }, state.animationDuration);
        }
      }
    }
  }


  return {
    init: init
  };

};

var newProjects = projects();
newProjects.init();