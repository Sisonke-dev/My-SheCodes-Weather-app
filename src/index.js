function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  getWeather(city);
}

function getWeather(city) {
  let apiKey = "84t5f0f08be2e1a78e0fo88efb0b43e5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  
  axios.get(apiUrl)
    .then(displayWeather)
    .catch(handleError);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  document.querySelector("#current-date").textContent = formatDate(new Date());
  document.querySelector("#current-city").textContent = response.data.city;
  descriptionElement.textContent = response.data.condition.description;
  humidityElement.textContent = `${response.data.humidity}%`;
  windSpeedElement.textContent = `${response.data.wind.speed} km/h`;
  temperatureElement.textContent = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let day = date.getDay();

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedDay = days[day];

  return `${formattedDay} ${hours}:${minutes}`;
}

function handleError(error) {
  console.error("Error fetching weather data:", error);
}

function getForecast(city) {
  let apiKey = "84t5f0f08be2e1a78e0fo88efb0b43e5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl)
    .then(displayForecast)
    .catch(handleError);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
      forecastHTML +=
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial weather display for default city (Paris)
getWeather("Paris");
