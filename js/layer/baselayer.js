import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';

const osm_standard_layer = new TileLayer({
    visible: false,
    preload: Infinity,
    title: 'osm_standard_layer',
    source: new OSM()
})

const grau_layer = new TileLayer({
    source: new TileWMS({
        url: 'https://sgx.geodatenzentrum.de/wms_topplus_open?',
        params: {'LAYERS': 'web_grau', 'TILED': true, 'VERSION': '1.1.0'},
        attributions: '<a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.html" target="_blank">https://sg.geodatenzentrum.de</a>'
    }
    ),
    visible: true,
    title: 'grau_layer'
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
      attributions: '<a href="https://geodatenonline.bayern.de/" target="_blank">geodatenonline.bayern.de</a>'
    }),
  })

const baseLayerGroup = new LayerGroup({
    layers: [
        osm_standard_layer,
        grau_layer,
        dop_80_layer
    ]
})

module.exports = baseLayerGroup