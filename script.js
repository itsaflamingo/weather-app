
const submit = document.querySelector('button');
const checkbox = document.querySelector("input[type='checkbox']");
const form = document.querySelector('form');
submit.addEventListener('click', (e) => search(e));
  
checkbox.addEventListener('change', (e) => {
     checkbox.value = checkbox.checked ? 1 : 0;

     search(e);   
  });

function search(e) {
    e.preventDefault()
    let input = document.querySelector('input').value;
    const error = document.querySelector('.error');
    const cityDiv = document.querySelector('.country').innerHTML;

    if(checkbox.value === null || checkbox.value === '0' || checkbox.value === undefined) unit = '&units=metric'
    else if(checkbox.value === '1') unit = '&units=imperial'

    if(input === null || input === undefined || input === "") {
        const city = cityDiv.split(' ').pop();
        input = city
    };
    
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=775f80930103eb948ca48290efbf90f1${unit}`).catch(err => {
        error.innerHTML = `Location not found. Search must be in the form of "City", "City, State" or "City, Country".        `
    });
    form.reset();
}

async function fetchWeatherData(link) { 
    const response = await fetch(link, {mode: 'cors'});
    const weatherData = await response.json();

    facFun(weatherData);
}
fetchWeatherData('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=775f80930103eb948ca48290efbf90f1&units=metric');

const facFun = (weatherData) => {
    let data = {
        country: weatherData.name,
        temp: Math.floor(weatherData.main.temp),
        maxTemp: Math.floor(weatherData.main.temp_max),
        minTemp: Math.floor(weatherData.main.temp_min),
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        weather: weatherData.weather[0].main,
        wind: weatherData.wind.speed
    }

    display(data);
}

const display = (data) => {

    let deg;
    if(checkbox.value === null || checkbox.value === '0') deg = 'C';
    else if(checkbox.value === '1') deg = 'F';

    const country = document.querySelector('.country');
    const weather = document.querySelector('#weather');
    const date = document.querySelector('.date');
    const temp = document.querySelector('.temp');
    const minTemp = document.querySelector('.min-temp');
    const maxTemp = document.querySelector('.max-temp');
    const feelsLike = document.querySelector('.feels-like');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');

    const container = document.querySelector('.container');
    const icon = document.querySelector('.icon');

    const weatherDisplay = data.weather;

    country.innerHTML = `Weather for: ${data.country}`;
    weather.innerHTML = weatherDisplay;
    date.innerHTML = new Date();
    temp.innerHTML = `${data.temp}&deg${deg}`;
    minTemp.innerHTML = `Min: ${data.minTemp}&deg${deg}`;
    maxTemp.innerHTML = `Max: ${data.maxTemp}&deg${deg}`;
    feelsLike.innerHTML = `Feels like: ${data.feelsLike}`;
    humidity.innerHTML = `Humidity: ${data.humidity}`;
    wind.innerHTML = `Wind: ${data.wind}`;

    if(weatherDisplay === 'Clouds') {
        container.style.backgroundImage = 'url(img/cloudy.jpg)';
        container.style.backgroundColor = 'rgba(255,255,255,0.15)'
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = 'cover';
        container.style.backgroundBlendMode = 'lighten';
        container.style.color = 'rgb(255, 255, 255)'

        icon.style.backgroundImage = 'url(img/cloudy-day.png)';
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundSize = 'contain';
    }
    if(weatherDisplay === 'Clear') {
        container.style.backgroundImage = 'url(img/sun.jpg)';
        container.style.backgroundColor = 'rgba(255,255,255,0.15)'
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = 'cover';
        container.style.backgroundBlendMode = 'lighten';
        container.style.color = 'rgba(63, 63, 63)'

        icon.style.backgroundImage = 'url(img/sunny.png)';
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundSize = 'contain';
    }

    if(weatherDisplay === 'Rain' || weatherDisplay === 'Thunderstorm') {
        container.style.backgroundImage = 'url(img/rainy.jpg)';
        container.style.backgroundColor = 'rgba(255,255,255,0.15)'
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = '120% 100%';
        container.style.backgroundBlendMode = 'lighten';
        container.style.color = 'rgb(255, 255, 255)'

        icon.style.backgroundImage = 'url(img/rain-512.png)';
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundSize = 'contain';

    }
}





