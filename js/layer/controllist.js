const controlList = { 
        "overlays": [       
        {
            "type": "checkbox", 
            "group": "overlay",
            "legend": "<b>X</b>",
            "name": "overlayCheckButtons",
            "value": "Waldwirtschaftschutzgebiete",
            "id": "wwsg",
            "label": " Wald-Wild-Schongebiet",
            "checked": true
        },
        {
            "type": "checkbox", 
            "group": "overlay",
            "legend": "<b>X</b>",
            "name": "overlayCheckButtons",
            "value": "Waldschutzgebiete",
            "id": "wsg",
            "label": " Waldschutzgebiete",
            "checked": true
        },
        {
            "type": "checkbox", 
            "group": "overlay",
            "legend": "<b>X</b>",
            "name": "overlayCheckButtons",
            "value": "Naturschutzgebiet",
            "id": "nsg",
            "label": " Naturschutzgebiet",
            "checked": true
        }, 
        {
            "type": "checkbox", 
            "group": "overlay",
            "legend": "<b>X</b>",
            "name": "overlayCheckButtons",
            "value": "Landschaftsschutzgebiet",
            "id": "lsq",
            "label": " Landschaftsschutzgebiet",
            "checked": true
        },
    ],
    "baselayer": [
        {
            "type": "radio", 
            "group": "base",
            "name": "baseLayerRadioButton",
            "value": "grau_layer",
            "id": "grau_layer",
            "label": " BKG Grau",
            "checked": true
        },        
        {
            "type": "radio", 
            "group": "base",
            "name": "baseLayerRadioButton",
            "value": "osm_standard_layer",
            "id": "osm_standard_layer",
            "label": " OSM Standard",
            "checked": false
        },
        {
            "type": "radio", 
            "group": "base",
            "name": "baseLayerRadioButton",
            "value": "dop_80_layer",
            "id": "dop_80_layer",
            "label": " DOP80",
            "checked": false
        }
    ]
}

module.exports = controlList