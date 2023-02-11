// citySearch event listener and innerHTML

const citySearch = document.getElementById("citySearch");
const searchButton = document.getElementById("searchButton");
const cityList = document.getElementById("cityList");
const clearButton = document.getElementById("clearButton");

searchButton.addEventListener("click", function() {
  const city = citySearch.value;
  const button = document.createElement("button");
  button.innerHTML = city;
  button.classList.add("btn", "btn-primary", "mt-3", "city-button");
  cityList.appendChild(button);
  
  // Save the new city to local storage
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
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