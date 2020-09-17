// Call Data and Start Functions Setup
d3.csv("Data/yelpdata.csv", function (error, data) {
    lasvegasdata = data.filter(data => data.city.includes("Las Vegas"))
    charlottedata = data.filter(data => data.city.includes("Charlotte"))
    torontodata = data.filter(data => data.city.includes("Toronto"))
    phoenixdata = data.filter(data => data.city.includes("Phoenix"))
    data = lasvegasdata.concat(charlottedata, torontodata, phoenixdata)
    console.log(data.length)

    // Markers Variables
    var onestar_markers = []
    var twostar_markers = []
    var threestar_markers = []
    var fourstar_markers = []
    var fivestar_markers = []

    // var foodicon = L.icon({
    //     iconUrl: "icon.svg",
    //     iconSize: [38, 95],
    //     iconAnchor: [data.latitude, data.longitude]
    // })




//   function to loop through ratings
    data.forEach(data => {
        if (data.stars >= 1 & data.stars < 2){
            var newMarker = L.marker([data.latitude, data.longitude])
            .bindPopup("");
            onestar_markers.push(newMarker)
        }
        else if (data.stars >= 2 & data.stars < 3){
            var foodicon = helper.getIcon(
                {icon: 'coffee',
                markerColor: 'red'}
            );
            var newMarker = L.marker([data.latitude, data.longitude],
                {icon: foodicon}).addTo(myMap)
                .bindPopup("Gordon Ramsey would be furious!");
            twostar_markers.push(newMarker)
        }
        else if (data.stars >= 3 & data.stars < 4){
            var newMarker = L.marker([data.latitude, data.longitude])
            .bindPopup("");
            threestar_markers.push(newMarker)
        }
        else if (data.stars >= 4 & data.stars < 5){
            var newMarker = L.marker([data.latitude, data.longitude])
            .bindPopup("Gordon Ramsey Approves!");
            fourstar_markers.push(newMarker)
        }
        else if (data.stars >= 5){
            var newMarker = L.marker([data.latitude, data.longitude])
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

 
});