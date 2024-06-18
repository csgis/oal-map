import 'ol/ol.css';
import '../../css/style.css';

import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';

import Fill from 'ol/style/Fill';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

// Overlays

var font = 'bold 14px "Open Sans", "Arial Unicode MS", "sans-serif"';
const wwsg_color = '#fbff00';
const wsg_color = 'red';
const lsg_color = 'violet';
const oa_color = 'white';

// WALD WILD SCHONGEBIET
const wwsg_style = new Style({
    fill: new Fill({
      color: wwsg_color,
    }),
    text: new Text({
        font: font,
        placement: 'center',
        fill: new Fill({
          color: 'white',
        }),
      }),
  });


const wwsgLayer = new VectorLayer({
    visible: true,
    opacity: .6,
    zIndex: 4,
    declutter: true,
    title: 'Waldwirtschaftschutzgebiete',
    source: new VectorSource({
      url: 'static/data/wwsg.geojson',
      format: new GeoJSON(),
    }),
    // style: geoJsonStyle
    style: function (feature) {
        wwsg_style.getText().setText(feature.get('name'));
        return wwsg_style;
      }
  });


// WILDSCHUTZGEBIET
const wsg_style = new Style({
    fill: new Fill({
      color: wsg_color
    }),
    text: new Text({
        font: font,
        placement: 'center',
        fill: new Fill({
          color: 'black',
        }),
      }),
});

const wsgLayer = new VectorLayer({
    visible: true,
    opacity: .5,
    zIndex: 3,
    title: 'Wildschutzgebiet',
    source: new VectorSource({
      url: 'static/data/wsg.geojson',
      format: new GeoJSON(),
    }),
    style: function (feature) {
        wsg_style.getText().setText(feature.get('name'));
        return wsg_style;
      }
  });


// NATURSCHUTZGEBIET

function drawPattern(img, size) {
  var canvas = document.createElement('canvas');

  canvas.height = 300;
  canvas.width = 300;

  var tempCanvas = document.createElement("canvas");
  var tCtx = tempCanvas.getContext("2d");

  tempCanvas.width = size;
  tempCanvas.height = size;
  tCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, size, size);

  // use getContext to use the canvas for drawing
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ctx.createPattern(tempCanvas, 'repeat');

  ctx.beginPath();
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fill();
  return ctx.fillStyle;
}

const NSG_style = new Style({
  fill: new Fill(),
  stroke: new Stroke({
      color: 'white',
      width: 4
  })
});

var img = new Image();
img.src = "./static/img/pattern.png";
img.onload = function(){
  const pattern = drawPattern(this, 150/20);
  NSG_style.getFill().setColor(pattern);

}

const nsgLayer = new VectorLayer({
  visible: true,
  opacity: .6,
  declutter: true,
  zIndex: 2,
  title: 'Naturschutzgebiet',
  source: new VectorSource({
    url: 'static/data/nsg.geojson',
    format: new GeoJSON(),
  }),
  style: function (feature) {
      return NSG_style;
    }
});  


// LANDSCHAFTSSCHUTZGEBIET
const lsg_style = new Style({
    fill: new Fill({
      color: lsg_color,
    }),
    stroke: new Stroke({
        color: 'white',
        width: 4
    })
  });


const lsgLayer = new VectorLayer({
    visible: true,
    opacity: .6,
    declutter: true,
    zIndex: 1,
    title: 'Landschaftsschutzgebiet',
    source: new VectorSource({
      url: 'static/data/lsg.geojson',
      format: new GeoJSON(),
    }),
    style: function (feature) {
        // lsg_style.getText().setText(feature.get('name'));
        return lsg_style;
      }
  });

// OA
const oa_style = new Style({
  fill: new Fill({
    color: 'white',
  })
});


const oa_Layer = new VectorLayer({
  visible: true,
  opacity: 0.6,
  declutter: true,
  zIndex: 20,
  title: 'Oberallgäu',
  source: new VectorSource({
    url: 'static/data/maske.geojson',
    format: new GeoJSON(),
  }),
  style: function (feature) {
      // lsg_style.getText().setText(feature.get('name'));
      return oa_style;
    }
});

const overlayGroup = new LayerGroup({
    layers: [
        wwsgLayer,
        wsgLayer,
        nsgLayer,
        lsgLayer,
        oa_Layer
    ]
})

module.exports = overlayGroup