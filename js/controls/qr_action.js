import {fromLonLat, toLonLat} from 'ol/proj';

import QRCode from 'qrcode'
import { saveAs } from 'file-saver';

const qrAction = (evt) => {
    const canvas = document.querySelector('.qr__canvas')

    const map = evt.map;
    const lonLat = toLonLat(map.getView().getCenter());
    const c_zoom = map.getView().getZoom();
    let baseUrl = window.location.href.split("?")[0];
    window.history.pushState('name', '', baseUrl);
    let currentURL = window.location.href;
    window.history.replaceState("", "", currentURL + "?lon=" + lonLat[0] + "&lat=" + lonLat[1] + "&zoom=" + c_zoom);

    var currentURL_string = currentURL + "?lon=" + lonLat[0] + "&lat=" + lonLat[1] + "&zoom=" + c_zoom;

    QRCode.toCanvas(canvas, currentURL_string, { version: 10, scale: 10 }, function (error) {
        if (error) console.error(error)
    })

    document.onkeydown = function (e) {
        e = e || window.event;
        if(e.shiftKey && e.keyCode === 9){
          canvas.toBlob(function(blob) {
              var lonLat = toLonLat(map.getView().getCenter());
              saveAs(blob, lonLat+'.png');
          });
        };
        if(e.key === "Escape"){
          let oag__oal__popover_container = document.querySelector(".oal__popover");
          oag__oal__popover_container.classList.remove('oal__popover--show')
        };

      };

}

module.exports = qrAction