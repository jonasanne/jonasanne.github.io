document.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');
  });
  _BaseURI = "https://www.worldtides.info/api";
  key = "5f05b91b-21ff-4243-b908-2f043485d401";
  lat = "51.233299";
  lon = "2.9333";
  //urlHeights = _BaseURI + "?Heights&lat=" + lat + "&lon=" + lon + "&key=" + key;

  testurl = "";

function GetDate(){
     

    fetch(testurl)

    .then((resp) => resp.json()) //transform into json
    .then(function(result){
        console.log(result);
    })
    .catch(function(){

    })
}

GetDate()


