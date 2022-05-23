const baseMapLayerSwitcher = (baseLayerGroup) => {
    const baseLayerElements = document.querySelectorAll('.oag__layerswitcher_body > input[type=radio]')
    for (let baseLayerElement of baseLayerElements) {
      baseLayerElement.addEventListener('change', function () {
        let baseLayerElementValue = this.value;
        baseLayerGroup.getLayers().forEach(function (element, index, array) {
          let baseLayerName = element.get('title');
          element.setVisible(baseLayerName === baseLayerElementValue)
        })
      })
    }
}

module.exports = baseMapLayerSwitcher