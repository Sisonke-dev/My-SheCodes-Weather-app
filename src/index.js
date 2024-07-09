function search (Event) {
    Event.preventDefault();

let searchFormElement= document.querySelector("#search-form");
let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchFormElement.value;
}