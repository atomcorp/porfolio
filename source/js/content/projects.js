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
    // 1. get where the underline currently is
    // 2. get the next project, work out width 
    // 3. move underline
    // 4. if destination, stop, else keep going
    const steps = state.priorActiveProjectId - state.activeProjectId;
    let underlineLocation = dom.projects[state.activeProjectId];
    let speed = state.animationDuration / (Math.abs(steps) + 1);
    let projects = dom.projects;
    let parentOffset = document.querySelector('.porfolio__projects').getBoundingClientRect().left;
    // don't need to do all this loops
    // can just get start location/size and add end location size and end

    const distance = dom.projects[state.activeProjectId - 1].getBoundingClientRect().left - parentOffset;
    console.log(dom.projects[state.activeProjectId - 1]);
    dom.underline.style.width = dom.projects[state.activeProjectId - 1].getBoundingClientRect().width + 'px';
    dom.underline.style.transform = `translateX(${distance}px)`;


    // if (steps < 0) {
    //   // move right to left
    //   for (var i = state.priorActiveProjectId; i < state.priorActiveProjectId - steps; i++) {
    //     const distance = dom.projects[i].getBoundingClientRect().left - parentOffset;
    //     console.log(distance);
    //     dom.underline.style.width = dom.projects[i].getBoundingClientRect().width + 'px';
    //     dom.underline.style.transform = `translateX(${distance}px)`;
    //   }
    // } else {
    //   for (var i = state.priorActiveProjectId; i > state.priorActiveProjectId - steps; i--) {
    //     const distance = dom.projects[i - 1].getBoundingClientRect().left - parentOffset;
    //     console.log(dom.projects[i - 1]);
    //     dom.underline.style.width = dom.projects[i - 1].getBoundingClientRect().width + 'px';
    //     dom.underline.style.transform = `translateX(-${distance}px)`;
    //   }
    // }
    

    for (const project of projects) {
      const projectId = parseInt(project.dataset.projectId);

      // if it has departed
      if (projectId === state.priorActiveProjectId) {

      }
      // if it's between departure and destination
      if (projectId > state.priorActiveProjectId && projectId < state.activeProjectId) {

      }
      // if it's arrived
      if (projectId === state.activeProjectId) {

      }
    }

  }

  // todo: this would be cooler if the line slides between all the 
  // function _moveProjectLabels() {
  //   for (const project of dom.projects) {
  //     const underline = project.querySelector('.project__underline');
  //     if (parseInt(project.dataset.projectId) === state.activeProjectId) {
  //       if (underline.classList.contains('project__underline--reverse')) {
  //         underline.classList.remove('project__underline--reverse');
  //       }
  //       underline.classList.add('project__underline--animate');
  //     } else {
  //       if (underline.classList.contains('project__underline--animate')) {
  //         underline.classList.remove('project__underline--animate');
  //         underline.classList.add('project__underline--reverse');
  //         setTimeout(function() {
  //           underline.classList.remove('project__underline--reverse');
  //         }, state.animationDuration);
  //       }
  //     }
  //   }
  // }


  return {
    init: init
  };

};

var newProjects = projects();
newProjects.init();