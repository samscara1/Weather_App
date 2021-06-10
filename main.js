const searchCityForm = document.querySelector(".city-form")
const citySearchField = document.querySelector(".city-form__search-field")
const cityList = document.querySelector(".app__city-list")
const messageError = document.querySelector(".city-form__error-message")

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "4ce4284ec8b724ded1165efd8562d5a2"

let cityCache = []
searchCityForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    messageError.innerHTML = ""
    if (cityCache.includes(capitalizeCityName(citySearchField.value))){
        messageError.innerHTML = `You already know the weather for ${capitalizeCityName(citySearchField.value)}&#128521`
    } else{
        if ((!citySearchField.value) || ( typeof citySearchField.value[0] !== "number")){
            getData(citySearchField.value)
        } else {
        alert("Please search for a valid city")
        citySearchField.value = ""
        }
        cityCache.push(capitalizeCityName(citySearchField.value))
    }  
}) 

function getData(cityName) {
    const fullUrl = `${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    fetch(fullUrl)
    .then(response => response.json())
    .then(({main, name, sys, weather}) => {
        createListItem(name, main.temp, weather, sys);
    })
    .catch(function() {
        messageError.innerHTML = "please search for a valid city&#128553";
        cityCache.pop(citySearchField.value)
    })
}

function createListItem(city, temperature, weather, country){
    const li = document.createElement('li')
    li.classList.add("app__city-list__city")
    li.classList.add("city")
    li.insertAdjacentHTML('afterbegin', `<div class="city-header"><h2 class="city-header__city-name">${city}</h2> <sup class="city-header__country">${country.country}</sup></div> 
    <span class="city__temperature">${Math.round(temperature)}<sup>°C</sup></span> 
    <p class="city__weather-pic"><img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"></p> 
    <span class="city__weather-description">${weather[0].description}</span>`)
    cityList.append(li)
}

function capitalizeCityName (string) {
    return string[0].toUpperCase() + string.slice(1)
}
