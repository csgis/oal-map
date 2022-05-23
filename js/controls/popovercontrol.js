import { Overlay } from 'ol';

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
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            let clickedFeatureName = feature.get('name');
            const coordinate = evt.coordinate;
            popOverContainer.classList.add('oal__popover--show');
            console.log(overlayContainerElement);
            popOverModal.innerHTML = clickedFeatureName
        }, {
            layerFilter: function (layerCandidate) {
                return layerCandidate.get('title') === 'geojson_layer'
            }
        });
    });
}


module.exports = popOverControl