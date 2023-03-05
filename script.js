const citySearch = document.getElementById("citySearch");
const searchButton = document.getElementById("searchButton");
const cityList = document.getElementById("cityList");
const clearButton = document.getElementById("clearButton");
const apiKey = "11124cc5636decd0a931bb5d68ca2f09";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
const forecastClasses = document.getElementsByClassName("forecastCard");
const currentDate = moment().format("MM/DD/YYYY");


// api prepend, api call and append to html
function getForecast(cityName) {
  const queryUrl = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  // Clear previous forecast cards
  $("#forecast").empty();
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (let i = 0; i < response.list.length; i += 8) {
      const forecastCard = `
        <div class="card col forecastCard card-body">
          <h6 class="card-title">Forecast card</h6>
          <h7 class="date">${response.list[i].dt_txt}</h7>
          <h7 class="icon"><img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt="Weather icon"></h7>
          <h7 class="temp">Temp: ${response.list[i].main.temp} &deg;C</h7>
          <h7 class="wind">Wind: ${response.list[i].wind.speed} m/s</h7>
          <h7 class="humidity">Humidity: ${response.list[i].main.humidity}%</h7>
        </div>`;
      // add forecastCard to the HTML
      $("#forecast").append(forecastCard);
    }
    document.querySelector(
      ".cityName"
    ).textContent = `Name: ${response.city.name}`;
    document.querySelector(".date").textContent = `Date: ${currentDate}`;
    document.querySelector(".temp").textContent = `Temp: ${response.list[0].main.temp} degrees`;
    document.querySelector(".wind").textContent = `Wind: ${response.list[0].wind.speed}mph`;
    document.querySelector(".humidity").textContent = `Humidity: ${response.list[0].main.humidity}rh`;
  });
}

searchButton.addEventListener("click", function () {
  const city = citySearch.value;
 

  const button = document.createElement("button");
  button.innerHTML = city;
  button.classList.add("btn", "btn-primary", "mt-3", "city-button");
  cityList.appendChild(button);

  // Save the new city to local storage
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));

  getForecast(city);
});

clearButton.addEventListener("click", function () {
  while (cityList.firstChild) {
    cityList.removeChild(cityList.firstChild);
  }
  localStorage.removeItem("cities");
});

//event listener for city buttons
cityList.addEventListener("click", function(event) {
  if (event.target && event.target.matches("button.city-button")) {
    const city = event.target.textContent;
    getForecast(city);
  }
});

// Load saved cities from local storage on page load
window.addEventListener("load", function () {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.forEach(function (city) {
    const button = document.createElement("button");
    button.innerHTML = city;
    button.classList.add("btn", "btn-primary", "mt-3", "city-button");
    cityList.appendChild(button);
  });
});
