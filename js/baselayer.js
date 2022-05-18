import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';

const osm_standard_layer = new TileLayer({
    visible: true,
    preload: Infinity,
    title: 'osm_standard_layer',
    source: new OSM()
})

const osm_humanitarian_layer = new TileLayer({
    source: new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }
    ),
    visible: false,
    title: 'osm_humanitarian_layer'
    // extent: [12400753.576694038, -5658730.000549673, 17174426.336716905, -1030389.4579914175]
})


const dop_80_layer = new TileLayer({
    title: 'dop_80_layer',
    visible: false,
    source: new TileWMS({
      url: 'https://geoservices.bayern.de/wms/v2/ogc_dop80_oa.cgi?',
      params: {'LAYERS': 'by_dop80c', 'TILED': true, 'VERSION': '1.1.0'},
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
  })

const baseLayerGroup = new LayerGroup({
    layers: [
        osm_standard_layer,
        osm_humanitarian_layer,
        dop_80_layer
    ]
})

module.exports = baseLayerGroup