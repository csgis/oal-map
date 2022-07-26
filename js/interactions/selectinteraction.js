import Fill from 'ol/style/Fill';
import Select from 'ol/interaction/Select';
import Style from 'ol/style/Style';

const selectInteraction = map => {
    const selectInteraction = new Select();
    map.addInteraction(selectInteraction);
    selectInteraction.on("select", function (e) {
            e.selected[0].setStyle(
                new Style({
                        fill: new Fill({
                            color: '#0C3B6B'
                        }),

                })
            )
        
    })
}

module.exports = selectInteraction

