

//vars
_BaseURI = "https://www.worldtides.info/api";
_BaseURIWeather = "https://api.weatherbit.io/v2.0/current"
key = "76e8ecdc-2892-48b4-b3b7-26ae35c9a588";
keyWeather = "af7bc3a3a3054dcc85167f4a2fb5ba93";
lat = "51.233299";
lon = "2.9333";
urlHeights = _BaseURI + "?Heights&lat=" + lat + "&lon=" + lon + "&key=" + key;
urlWeather = _BaseURIWeather + "?lat=" + lat + "&lon=" + lon + "&key=" + keyWeather;
const heightsArray = [];
const heightsDateArray = [];
console.log(urlHeights);
console.log(urlWeather);
fahrOrCel = true;
temp = 0;
feel_like_temp = 0;



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

            temp = data['temp'];
            feel_like_temp = data['app_temp'];


            city_name.innerText = data['city_name'];
            city_temp.innerText = data['temp'] + "°C";
            feels_like.innerText = data["app_temp"] + "°C";
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
            },
            legend: {
                display: false
            },
            bezierCurve: true
        }
    });
};



function LoaderAnimation() {
    setTimeout(function () {
        window.scrollTo(0, 0);

        gsap.to(".c-app-loader", {opacity : 0, duration : 1});
        gsap.to(".c-app", {opacity : 1, duration : 1});
        gsap.to(".c-app-loader", {display : "none", duration : 1.5});

    }, 1000);



};

function AnimationFahr(){
    var loader_div= document.getElementById("div-loader");
    var c_app = document.getElementsByClassName('c-app')[0];
    if (loader_div.style.opacity == 0){
        loader_div.style.opacity = 1;
        c_app.style.opacity = 0;
    }
    if(loader_div.style.display == "none"){
        loader_div.style.display = "block";
    }
    setTimeout(function () {
        window.scrollTo(0, 0);

        gsap.to(".c-app-loader", {opacity : 0, duration : 1});
        gsap.to(".c-app", {opacity : 1, duration : 1});
        gsap.to(".c-app-loader", {display : "none", duration : 2});

    }, 1000);
}




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

function ConvertCelToFahr(cel){


    if (cel.innerText == "Celcius"){
        // vars
        flt = document.getElementById("feels-like-temp");

        //feels like temperature
        flsFahr = (feel_like_temp * 1.8) + 32;
        fltTotal = Math.round(flsFahr * 100) / 100 ;
        flt.innerText = fltTotal + "°F";
        feel_like_temp = flsFahr;


        //normal temperature
        Fahr = (temp * 1.8) + 32;
        total = Math.round(Fahr * 100) / 100 ;
        city_temp.innerText = total + "°F";
        cel.innerText = "Fahrenheit";
        temp = Fahr;


        AnimationFahr();

    }else if (cel.innerText == "Fahrenheit"){
        flt = document.getElementById("feels-like-temp");

        //feels like temperature
        flsCels = (feel_like_temp - 32) / 1.8;
        flsTotal = Math.round(flsCels * 100) / 100;
        flt.innerText = flsTotal + "°C";
        feel_like_temp = flsCels;



        //normal temperature
        Cels = (temp - 32) / 1.8;
        total = Math.round(Cels * 100) / 100;
        city_temp.innerText = total + "°C";
        cel.innerText = "Celcius";
        temp = Cels;

        AnimationFahr();

    }


}



getWeatherData();

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');

    loadChart();
});

window.onbeforeunload = function () {
    window.scrollTo(0, 00);
  }
document.onload = LoaderAnimation();


