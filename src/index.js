function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#weather-humidity");
  let windElement = document.querySelector("#weather-wind");
  let timeElement = document.querySelector("#weather-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class = "weather-icon"/>`;
  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function searchCity(city) {
  let apiKey = "fdtba1b75abd823874fca8d73007o460";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

function displayForecast() {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-data">
    <div class="weather-forecast-day">${day}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
      alt=""
      class="weather-forecast-icon"
      width="80px"
    />
    <div class="weather-forecast-temp">
      <span class="weather-forecast-temp-max">
        <strong>12°C</strong>
      </span>
      |<span class="weather-forecast-temp-min"> 6°C</span>
    </div>
  </div>
  `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Cape Town");
displayForecast();
