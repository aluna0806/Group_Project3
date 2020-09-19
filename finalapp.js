// Define URLs for pulling in data from mongodb
var barURL = "http://localhost:5000/api/yelp_Citiescount"
var cityURL = "http://localhost:5000/api/city_facts"
var visMap = "http://localhost:5000/api/city_cuisine"

// create the function for the initial data rendering
function init() {   
        // Select dropdown menu 
        var dropdown = d3.select("#selDataset");
        var Cities = ["Toronto", "Charlotte", "Las Vegas", "Phoenix"]
        Cities.forEach((mycity) => {
            dropdown.append("option").text(mycity).property("value", mycity);
        });
    
        getPlot("Toronto")
        getInfo("Toronto")
        getMap("Toronto")

};

init();

// Creating function for Data plotting 
function getPlot(mycity) {
    // console.log(mycity)
    // read the data 
    d3.json(barURL).then((data) => {
        console.log(data)

        // get the city data to the dropdwown menu
        var FilteredData = data.filter(filtercity => filtercity.city == mycity)
        
        //Create bar plot
        var Cuisines = FilteredData.map(data => data.categories)
        console.log(Cuisines)

        var CuisCount = FilteredData.map(data => data.business_id)
        console.log(CuisCount)

        var CityName = FilteredData.map(data => data.city)
        console.log(CityName)
        
        // Create the Trace
        var trace1 = {
            x: Cuisines,
            y: CuisCount,
            type: "bar"
        };
        
        // Create the data array for the plot
        var data = [trace1];
        
        // Define the plot layout
        var layout = {
            title: "Top Restaurants by Type",
            //xaxis: { title: "Cuisine Type" },
            yaxis: { title: "Number of Restaurants" },
            hoverBackgroundColor: "red"
        };
        
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);
            });

};

// Create the function to get the necessary data for the City Info
function getInfo(mycity) {
    // read the json file to get data
    d3.json(cityURL).then((data) => {
        console.log(data)

        // get the metadata info for the City Info
        var citydata = data.filter(filtercity => filtercity.City == mycity);
        console.log(citydata)

        // select city to put data in field
        var CityInfo = d3.select("#city-info");
        
        // empty the city info each time before getting new city info
        CityInfo.html("");

        // // grab the necessary city data for each city and append the info to the panel
        Object.entries(citydata[0]).forEach((key) => {   
        CityInfo.append("h5").text(key[0] + ": " + key[1]);
        })   
    });
};

// Create the function to create the map below the bar chart
function getMap(mycity) {
    d3.json(visMap).then((data) => {
    console.log(data)

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

        // Create function to loop through ratings
        data.forEach(data => {
            if (data.stars >= 1 & data.stars < 2){
                var newMarker = L.marker([data.latitude, data.longitude], {
                    icon: onestar_icon
                })
                //.bindPopup("");
                onestar_markers.push(newMarker)
            }
            else if (data.stars >= 2 & data.stars < 3){
                var newMarker = L.marker([data.latitude, data.longitude], {
                    icon: twostar_icon
                })
                //.bindPopup("Gordon Ramsey would be furious!");
                twostar_markers.push(newMarker)
            }
            else if (data.stars >= 3 & data.stars < 4){
                var newMarker = L.marker([data.latitude, data.longitude], {
                    icon: threestar_icon
                })
                //.bindPopup("");
                threestar_markers.push(newMarker)
            }
            else if (data.stars >= 4 & data.stars < 5){
                var newMarker = L.marker([data.latitude, data.longitude], {
                    icon: fourstar_icon
                }) 
                //.bindPopup("Gordon Ramsey Approves!");
                fourstar_markers.push(newMarker)
            }
            else if (data.stars >= 5){
                var newMarker = L.marker([data.latitude, data.longitude], {
                    icon: fivestar_icon
                })
                //.bindPopup("")
                fivestar_markers.push(newMarker)
            }
            // Bind a popup to the marker that will  display on click. This will be rendered as HTML
            newMarker.bindPopup(data.name + "<br> Cuisine Type: " + data.categories + "<br> Rating: " + data.stars);
        }); 

        
        // Create a layer group made from the ratings markers array, pass it into the createMap function
        onestar_layer = L.layerGroup(onestar_markers.slice(0,10000));
        twostar_layer = L.layerGroup(twostar_markers.slice(0,10000));
        threestar_layer = L.layerGroup(threestar_markers.slice(0,10000));
        fourstar_layer = L.layerGroup(fourstar_markers.slice(0,10000));
        fivestar_layer = L.layerGroup(fivestar_markers.slice(0,10000));

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
            center: [43.65,-79.38], // t20
            zoom: 10,
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

        // // Reset map center based on city selection
        // var mapcenter = data.filter(filtercity => filtercity.City == mycity);
        // //console.log(mapcenter)

        // var CordToronto = [43.65, -79.38]
        // var CordCharlotte = [35.22, -80.84]
        // var CordLasVegas = [36.16, -115.13]
        // var CordPhoenix = [33.44, -112.07]

        // var mapToronto = mapcenter.map(CordToronto)
        // console.log(mapToronto)

        //map.setView(new L.LatLng([Cities.mapToronto, Cities.mapCharlotte, Cities.mapLasVegas, Cities.mapPhoenix]), 10);

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
};

// create the function for the change event
function optionChanged(mycity) {
    getPlot(mycity);
    getInfo(mycity);
    //getMap(mycity);
}
