import OSM from 'ol/source/OSM';
import OverviewMap from 'ol/control/OverviewMap';
import ScaleLine from 'ol/control/ScaleLine';
import TileLayer from 'ol/layer/Tile';
import ZoomSlider from 'ol/control/ZoomSlider';

const om = new OverviewMap({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
  });
  
const zs = new ZoomSlider();
const sl = new ScaleLine();

const controls = [om, zs]
module.exports = controls