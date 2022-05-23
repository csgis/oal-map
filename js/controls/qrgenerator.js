import { Control } from 'ol/control';

// Custom Control

class qrGenerator extends Control {
        /**
         * @param {Object} [opt_options] Control options.
         */
        constructor(opt_options) {
          const options = opt_options || {};

          // create container DIV for sidebar
          const element = document.createElement('canvas');
          element.className = 'qr__canvas'
          element.id = 'qr__canvas'
          super({
            element: element,
            target: options.target,
          });
      }
    }


  module.exports = qrGenerator