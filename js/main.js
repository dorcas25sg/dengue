//Leaflet setup
var map = L.map('map', {
  center: [1.3521,103.8198],
  zoom: 12,
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//Data
var dataset = "https://raw.githubusercontent.com/dorcas25sg/denguemidtern/master/map.geojson";
var featureGroup;
var cluster;
var breedingHab;

//set mosquito icon
var myIcon = L.icon({
    iconUrl: 'mosquito.png',
    iconSize: [50, 50],
    iconAnchor:[20, 40],
    popupAnchor: [0, -30]
 });

//hide previous slide initially
 $('.previous').hide();

//How the polygons will appear
var myStyle = function(feature) {
  if (feature["properties"]["name"]==="Dengue_Cluster") {
  return {color: '#00ff00'};
} else if (feature["properties"]["name"]==="Aedes Mosquito Breeding Habitats : 1" || feature["properties"]["name"]==="Aedes Mosquito Breeding Habitats : 2" || feature["properties"]["name"]=== "Aedes Mosquito Breeding Habitats : 3" || feature["properties"]["name"]=== "Aedes Mosquito Breeding Habitats : 4") {
  return {color: '#FCA6A9'};
} else if (feature["properties"]["name"]==="No. of Dengue Cases : 1" || feature["properties"]["name"]==="No. of Dengue Cases : 2" ) {
  return {color: '#0000ff'};
} else {
  return {colors: '#ff00ff'};
}
};

//Sidebar info change when clicked
var showResults = function() {
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

//when clicking on a polygon. note: map gets stuck when moving between a clicked polygon an the 'cases' slides, have to click on the map for it to load
var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    var newTitle = layer["feature"]["properties"]["name"].replace(/_/g, ' '); //gets the name and replaces '_' with ' '
     $( ".para-replace" ).text(newTitle);

     var explained;
     if (newTitle === "Dengue Cluster" ) {
       explained = " 'Operationally, a dengue cluster indicates a locality with active transmission where intervention is targeted.  It is formed when two or more cases have onset within 14 days and are located within 150m of each other (based on residential and workplace addresses as well as movement history).' (Source: Dengue.gov.sg)" ;
     } else {
       explained = "As reported to the National Environmental Agency (NEA) of Singapore";
     }

     $( ".link-replace" ).text(explained);
     //Just for reference: to get the centriod of each polygoon: var centriod = layer.getBounds().getCenter();
     var bounds = event.target.getBounds();
     map.fitBounds(bounds, {padding: [50,50]});
    console.log(layer.feature);
    showResults();
  });
};

var closeResults = function() {
  // => <div id="results">
  $('#results').hide();
  // => <div id="intro" css="display: none">
  $('#intro').show();
};

  $( ".reset" ).click(function() {
    closeResults();
    map.fitBounds(featureGroup.getBounds());
  });

  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      featureGroup = L.geoJson(parsedData, {style: myStyle}).addTo(map); //all polygons

      var cluster = L.geoJson(parsedData, { //only 'dengue cluster' polygons
          style: myStyle,
          filter: function(feature) {
              return feature.properties.name ==="Dengue_Cluster";
          }});

      var breedingHab = L.geoJson(parsedData, { //only 'breeding habitats' polygons
          style: myStyle,
          filter: function(feature) {
              return feature.properties.name === "Aedes Mosquito Breeding Habitats : 1" || feature.properties.name === "Aedes Mosquito Breeding Habitats : 2" || feature.properties.name === "Aedes Mosquito Breeding Habitats : 3" || feature.properties.name === "Aedes Mosquito Breeding Habitats : 4";
          }});

      var dCases = L.geoJson(parsedData, { //only 'cases' polygons
          style: myStyle,
          filter: function(feature) {
              return feature.properties.name === "No. of Dengue Cases : 1" || feature.properties.name ==="No. of Dengue Cases : 2";
          }});

      var buttons = function (num) {
        // Reset Map
        closeResults();
        //map.fitBounds(featureGroup.getBounds());

        //clear map of layers, except for base map
        map.eachLayer(function (layer) {
         if (layer != Stamen_TonerLite) {
           map.removeLayer(layer);
         }
           });

        //For tracking purposes on console
        console.log(num, state["slideData"][num]["description"]);

        //Replace text according to slides
        $( ".title-replace" ).text(state["slideData"][num]["name"]);
        $( ".para-replace" ).text(state["slideData"][num]["description"]);

        //add layers according to slides
        if (num===1) {
          cluster.addTo(map);
          cluster.eachLayer(eachFeatureFunction);
        } else if (num===2) {
          breedingHab.addTo(map);
          breedingHab.eachLayer(eachFeatureFunction);
        } else if (num===3) {
          dCases.addTo(map);
          dCases.eachLayer(eachFeatureFunction);
          $('.legend').show();
        } else if (num===4) {
          L.marker([1.332623, 103.906605],{icon: myIcon}).addTo(map).bindPopup('<a href="http://www.straitstimes.com/singapore/79-year-old-man-dies-of-dengue-the-fifth-dengue-related-death-this-year" target="_blank"> "Jalan Tenaga" </a>').openPopup();
          $('.legend').hide();
          map.setView([1.332623, 103.906605], 15);
          $( ".link-replace" ).text("Click on the pop-up to read the full article");
        } else if (num===5) {
          L.marker([1.336130, 103.868382],{icon: myIcon}).addTo(map).bindPopup('<a href="http://www.straitstimes.com/singapore/health/death-of-11-year-old-from-dengue-is-rare-experts" target="_blank"> "Woodleigh Close" </a>').openPopup();
          $('.legend').hide();
          map.setView([1.336130, 103.868382], 15);
          $( ".link-replace" ).text("Click on the pop-up to read the full article");
        } else if (num===6) {
          L.marker([1.439891, 103.780719],{icon: myIcon}).addTo(map).bindPopup('<a href="http://www.channelnewsasia.com/news/singapore/man-47-dies-from-dengue/2453410.html" target="_blank"> "Marsiling Rise" </a>').openPopup();
          map.setView([1.439891, 103.780719], 15);
          $('.legend').hide();
          $( ".link-replace" ).text("Click on the pop-up to read the full article");
        } else { //for intro(technncally slide 0) and final slide (slide 9)
          featureGroup.addTo(map);
          featureGroup.eachLayer(eachFeatureFunction);
          map.fitBounds(featureGroup.getBounds());
          $('.legend').show();
          $( ".link-replace" ).text("Credits: Data points taken from Data.gov.sg");
        }
      };

      //Next button: how do I get it to hide on last slide rather than click one more time?
      $( ".next" ).click(function() {
        $('.previous').show();
        if (state.slideNumber<(state.slideData.length-2)) {
        nextNum = ++state.slideNumber; //++i
        buttons (nextNum);
        }
        else {
        buttons (state.slideData.length-1);
         $('.next').hide();
       }
      });

      $( ".previous" ).click(function() {
        if (state.slideNumber>1) {
        $('.next').show();
        prevNum = --state.slideNumber; //--i
        buttons (prevNum);
        }
        else {
        buttons (0);
         $('.previous').hide();
       }
      });

      // quite similar to _.each
      featureGroup.eachLayer(eachFeatureFunction);
    });
  });
