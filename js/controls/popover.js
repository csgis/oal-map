import { Control } from 'ol/control';

// Custom Control

class popOver extends Control {
      /**
       * @param {Object} [opt_options] Control options.
       */
      constructor(opt_options) {
        const options = opt_options || {};

        // create container DIV for sidebar
        const element = document.createElement('div');
        element.className = 'oal__popover';

        const popover__close = document.createElement('span')
        popover__close.className = 'oal__popover__close'
        popover__close.innerHTML =  '&times;'
        element.appendChild(popover__close);

                // bind toggle function to button
                popover__close.addEventListener('click', function(){
                  let oag__oal__popover_container = document.querySelector(".oal__popover");
                  oag__oal__popover_container.classList.remove('oal__popover--show')
              });

        const elementInner = document.createElement('div');
        elementInner.className = 'oal__popOver-content';
        element.appendChild(elementInner);

        super({
          element: element,
          target: options.target,
        });
    }

    }


  module.exports = popOver