import { Control } from 'ol/control';

// Custom Control

class layerSwitcher extends Control {
      /**
       * @param {Object} [opt_options] Control options.
       */
      constructor(opt_options) {
        const options = opt_options || {};

        // create container DIV for sidebar
        const element = document.createElement('div');
        element.className = 'oal__sidebar ol-control oag__layerswitcher oag__layerswitcher--open';

        // create toggle button
        const button = document.createElement('button');
        button.className = 'oag__layerswitcher_button oag__layerswitcher_button--minus';
        button.id = 'oag__layerswitcher_button';
        element.appendChild(button);

        // create body container DIV for input list
        const oag__layerswitcher_body = document.createElement('div');
        oag__layerswitcher_body.className = 'oag__layerswitcher_body oag__layerswitcher_body--block';
        element.appendChild(oag__layerswitcher_body);

        super({
          element: element,
          target: options.target,
        });

        // create overlay elements and headline
        var heading = document.createElement('h6');
        heading.className = 'layerswitcher__headline'
        heading.appendChild(document.createTextNode("Schutzgebiete"));
        oag__layerswitcher_body.appendChild(heading);
        this.createLayerSwtichElements(oag__layerswitcher_body, options["overlays"])

        // create Legend
        // const oag__legend = document.createElement('div');
        // oag__legend.className = 'oag__legend';
        // oag__legend.innerHTML = "<div class='oal__legend'><span class='legend_gfx green'></span> Naturschutzgebiet<br><span class='legend_gfx blue'></span> Wasserschutzgebiet</div>";
        // oag__layerswitcher_body.appendChild(oag__legend);

        // create basemap elements and headline
        var heading = document.createElement('h6');
        heading.className = 'layerswitcher__headline'
        heading.appendChild(document.createTextNode("Basis Karten"));
        oag__layerswitcher_body.appendChild(heading);
        this.createLayerSwtichElements(oag__layerswitcher_body, options["baselayer"])

        // bind toggle function to button
        button.addEventListener('click', function(){
          var oag__layerswitcher_container = document.querySelector(".oag__layerswitcher");
          var oag__layerswitcher_body = document.querySelector(".oag__layerswitcher_body");

          if (this.classList.contains("oag__btn--closed")) {
            oag__layerswitcher_body.classList.add("oag__layerswitcher_body--block");
            this.classList.remove("oag__layerswitcher_button--plus");
            this.classList.remove("oag__btn--closed");
            oag__layerswitcher_container.classList.add("oag__layerswitcher--open");
          } else {
            oag__layerswitcher_body.classList.remove("oag__layerswitcher_body--block");
            this.classList.add("oag__layerswitcher_button--plus");
            this.classList.add("oag__btn--closed");
            oag__layerswitcher_container.classList.remove("oag__layerswitcher--open");
          }
      });


    }

     createLayerSwtichElements(containerElement, controlList){
        controlList.forEach(function(el, index){
        
              var br = document.createElement("br");
        
              var checkbox = document.createElement('input');
              checkbox.type = el["type"];
              checkbox.name = el["name"];
              checkbox.value = el["value"];
              checkbox.id = el["id"];
              checkbox.checked = el["checked"];
              checkbox.classList.add("layer__switcher")
              
              var label = document.createElement('label')
              label.htmlFor = "id";
              label.appendChild(document.createTextNode(el["label"]));
  
              containerElement.appendChild(checkbox);
              if (el["group"] == "overlay") {
                var legend = document.createElement('div')
                legend.id = "l-"+el["id"];
                legend.classList.add("legend__box")
                containerElement.appendChild(legend);
              }               
              containerElement.appendChild(label);
              containerElement.appendChild(br);
  
      });  
    }
  

  }

  module.exports = layerSwitcher