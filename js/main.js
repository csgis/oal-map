import 'ol/ol.css';
import '../css/style.css';
import '../css/layerswitcher.css';
import '../css/popover.css';
import '../css/qr.css';

import {FullScreen, defaults as defaultControls} from 'ol/control';
import {fromLonLat, toLonLat} from 'ol/proj';

import Map from 'ol/Map';
import View from 'ol/View';
import baseLayerGroup from './layer/baselayer.js';
import baseMapLayerSwitcher from './controls/basemaplayerswitcher'
import controlList from './layer/controllist';
import controls from './controls/controls.js';
import layerSwitcher from './controls/layerswitcher';
import overlayGroup from './layer/overlays.js';
import overlayLayerSwitcher from './controls/overlaylayerswitcher'
import popOver from './controls/popover';
import popOverControl from './controls/popovercontrol';
import qrAction from './controls/qr_action';
import qrGenerator from './controls/qrgenerator';
import selectInteraction from './interactions/selectinteraction';
import urlupdater from './controls/urlupdater';

/** 
 * URL Handling
 */
 urlupdater()

/** 
 * MAP Object 
 */
const map = new Map({
  controls: defaultControls().extend(controls),
  target: 'map',
  controls: defaultControls().extend(
    [
      new FullScreen(), 
      new layerSwitcher(controlList), 
      new popOver(),
      new qrGenerator()
    ]
    ),
  view: new View({
    center: fromLonLat([lon, lat]),
    zoom: zoom,
    rotation: 0,
    extent: [984077.6331264358, 5948963.211974683, 1310675.306435972, 6127563.475719991]
  }),
});

/** 
 * Register Layers
 */

map.addLayer(baseLayerGroup)
map.addLayer(overlayGroup)

/** 
 * Register MAP Controls 
 */

popOverControl(map)
baseMapLayerSwitcher(baseLayerGroup)
overlayLayerSwitcher(overlayGroup)
map.on('moveend', qrAction);

/** 
 * Register MAP Interactions 
 */

selectInteraction(map)







