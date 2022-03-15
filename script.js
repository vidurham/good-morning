var cityEl = document.querySelector("#city")
var zodiacEl = document.querySelector("#zodiac-sign")
var zodiacResultsEl = document.querySelector("#zodiac-results")
var weatherEl = document.querySelector("#city-text")
var weatherResultsEl = document.querySelector("#weather-results")
var openingEl = document.querySelector(".opening")
var resultsEl = document.querySelector(".results")
var outlookEl = document.querySelector(".outlook")
var selectEl = document.querySelector('#selection');
var buttonEl = document.querySelector('#btn')
var outlookBtn = document.querySelector("#daily-btn")
var dailyOutlookEl = document.querySelector("#daily-outlook")
var quizzesEl = document.querySelector("#daily-quizzes")


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
                    

                    var dailyOutlook = document.createElement('h1')
                    var morningOutlook =document.createElement("p")
                    var dayOutlook = document.createElement("p")
                    var nightOutlook = document.createElement("p")
                    var city = cityEl.value;
                    dailyOutlook.innerHTML = "Daily Outlook for " + city
                    
                    if (morning < 32) {
                        morningOutlook.innerHTML = "Well, it's going to be a cold one this morning, dropping below freezing. Don't forget to bring a coat or heavy jacket with you before leaving! "
                    }
                    if (morning > 32 && morning < 50) {
                        morningOutlook.innerHTML = "A bit nippy out this morning! Probably a great day for a long sleeve shirt, but who knows! "
                    }
                    if (morning > 50 && morning < 70) {
                        morningOutlook.innerHTML = "Feeling good out there this morning, looking like a single layer day. "
                    }
                    if (morning > 70) {
                        morningOutlook.innerHTML = "Things are heating up this morning! Could be quite a hot one today. "
                    }
                    if (day < 32) {
                        dayOutlook.innerHTML = "It's freezing cold outside, so you may as well avoid it if you can. If you must go out, please dress warm and appropriately. "
                    }
                    if (day > 32 && day < 50) {
                        dayOutlook.innerHTML = "It's gonna be a brisk one out there today! Have a jacket or sweatshirt on standby so you don't get caught lacking today. "
                    }
                    if (day > 50 && day < 65) {
                        dayOutlook.innerHTML = "Decent day, great for a long sleeve, light jacket or even just a t-shirt, if your feeling a little bold in the slightly above cold. "
                    }
                    if (day > 65 && day < 80) {
                        dayOutlook.innerHTML = "My favorite meteorologist saying 'It's gonna heat up a little bit out there over the course of the day, so stay hydrated and find something fun to do'"
                    }
                    if (day > 80) {
                        dayOutlook.innerHTML = "It's feeling hot hot hot during the day today. Cool refreshments and good times are hopefully on deck for you. "
                    }
                    if (night < 32) {
                        nightOutlook.innerHTML = "Cozy up next to a warm fire, grab a nice novel or put on a good movie, because it's frigid out there tonight. "
                    }
                    if (night > 32 && night < 50) {
                        nightOutlook.innerHTML = "Going to be dipping into a chilly night, but nothing a sweatshirt or jacket can't protect you from. "
                    }
                    if (night > 50 && night < 70) {
                        nightOutlook.innerHTML = "Looks like a beautiful night is in the making, any outfit is on the table with this weather, except if it's raining, then have to get out the rainboots. "
                    }
                    if (night > 70) {
                        nightOutlook.innerHTML = "A warm and cozy night outside, perfect for outdoor activities or hitting the town! "
                    }
                    morningOutlook.classList.add("is-size-3", "my-3")
                    dayOutlook.classList.add("is-size-3", "my-3")
                    nightOutlook.classList.add("is-size-3", "my-3")
                    dailyOutlook.classList.add("title", "is-1", "my-3", "is-underlined")
                    dailyOutlookEl.append(dailyOutlook)
                    dailyOutlookEl.append(morningOutlook)
                    dailyOutlookEl.append(dayOutlook)
                    dailyOutlookEl.append(nightOutlook)
                });
        });
}  


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
            if (data.mood === "Sincere" || data.mood === "Thoughtful" || data.mood === "Cherishing" || data.mood === "Sweet") {
                var playlist = "37i9dQZF1DXdPec7aLTmlC"
            }
            if (data.mood === "Independent" || data.mood === "Brave") {
                playlist = "37i9dQZF1DWVY5eNJoKHd2"
            }
            if (data.mood === "Busy" || data.mood === "Serious" || data.mood === "Cautious") {
                playlist = "2mz8otPq7vwtatQL6VxUha"
            }
            if (data.mood === "Friendly" || data.mood === "Social" || data.mood === "Cool" || data.mood === "Playful") {
                playlist = "37i9dQZF1DXa2PvUpywmrr"
            }
            if (data.mood === "Relieved" || data.mood === "Refreshed" || data.mood === "Relaxed" || data.mood === "Calm") {
                playlist = "37i9dQZF1DWYBO1MoTDhZI"
            }
            if (data.mood === "Accomplished" || data.mood === "Successful") {
                playlist = "37i9dQZF1DX8dTWjpijlub"
            }
            if (data.mood === "Persuade" || data.mood === "Determined" || data.mood === "Focus" || data.mood === "Creative") {
                playlist = "37i9dQZF1DX76Wlfdnj7AP"
            }
            if (data.mood === "Crazy") {
                playlist = "37i9dQZF1DZ06evO3nMr04"
            }
            if (data.mood === "Lucky" || data.mood === "Attractive") {
                playlist = "37i9dQZF1DX6GwdWRQMQpq"
            }
            fetch("https://spotify23.p.rapidapi.com/playlist_tracks/?id=" + playlist, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "spotify23.p.rapidapi.com",
                        "x-rapidapi-key": "3316d853b8msh8a70d2564ae8afdp175191jsn7f8129692ba4"
                    }
            })
            .then(response => {
                if (response.ok)
                response.json().then(function(data) {
                    console.log(data)
                    var random = Math.round(Math.random()*data.items.length);
                    console.log(random)
                    var song = data.items[random].track.external_urls.spotify
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

var getOutlook = function () {
    resultsEl.classList.add("none")
    outlookEl.classList.remove("none")
}

buttonEl.addEventListener('click', function () {
    findWeather();
    buildResults();
    zodiacResults();
});

outlookBtn.addEventListener('click', function() {
    getOutlook();
})