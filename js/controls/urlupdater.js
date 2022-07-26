const urlupdater = map => {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('lon') && searchParams.has('lat')) {
        lon = searchParams.get('lon');
        lat = searchParams.get('lat');
        zoom = searchParams.has('zoom') ? searchParams.get('zoom') : 10;
    } else {
        lon = 10.307058194435557;
        lat = 47.58605491416998;
        zoom = 10;
    }
}

module.exports = urlupdater