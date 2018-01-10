const projects = function() {

  const dom = {
    images: document.querySelectorAll('.project__images'),
    projectNames: document.querySelectorAll('.project__name'),
    underline: document.querySelector('.project__underline'),
    projectDetails: document.querySelectorAll('.project__detail')
  };

  let state = {
    activeProjectId: 1,
    isAnimating: false,
    animationDuration: 1000
  };

  function init() {
    _addEls();
    _setUnderline();
  }

  function _addEls() {
    for (const project of dom.projectNames) {
      project.addEventListener('click', function() {
        /* jshint validthis: true */
        if (state.isAnimating === false) {
          const self = this;  
          state.isAnimating = true;
          _setActiveProject(self.dataset.projectId);
          _moveProjectImages();
          _moveUnderline();
          _showProjectInfo();
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
    const slideWidth = dom.images[0].clientWidth;
    movement = (slideWidth * state.activeProjectId) - slideWidth;
    for (const image of dom.images) {
      image.style.filter = 'grayscale(100%)';
      if (parseInt(image.dataset.projectId) === state.activeProjectId) {
        image.style.filter = 'grayscale(0%)';
      }
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
    dom.underline.style.width = dom.projectNames[0].getBoundingClientRect().width + 'px';
  }

  function _moveUnderline() {
    const parentOffset = document.querySelector('.porfolio__projects').getBoundingClientRect().left;
    const distance = dom.projectNames[state.activeProjectId - 1].querySelector('span').getBoundingClientRect().left - parentOffset;
    dom.underline.style.width = dom.projectNames[state.activeProjectId - 1].querySelector('span').getBoundingClientRect().width + 'px';
    dom.underline.style.transform = `translateX(${distance}px)`;
  }

  function _showProjectInfo() {
    for (const project of dom.projectDetails) {
      project.style.display = 'none';
      if (parseInt(project.dataset.projectId) === state.activeProjectId) {
        project.style.display = 'flex';
        console.log(project.style.display);
      }
    }
  }

  return {
    init: init
  }

};

var newProjects = projects();
newProjects.init();