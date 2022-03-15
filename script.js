var cityEl = document.querySelector("#city")
var zodiacEl = document.querySelector("#zodiac-sign")
var zodiacResultsEl = document.querySelector("#zodiac-results")
var weatherEl = document.querySelector("#city-text")
var weatherResultsEl = document.querySelector("#weather-results")
var openingEl = document.querySelector(".opening")
var resultsEl = document.querySelector(".results")


var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&appid=a35536613023136e4915b74f3f80575a"
var findWeather = function() {
    var city = cityEl.value;
    var cityText = document.createElement("h2")
    cityText.classList.add("title", "is-1", "has-text-white")
    cityText.innerHTML = city
    weatherEl.append(cityText);
    var url = queryUrl + city + apiKey;
    fetch(url)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    useOneCall(data)
                })
        })
}

var useOneCall = function (cityData) {
    var cityLat = cityData.coord.lat
    var cityLon = cityData.coord.lon
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=alerts,minutely,hourly" + apiKey
    fetch(oneCall)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    getBackground(data.daily[0].weather[0].icon)
                    var morningText = document.createElement("p");
                    var morning = Math.round(((data.daily[0].feels_like.morn-273.15)*1.8)+32);
                    morningText.innerHTML = "<u>Morning feels like:</u> <strong>" + morning +"</strong>°F";
                    morningText.classList.add("is-size-2", "my-3")
                    weatherResultsEl.append(morningText)
                    var dayText = document.createElement("p")
                    var day = Math.round(((data.daily[0].feels_like.day-273.15)*1.8)+32)
                    dayText.innerHTML = "<u>Daytime feels like:</u> <strong>" + day +"</strong>°F";
                    dayText.classList.add("is-size-2", "my-3")
                    weatherResultsEl.append(dayText)
                    var nightText = document.createElement("p")
                    var night = Math.round(((data.daily[0].feels_like.night-273.15)*1.8)+32)
                    nightText.innerHTML = "<u>Night feels like:</u> <strong>" + night +"</strong>°F";
                    nightText.classList.add("is-size-2", "my-3")
                    weatherResultsEl.append(nightText)
                });
        })   
}

var selectEl = document.querySelector('#selection');
var buttonEl = document.querySelector('#btn')

var buildResults = function() {
    var sign = selectEl.value;
    openingEl.classList.add("none")
    resultsEl.classList.remove("none")
    var signText = document.createElement("h2")
    signText.classList.add("title", "is-1", "has-text-white")
    signText.innerHTML = sign
    zodiacEl.append(signText)
}

var zodiacResults = function() {
    var sign = selectEl.value;
    const URL = 'https://aztro.sameerkumar.website/?sign=' + sign + '&day=today';
    fetch(URL, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var zodiacDesc = document.createElement("p");
            zodiacDesc.innerHTML = "<u>Daily Horoscope:</u> <strong>" + data.description + "</strong>";
            zodiacDesc.classList.add("is-size-3", "my-3");
            zodiacResultsEl.append(zodiacDesc);
            var zodiacMood = document.createElement("a");
            zodiacMood.innerHTML = "<u>Mood:</u> <strong>" + data.mood + "</strong>";
            zodiacMood.classList.add("is-size-2", "my-3");
            fetch("https://spotify23.p.rapidapi.com/playlist_tracks/?id=0ZST95FVIe0YCQ9fjMS7Ow&offset=0&limit=100", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "spotify23.p.rapidapi.com",
                        "x-rapidapi-key": "3316d853b8msh8a70d2564ae8afdp175191jsn7f8129692ba4"
                    }
            })
            .then(response => {
                console.log(response);
                if (response.ok)
                response.json().then(function(data) {
                    console.log(data)
                    var song = data.items[1].track.external_urls.spotify
                    zodiacMood.setAttribute("href", song)
                    })
            });
            zodiacResultsEl.append(zodiacMood);
            var zodiacNum = document.createElement("p");
            zodiacNum.innerHTML = "<u>Lucky Number:</u> <strong>" + data.lucky_number + "</strong>";
            zodiacNum.classList.add("is-size-2", "my-3");
            zodiacResultsEl.append(zodiacNum);
            var zodiacTime = document.createElement("p");
            zodiacTime.innerHTML = "<u>Lucky Time:</u> <strong>" + data.lucky_time + "</strong>";
            zodiacTime.classList.add("is-size-2", "my-3");
            zodiacResultsEl.append(zodiacTime);
            var color = data.color;
            if (color === "Peach") {
                color = "peachpuff";
                zodiacEl.style.backgroundColor = color
            };
            if (color === "Sky Blue") {
                color = "skyblue";
                zodiacEl.style.backgroundColor = color
            };
            if (color === "Spring Green") {
                color = "springgreen";
                zodiacEl.style.backgroundColor = color
            };
            if (color === "Shadow Black") {
                color = "black";
                zodiacEl.style.backgroundColor = color
            };
            if (color === "Rose Pink") {
                color = "pink";
                zodiacEl.style.backgroundColor = color
            };
            zodiacEl.style.backgroundColor = color
        });
};

var getBackground = function(background) {
    weatherEl.classList.remove("clear", "light-cloud", "cloudy", "rainy", "thunder", "snowy", "mist")
    console.log(background)
    if (background === "01d" || background === "01n") {
        weatherEl.classList.add("clear")
    }
    else if (background === "02d" || background === "02n") {
        weatherEl.classList.add("light-cloud")
    }
    else if (background === "03d" || background === "03n" || background === "04d" || background === "04n") {
        weatherEl.classList.add("cloudy")
    }
    else if (background === "09d" || background === "09n" || background === "10d" || background === "10n") {
        weatherEl.classList.add("rainy")
    }
    else if (background === "11d" || background === "11n") {
        weatherEl.classList.add("thunder")
    }
    else if (background === "13d" || background === "13n") {
        weatherEl.classList.add("snowy")
    }
    else if (background === "50d" || background === "50n") {
        weatherEl.classList.add("mist")
    }
    
}


buttonEl.addEventListener('click', function () {
    findWeather();
    buildResults();
    zodiacResults();
});