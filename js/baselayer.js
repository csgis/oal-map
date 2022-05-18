import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import Stamen from 'ol/source/Stamen';


const osm_standard_layer = new TileLayer({
    visible: false,
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


const stamen_layer = new TileLayer({
    visible: true,
    title: 'stamen_layer',
    source: new Stamen({
        layer: 'toner'
    })
})

const baseLayerGroup = new LayerGroup({
    layers: [
        osm_standard_layer,
        osm_humanitarian_layer,
        stamen_layer
    ]
})

module.exports = baseLayerGroup