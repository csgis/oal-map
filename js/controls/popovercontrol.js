import { Overlay } from 'ol';
import overlayGroup from '../layer/overlays.js';

const popOverControl = (map) => {
    // Popover
    const overlayContainerElement = document.getElementById('overlay-container');
    const overlayLayer = new Overlay({
        element: overlayContainerElement
    })
    map.addOverlay(overlayLayer);
    const popOverModal = document.querySelector('.oal__popOver-content');
    const popOverContainer = document.querySelector('.oal__popover');

    map.on('click', function (evt) {
        popOverContainer.classList.remove('oal__popover--show');
        popOverModal.innerHTML = ""

        const featureArray = map.getFeaturesAtPixel(evt.pixel);
        if (!featureArray) return;
        const topFeature = featureArray[0];

        let clickedFeatureModal = topFeature.get('modal');
        let clickedFeatureRule = topFeature.get('regelung') || "";
        let clickedLayerName= topFeature.get('objectcode') || "";
        let clickedFeatureName = topFeature.get('name');
        if (!clickedFeatureModal) return;


        let regel2_msg = {
            "Wald-Wild-Schongebiet" : "<br>Schutzzweck gilt nur für die Wintermonate und auf freiwilliger Basis",
            "Wildschutzgebiet" : "<br>Schutzzweck gilt nur für die Wintermonate",
            "Naturschutzgebiet" : "",
            "Landschaftsschutzgebiet" : ""
        }

        const tmpl = '%TYP%<h3>%NAME% </h3><div class="comment"> %REGEL% %REGEL2%</div>%ICONS%</div>';
        fetch(`./static/pages/${clickedFeatureModal}-icons.html`)
        .then(response => response.text())
        .then( 
            response => {
                var PopOverContent = tmpl
                .replace("%TYP%", clickedLayerName) 
                .replace("%NAME%", `${clickedFeatureName}  <br>`)
                .replace("%REGEL%", clickedFeatureRule)
                .replace("%REGEL2%", regel2_msg[clickedLayerName])  
                .replace("%ICONS%", response)
                popOverModal.innerHTML += PopOverContent
                popOverContainer.classList.add('oal__popover--show');
                }
            )
    });
}


module.exports = popOverControl