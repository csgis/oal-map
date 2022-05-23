import Select from 'ol/interaction/Select';

const selectInteraction = map => {
    const selectInteraction = new Select();
    map.addInteraction(selectInteraction);
    selectInteraction.on("select", function (e) {
        if (e.selected[0] && e.selected[0].getGeometry().getType() == 'Point') {
            console.log(e.selected[0].getGeometry().getType());
            e.selected[0].setStyle(
                new Style({
                    image: new CircleStyle({
                        fill: new Fill({
                            color: [40, 40, 247, .3]
                        }),
                        stroke: new Stroke({
                            color: [40, 40, 247, 1],
                            width: 30
                        }),
                        radius: 20
                    })
                })
            )
        }
    })
}

module.exports = selectInteraction

