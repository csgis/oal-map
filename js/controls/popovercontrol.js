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

            fetch('https://gist.githubusercontent.com/t-book/d396d4ddceb4866202c4b840cebd7435/raw/b1553cc3d00e91ac800647249f6febea12b83f59/gistfile1.txt')
            .then(response => response.text())
            .then(response => popOverModal.innerHTML = response + clickedFeatureName)

            popOverContainer.classList.add('oal__popover--show');
            //popOverModal.innerHTML = clickedFeatureName
        }, {
            layerFilter: function (layerCandidate) {
                return layerCandidate.get('title') === 'geojson_layer'
            }
        });
    });
}


module.exports = popOverControl