// citySearch event listener and innerHTML

const citySearch = document.getElementById("citySearch");
const searchButton = document.getElementById("searchButton");
const cityList = document.getElementById("cityList");
const clearButton = document.getElementById("clearButton");
const apiKey = "11124cc5636decd0a931bb5d68ca2f09";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";


searchButton.addEventListener("click", function() {
  const city = citySearch.value;
  const queryUrl = `${apiUrl}?q=${city}&appid=${apiKey}`;

  const button = document.createElement("button");
  button.innerHTML = city;
  button.classList.add("btn", "btn-primary", "mt-3", "city-button");
  cityList.appendChild(button);
  
  // Save the new city to local storage
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));

  //api call using ajax
$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
});

clearButton.addEventListener("click", function() {
  while (cityList.firstChild) {
    cityList.removeChild(cityList.firstChild);
  }
  localStorage.removeItem("cities");
});

// Load saved cities from local storage on page load
window.addEventListener("load", function() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.forEach(function(city) {
    const button = document.createElement("button");
    button.innerHTML = city;
    button.classList.add("btn", "btn-primary", "mt-3", "city-button");
    cityList.appendChild(button);
  });
});





