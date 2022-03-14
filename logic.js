var query = "https://api.openweathermap.org/data/2.5/weather?q="
var apikey = "&appid=a35536613023136e4915b74f3f80575a"
var cityElement = document.querySelector("#city")
var buttonElement = document.querySelector('#btn')

var findWeather2 = function() {
    var city1 = cityElement.value;
    var url2 = query + city1 + apikey;
    fetch(url2)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    useOneCall2(data)
                })
        })
}

var useOneCall2 = function (cityData2) {
    var cityLat2 = cityData2.coord.lat
    var cityLon2 = cityData2.coord.lon
    var oneCall2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat2 + "&lon=" + cityLon2 + "&exclude=alerts,minutely,hourly" + apikey
    fetch(oneCall2)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    var morning1 = Math.round(((data.daily[0].feels_like.morn-273.15)*1.8)+32)
                    var day1 = Math.round(((data.daily[0].feels_like.day-273.15)*1.8)+32)
                    var night1 = Math.round(((data.daily[0].feels_like.night-273.15)*1.8)+32)
                    if (morning1 < 32 && day1 < 32 && night1 < 32) {

                    }
                    if (morning1 > 32 && morning1 < 50 && day1 < 60 && night1 < 50) {
                        
                    }
                    if (morning1 > 50 && morning1 < 70 && day1 < 70 && night1 < 32) {

                    }
                    if (morning1 > 70 && day1 < 32 && night1 < 32) {}
                });
        })   
}

buttonElement.addEventListener('click', function () {
    findWeather2();
});