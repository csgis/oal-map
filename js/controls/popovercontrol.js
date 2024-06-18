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
        let clickedFeatureRule = topFeature.get('regelung') || topFeature.get('Regelung') || "";
        let clickedLayerName = topFeature.get('objectcode') || topFeature.get('Objectcode') || topFeature.get('Objektcode') || topFeature.get('Objektcode') || "";
        let customText = topFeature.get('c_text') ? '<br>' + topFeature.get('c_text') : 0;
        console.log(clickedFeatureRule)
        let clickedFeatureName = topFeature.get('name') || topFeature.get('Name') || "";
        if (!clickedFeatureModal) return;


        let regel2_msg = {
            "Wald-Wild-Schongebiet" : "<br>Schutzzweck gilt nur für die Wintermonate und auf freiwilliger Basis (01.12 bis 31.03)",
            "WWSG" : "<br>Schutzzweck gilt nur für die Wintermonate und auf freiwilliger Basis (01.12 bis 31.03)",
            "Wildschutzgebiet" : "<br>Schutzzweck gilt nur für die Wintermonate",
            "WSG" : "<br>Schutzzweck gilt nur für die Wintermonate",
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
                .replace("%REGEL2%",  customText || regel2_msg[clickedLayerName])  
                .replace("%ICONS%", response)
                popOverModal.innerHTML += PopOverContent
                popOverContainer.classList.add('oal__popover--show');
                }
            )
    });
}


module.exports = popOverControl