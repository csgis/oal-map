import 'ol/ol.css';
import '../css/style.css';
import TileLayer from 'ol/layer/Tile';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import TileDebug from 'ol/source/TileDebug';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import RegularShape from 'ol/style/RegularShape';
import CircleStyle from 'ol/style/Circle';

// Overlays
const debug_layer = new TileLayer({
    source: new TileDebug(),
    visible: false,
    title: 'debug_layer'
})


// Style for polygons
const fillStyle = new Fill({
    color: [10, 10, 247, 1]
})

const fillStyle2 = new Fill({
    color: [100, 119, 247, .5]
})

const strokeStyle = new Stroke({
    color: [40, 40, 247, 1],
    width: 10
})

const regularShape = new RegularShape({
    fill: new Fill({
        color: [40, 40, 247, .3]
    }),
    stroke: strokeStyle,
    points: 5,
    radius: 20
})

const circleShape = new CircleStyle({
    fill: new Fill({
        color: [40, 40, 247, .3]
    }),
    stroke: strokeStyle,
    radius: 20
})

const pointStyle = new Style({
    image: new  CircleStyle({
        fill: new Fill({
            color: [40, 40, 247, .3]
        }),
        stroke: strokeStyle,
        radius: 20
    })
})

const polygonStyleBlue = new Style({
    fill: new Fill({
        color: [0, 0, 255, 1]
    })
})

const polygonStyleGreen = new Style({
    fill: new Fill({
        color: [0, 128, 0, 1]
    })
})

const geoJsonStyle  = function(feature){
    let typ = feature.get('typ')
    let geometryType = feature.getGeometry().getType()

    if (geometryType === 'Point') {
        feature.setStyle([pointStyle])
    }

    if (geometryType === 'Polygon') {
        feature.setStyle(typ == "water" ? [polygonStyleBlue] : [polygonStyleGreen])
    }

}

const geojson_layer = new VectorLayer({
    visible: true,
    title: 'geojson_layer',
    source: new VectorSource({
        url: 'static/data/test.json',
        format: new GeoJSON(),
    }),
    style: geoJsonStyle
    // style: new Style({
    //     fill: fillStyle,
    //     stroke: strokeStyle,
    //     image: circleShape
    // })
})

const overlayGroup = new LayerGroup({
    layers: [
        debug_layer,
        geojson_layer
    ]
})

module.exports = overlayGroup