document.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');

    loadChart();





});

//vars
_BaseURI = "https://www.worldtides.info/api";
_BaseURIWeather = "http://api.weatherbit.io/v2.0/current"
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
            console.log(data);



        })
        .catch(function () {

        });
}



//Get tides data
function getTidesData() {
    // fetch(urlHeights)
    //     .then((resp) => resp.json()) //transform into json
    //     .then(function (result) {
    //         heights = result['heights'];
    //         //show first 15
    //         heights = heights.slice(1, 16);

    //         // for loop
    //         for (i in heights) {
    //             //console.log();
    //             heightsArray.push(heights[i]["height"]);

    //             const newdate = convertTimestamp(heights[i]["dt"]);
    //             heightsDateArray.push(newdate);
    //         }



    //     })
    //     .catch(function () {

    //     });
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
                borderColor: 'rgb(255, 99, 132)',
                data: heightsArray
            }]
        },

        // Configuration options go here
        options: {}
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










