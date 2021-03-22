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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "SatelliteStreets": satelliteStreets
};

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/bedwardssmith/Mapping_Earthquakes_New/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";


// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers:[satelliteStreets]
});

// Pass the map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Then we add our 'graymap' tile layer to the map.
//light.addTo(map);

// Create a style for the lines,
let myStyle = {
    color: "blue",
        weight: 3
        }


// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: myStyle
    })
            .addTo(map);
    });