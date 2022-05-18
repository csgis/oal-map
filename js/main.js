import 'ol/ol.css';
import '../css/style.css';
import '../css/layerswitcher.css';

import * as olExtent from 'ol/extent';

import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import {fromLonLat, toLonLat} from 'ol/proj';
import {saveAs, toBlob} from 'file-saver';

import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import { Overlay } from 'ol';
import QRCode from 'qrcode'
import Select from 'ol/interaction/Select';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import View from 'ol/View';
import baseLayerGroup from './baselayer.js';
import controlList from './controllist';
import controls from './controls.js';
import { defaults as defaultControls } from 'ol/control';
import layerSwitcher from './layerswitcher';
import overlayGroup from './overlays.js';

let searchParams = new URLSearchParams(window.location.search)
console.log(searchParams.has('lat'));
if (searchParams.has('lon') && searchParams.has('lat')){
   lon = searchParams.get('lon');
   lat = searchParams.get('lat');
   searchParams.has('zoom')
   zoom = searchParams.has('zoom') ? searchParams.get('zoom') : 8;
   console.log(lon,lat, zoom)
} else {
   lon = 10.247935803982797;
   lat = 47.42830595470386;
   zoom = 10;
   console.log(lon,lat, zoom)

}

/** 
 * MAP Object 
 */
const map = new Map({
  controls: defaultControls().extend(controls),
  target: 'map',
  controls: defaultControls().extend([new layerSwitcher(controlList)]),

  view: new View({
    center: fromLonLat([lon, lat]),
    zoom: zoom,
    rotation: 0,
    // minZoom: 1,
    extent: [1097023.5784050967, 5984674.779996692, 1196835.9937393684, 6030415.204612381]
  }),
});

map.addLayer(baseLayerGroup)
map.addLayer(overlayGroup)


/** 
 * MAP Controls 
 */


// Popover
const overlayContainerElement = document.getElementById('overlay-container');
const overlayLayer = new Overlay({
  element: overlayContainerElement
})
map.addOverlay(overlayLayer);
const overlayFeatureName = document.getElementById('feature-name');

map.on('click', function (evt) {
  console.log(evt.coordinate)
  overlayLayer.setPosition(undefined);
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    let clickedFeatureName = feature.get('name');
    const coordinate = evt.coordinate;
    overlayLayer.setPosition(coordinate);
    overlayFeatureName.innerHTML = clickedFeatureName
  }, {
    layerFilter: function(layerCandidate){
      return layerCandidate.get('title') === 'geojson_layer'
    }
  });
});


// basemap Layer switcher
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

// Overlay Layer Switcher
const overLayerElements = document.querySelectorAll('.oag__layerswitcher_body > input[type=checkbox]')
console.log(overLayerElements)

for (let overLayerElement of overLayerElements) {
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



const selectInteraction = new Select();
map.addInteraction(selectInteraction);
selectInteraction.on("select", function(e){
  if (e.selected[0] && e.selected[0].getGeometry().getType() == 'Point'){
    console.log(e.selected[0].getGeometry().getType());
    e.selected[0].setStyle(
      new Style({
        image: new CircleStyle({
            fill: new Fill({
                color: [40, 40, 247, .3]
            }),
            stroke: new Stroke({
              color: [40, 40, 247, 1],
              width: 30
          }),
            radius: 20
        })
    })
     
    )
  }
})

const viewProjection = map.getView().getProjection()
var geolocation = new Geolocation({
  // take the projection to use from the map's view
  tracking: true,
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: viewProjection
});

geolocation.on('change:position', function(e){
  let currentPosition = this.getPosition();
  // let ll = toLonLat(currentPosition, viewProjection)
  // console.log(currentPosition)
  // console.log(ll)
  // map.getView().setCenter(currentPosition)
})

// listen to changes in position
// map.on('moveend', function(evt) {
//   // console.log(map.get('view').getProjection())
//   window.console.log(geolocation.getPosition());
// });


const canvas = document.getElementById('canvas')









function onMoveEnd(evt) {
  const map = evt.map;
  const lonLat = toLonLat( map.getView().getCenter());
  const c_zoom = map.getView().getZoom();
  let baseUrl = window.location.href.split("?")[0];
  window.history.pushState('name', '', baseUrl);
  let currentURL = window.location.href;
  window.history.replaceState("", "", currentURL + "?lon=" + lonLat[0] + "&lat=" + lonLat[1] + "&zoom=" + c_zoom);
 
  var currentURL_string = currentURL + "?lon=" + lonLat[0] + "&lat=" + lonLat[1] + "&zoom=" + c_zoom;

  QRCode.toCanvas(canvas, currentURL_string,{ version: 10, scale: 10 }, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })

}

map.on('moveend', onMoveEnd);


document.onkeydown = function (e) {
  e = e || window.event;
  if(e.shiftKey && e.keyCode === 9){
    canvas.toBlob(function(blob) {
        var lonLat = toLonLat(map.getView().getCenter());
        saveAs(blob, lonLat+'.png');
    });
  };
};

