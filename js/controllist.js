const controlList = { 
        "overlays": [
        {
            "type": "checkbox", 
            "name": "overlayCheckButtons",
            "value": "geojson_layer",
            "id": "geojson",
            "label": " Schutzgebiete",
            "checked": true
        },
        {
            "type": "checkbox", 
            "name": "overlayCheckButtons",
            "value": "debug_layer",
            "id": "debug_layer",
            "label": " Granule",
            "checked": false
        },
    ],
    "baselayer": [
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
        "value": "osm_humanitarian_layer",
        "id": "osm_humanitarian_layer",
        "label": " OSM Humanitarian",
        "checked": false
        },
        {
        "type": "radio", 
        "name": "baseLayerRadioButton",
        "value": "stamen_layer",
        "id": "stamen_layer",
        "label": " stamen",
        "checked": true
        }
    ]
}

module.exports = controlList