// Add console.log to check to see if our code is working.
console.log("working");


// We create the tile layer that will be the background of our map.
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
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
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass the map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/bedwardssmith/Mapping_Earthquakes_New/main/majorAirports.json";

// Grabbing our GeoJSON data
d3.json(airportData).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h2>Airport Nme:" + feature.properties.name + "</h2><h3>AirprtCode:" + feature.properties.faa + "</h2>");
        }
    }).addTo(map);
});