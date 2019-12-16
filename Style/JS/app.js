

//vars
_BaseURI = "https://www.worldtides.info/api";
_BaseURIWeather = "https://api.weatherbit.io/v2.0/current"
key = "1273973a-fcc6-4a13-85d8-e2cb0f7ca880";
keyWeather = "af7bc3a3a3054dcc85167f4a2fb5ba93";
lat = "51.233299";
lon = "2.9333";
urlHeights = _BaseURI + "?Heights&lat=" + lat + "&lon=" + lon + "&key=" + key;
urlWeather = _BaseURIWeather + "?lat=" + lat + "&lon=" + lon + "&key=" + keyWeather;
const heightsArray = [];
const heightsDateArray = [];
console.log(urlHeights);
console.log(urlWeather);





//get weather data
function getWeatherData() {
    fetch(urlWeather)
        .then((resp) => resp.json()) //transform into json
        .then(function (result) {
            data = result['data'][0];
            //vars
            city_name = document.getElementById("c-app-name-city");
            city_temp = document.getElementById("temperature");
            city_temp_desc = document.getElementById("temperature-desc");
            wind_arrow = document.getElementById("svg-arrow-wind")
            wind_direcition = document.getElementById("wind-direction");
            feels_like = document.getElementById("feels-like-temp");
            sunrise = document.getElementById("sunrise-time");
            sunset = document.getElementById("sunset-time");
            wind_speed = document.getElementById("wind-speed");
            pressure = document.getElementById("pressure");
            sea_level_pressure = document.getElementById("sea-level-pressure");
            clouds = document.getElementById("clouds");
            visibilty = document.getElementById("visibilty");
            humidity = document.getElementById("humidity");


            city_name.innerText = data['city_name'];
            city_temp.innerText = data['temp'] + "°";
            feels_like.innerText = data["app_temp"];
            city_temp_desc.innerText = data['weather']["description"];
            //rotate with wind direction
            wind_arrow.setAttribute("transform", "rotate(" + data["wind_dir"] + ")");
            wind_direcition.innerText = data["wind_cdir_full"];
            wind_speed.innerText = data["wind_spd"] + " m/s";
            //sunset and sunsrise
            sunrise.innerText = data["sunrise"];
            sunset.innerText = data["sunset"];

            //details
            pressure.innerText = data["pres"] + " mb";
            sea_level_pressure.innerText = data["slp"] + " mb";
            clouds.innerText = data["clouds"] + " %";
            visibilty.innerText = data["vis"] + " km";
            humidity.innerText = data["rh"] + " %";




        })
        .catch(function () {

        });
}



//Get tides data
async function getTidesData() {
    
    await fetch(urlHeights)
        .then((resp) => resp.json()) //transform into json
        .then(function (result) {
            heights = result['heights'];
            //show first 15
            heights = heights.slice(1, 16);

            // for loop
            for (i in heights) {
                //console.log();
                heightsArray.push(heights[i]["height"]);

                const newdate = convertTimestamp(heights[i]["dt"]);
                heightsDateArray.push(newdate);
            }



        })
        .catch(function () {

        });
}


async function loadChart() {
    await getTidesData();
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: heightsDateArray,
            datasets: [{
                label: 'Height Meter',
                backgroundColor: '#0080E0',
                data: heightsArray
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false
                        }
                    }
                ]
            }
        }
    });
};








function convertTimestamp(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}



getWeatherData();

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');

    loadChart();





});



