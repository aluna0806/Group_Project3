// Call Data and Start Functions Setup
d3.csv("Data/yelpdata.csv", function (error, data) {
    lasvegasdata = data.filter(data => data.city.includes("Las Vegas"))
    charlottedata = data.filter(data => data.city.includes("Charlotte"))
    torontodata = data.filter(data => data.city.includes("Toronto"))
    phoenixdata = data.filter(data => data.city.includes("Phoenix"))
    data = lasvegasdata.concat(charlottedata, torontodata, phoenixdata)
    console.log(data.length)
    data = data
    // Markers Variables
    var onestar_markers = []
    var twostar_markers = []
    var threestar_markers = []
    var fourstar_markers = []
    var fivestar_markers = []

    // Icons Objects
    onestar_icon =  L.ExtraMarkers.icon({
        icon: "ion-fork",
        iconColor: "red",
        markerColor: "red",
        shape: "circle",
        iconSize: [60, 60]
    });
    twostar_icon =  L.ExtraMarkers.icon({
        icon: "ion-fork",
        iconColor: "orange",
        markerColor: "orange",
        shape: "circle",
        iconSize: [60, 60]
    });
    threestar_icon = L.ExtraMarkers.icon({
        icon: "ion-fork",
        iconColor: "yellow",
        markerColor: "yellow",
        shape: "circle",
        iconSize: [60, 60]
    });
    fourstar_icon = L.ExtraMarkers.icon({
        icon: "ion-fork",
        iconColor: "green",
        markerColor: "green",
        shape: "circle",
        iconSize: [60, 60]
      });
    fivestar_icon = L.ExtraMarkers.icon({
        icon: "ion-fork",
        iconColor: "blue",
        markerColor: "blue",
        shape: "circle",
        iconSize: [60, 60]
    });

//   function to loop through ratings
    data.forEach(data => {
        if (data.stars >= 1 & data.stars < 2){
            var newMarker = L.marker([data.latitude, data.longitude], {
                icon: onestar_icon
            })
            .bindPopup("");
            onestar_markers.push(newMarker)
        }
        else if (data.stars >= 2 & data.stars < 3){
            var newMarker = L.marker([data.latitude, data.longitude], {
                icon: twostar_icon
            })
            .bindPopup("Gordon Ramsey would be furious!");
            twostar_markers.push(newMarker)
        }
        else if (data.stars >= 3 & data.stars < 4){
            var newMarker = L.marker([data.latitude, data.longitude], {
                icon: threestar_icon
            })
            .bindPopup("");
            threestar_markers.push(newMarker)
        }
        else if (data.stars >= 4 & data.stars < 5){
            var newMarker = L.marker([data.latitude, data.longitude], {
                icon: fourstar_icon
            }) 
            .bindPopup("Gordon Ramsey Approves!");
            fourstar_markers.push(newMarker)
        }
        else if (data.stars >= 5){
            var newMarker = L.marker([data.latitude, data.longitude], {
                icon: fivestar_icon
            })
            .bindPopup("")
            fivestar_markers.push(newMarker)
        }
    }); 

    
    // Create a layer group made from the bike markers array, pass it into the createMap function
    onestar_layer = L.layerGroup(onestar_markers.slice(50,500));
    twostar_layer = L.layerGroup(twostar_markers.slice(50,500));
    threestar_layer = L.layerGroup(threestar_markers.slice(50,500));
    fourstar_layer = L.layerGroup(fourstar_markers.slice(50,500));
    fivestar_layer = L.layerGroup(fivestar_markers.slice(50,500));


    var streetsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    });
        // Add Dark Visual Mode option
        var darklayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
    });     
    
    var baseMaps = {
        "Streets Map": streetsMap,
        "Dark Mode" : darklayer
    };

    // Define OverlayMaps
    var overlayMaps = {
        "One Star Restaurants": onestar_layer,
        "Two Star Restaurants": twostar_layer,
        "Three Star Restaurants": threestar_layer,
        "Four Star Restaurants": fourstar_layer,
        "Five Star Restaurants": fivestar_layer
    };

    // Create Map
    var myMap = L.map("map", {
        center: [41.5,-99.9], // t20
        zoom: 4,
        layers: [
            streetsMap,
            darklayer, 
            onestar_layer,
            twostar_layer,
            threestar_layer,
            fourstar_layer,
            fivestar_layer
        ]
    });

    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

    // Set Up Legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"), 
        starsrating = [1, 2, 3, 4, 5];

        div.innerHTML += "<h3>Ratings</h3>"

        for (var i = 1; i < starsrating.length; i++) {
            div.innerHTML +=
                '<i style="background: ' + chooseColor(starsrating[i] + 1) + '"></i> ' +
                starsrating[i] + (starsrating[i + 1] ? '&ndash;' + starsrating[i + 1] + '<br>' : '+');
        }
        return div;
    };
    // Add Legend to the Map
    legend.addTo(myMap);

 
});