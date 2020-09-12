
// Define Variable for Tile Layer

var streetsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

// Initialize LayerGroups 
 var layers = {
     onestar: new L.LayerGroup(),
    //  twostars: new L.LayerGroup(),
    //  threestars: new L.LayerGroup(),
    //  fourstars: new L.LayerGroup(),
    //  fivestars: new L.LayerGroup()
 };

 // Create Map
var myMap = L.map("map", {
    center: [36.114647, -115.172813], // Starting at Las Vegas
    zoom: 5,
    layers: [
        layers.onestar,
        // layers.twostars,
        // layers.threestars,
        // layers.fourstars,
        // layers.fivestars
    ]
});

// Add tileLayer
streetsMap.addTo(myMap);


// Define OverlayMaps
var overlayMaps = {
    "One Star Restaurants": layers.onestar,
    // "Two Stars Restaurants": layers.twostars,
    // "Three Stars Restaurants": layers.threestars,
    // "Four Stars Restaurants": layers.fourstars,  
    // "Five Stars Restaurants": layers.fivestars
};


// Layer Control 
L.control.layers(null, overlayMaps).addTo(myMap);

// Legend

// Call Data and Start Functions Setup
d3.csv("yelpdata.csv", function (error, data) {
    console.log(data)
    data.forEach(data => {
        var layer_star
        if (data.stars >= 1 & data.stars < 2){
            layer_star = "onestar"
        }

        var newMarker = L.marker([data.latitude, data.longitude]);

        // Add the new marker to the appropriate layer
        newMarker.addTo(layers[layer_star]);

        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup("");
    }); 
});

    // d3.csv("Data/Yelp_InitialScrub.csv", function (//city or rating))


