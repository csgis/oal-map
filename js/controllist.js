const controlList = { 
        "overlays": [
        {
            "type": "checkbox", 
            "name": "overlayCheckButtons",
            "value": "debug_layer",
            "id": "debug_layer",
            "label": " Granule",
            "checked": false
        },
        {
            "type": "checkbox", 
            "name": "overlayCheckButtons",
            "value": "geojson_layer",
            "id": "geojson",
            "label": " Schutzgebiete",
            "checked": true
        },

    ],
    "baselayer": [
        {
            "type": "radio", 
            "name": "baseLayerRadioButton",
            "value": "grau_layer",
            "id": "grau_layer",
            "label": " BKG Grau",
            "checked": true
        },        
        {
        "type": "radio", 
        "name": "baseLayerRadioButton",
        "value": "osm_standard_layer",
        "id": "osm_standard_layer",
        "label": " OSM Standard",
        "checked": false
        },
        {
        "type": "radio", 
        "name": "baseLayerRadioButton",
        "value": "dop_80_layer",
        "id": "dop_80_layer",
        "label": " DOP80",
        "checked": false
        }
    ]
}

module.exports = controlList