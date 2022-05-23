const overlayLayerSwitcher = (overlayGroup) => {
    const overLayerElements = document.querySelectorAll('.oag__layerswitcher_body > input[type=checkbox]');

    for(let overLayerElement of overLayerElements) {
            overLayerElement.addEventListener('change', function () {
                let overLayerElementsValue = this.value;
                let overlayLayer;

                overlayGroup.getLayers().forEach(function (element, index, array) {
                    if (overLayerElementsValue === element.get('title')) {
                        overlayLayer = element
                    }
                })

                this.checked ? overlayLayer.setVisible(true) : overlayLayer.setVisible(false)

            })
        }
}

module.exports = overlayLayerSwitcher