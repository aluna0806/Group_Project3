// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    var Cities = ["Toronto", "Charlotte", "Las Vegas", "Phoenix"]
    Cities.forEach(function(mycity) {
        dropdown.append("option").text(mycity).property("value", mycity);
    });
    getPlot("Toronto")
    getInfo("Toronto")
}

init();

// Creating function for Data plotting 
function getPlot(mycity) {
    // console.log(mycity)
    // read the data 
    d3.json("Data/Yelp_CitiesCount3.json").then((data)=> {
        console.log(data)

        // // get the city data to the dropdwown menu
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
            xaxis: { title: "Cuisine Type" },
            yaxis: { title: "Number of Restaurants" }
        };
        
        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data, layout);
            });

};

// Create the function to get the necessary data for the City Info
function getInfo(mycity) {
    // read the json file to get data
    d3.json("Data/Yelp_CityFacts.json").then((data) => {
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

// create the function for the change event
function optionChanged(mycity) {
    getPlot(mycity);
    getInfo(mycity);
}
