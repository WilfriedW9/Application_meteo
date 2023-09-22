const apiKey = "8e022c10e76fcfea7efe38e4cc14b90c";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    let humidite = document.querySelector("p.humidity");
    let vitesseVent = document.querySelector("p.wind");
    let temp = document.querySelector(".temp");
    city = document.querySelector(".city");
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidite.innerHTML = data.main.humidity + "%";
    vitesseVent.innerHTML = data.wind.speed + "km/h";
    city.innerHTML = data.name;

    const weatherIcon = document.querySelector(".weather-icon");
    console.log(data.weather[0].main);
    if (data.weather[0].main == "Rain") {
      weatherIcon.setAttribute("src", "weather-app-img/images/rain.png");
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.setAttribute("src", "weather-app-img/images/clouds.png");
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.setAttribute("src", "weather-app-img/images/snow.png");
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.setAttribute("src", "weather-app-img/images/drizzle.png");
    } else if (data.weather[0].main == "Humidity") {
      weatherIcon.setAttribute("src", "weather-app-img/images/humidity.png");
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.setAttribute("src", "weather-app-img/images/mist.png");
    } else if (data.weather[0].main == "Wind") {
      weatherIcon.setAttribute("src", "weather-app-img/images/wind.png");
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.setAttribute("src", "weather-app-img/images/clear.png");
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

let body = document.querySelector("body");
body.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});
