const urlupdater = map => {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('lon') && searchParams.has('lat')) {
        lon = searchParams.get('lon');
        lat = searchParams.get('lat');
        zoom = searchParams.has('zoom') ? searchParams.get('zoom') : 8;
    } else {
        lon = 10.247935803982797;
        lat = 47.42830595470386;
        zoom = 4;
    }
}

module.exports = urlupdater