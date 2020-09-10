mapboxgl.accessToken = API_KEY ;
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-73.935242,  40.730610], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

var maxValue = ;
var data = [ 

// map.on('load', function () {
    // // add source and layer for museums
    //     map.addSource('museums', {
    //     type: 'vector',
    //     url: 'mapbox://mapbox.2opop9hr'
    //     });
    //     map.addLayer({
    //     'id': 'museums',
    //     'type': 'circle',
    //     'source': 'museums',
    //     'layout': {
    // // make layer visible by default
    //     'visibility': 'visible'
    //     },
    //     'paint': {
    //     'circle-radius': 8,
    //     'circle-color': 'rgba(55,148,179,1)'
    //     },
    //     'source-layer': 'museum-cusco'
    //     });   