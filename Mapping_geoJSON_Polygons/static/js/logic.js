// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
});

// Create dark view tile layer that will be an option for our map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
  
    accessToken: API_KEY
});


// Create a base layer that holds both maps
let baseMaps = {
    Light: light,
    Dark: dark
};

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/bedwardssmith/Mapping_Earthquakes_New/Mapping_GeoJSON_Linestrings/Mapping_GeoSJON_Linestrings/torontoRoutes.json";


// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [44, -80.0],
    zoom: 2
});

// Pass the map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Then we add our 'graymap' tile layer to the map.
light.addTo(map);

// Create a style for the lines,
let myStyle = {
    color: "#ffffa1",
        weight: 2
        }


// Grabbing our GeoJSON data.
d3.json(torontoData).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style:myStyle,
        onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");
                }
})
    .addTo(map);
});