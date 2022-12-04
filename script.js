
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
    const input = document.querySelector('input').value;
    const error = document.querySelector('.error');
    const cityDiv = document.querySelector('.country').innerHTML;

    if(checkbox.value === null || checkbox.value === '0' || checkbox.value === undefined) unit = '&units=metric'
    else if(checkbox.value === '1') unit = '&units=imperial'

    if(input === null || input === undefined || input === "") {
        const city = cityDiv.split(' ').pop();
        input = city;
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
    const tempIcon = document.querySelector('.temp-icon');

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

    const changeContainerBackground = (url) => {
        container.style.backgroundImage = url;
        container.style.backgroundColor = 'rgba(255,255,255,0.15)'
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = '120% 100%';
        container.style.backgroundBlendMode = 'lighten';
        container.style.color = 'rgb(255, 255, 255)'
    }

    const changeIcon = (weather, temp) => {
        icon.style.backgroundImage = weather;
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundSize = 'contain';

        tempIcon.style.backgroundImage = temp;
        tempIcon.style.backgroundRepeat = 'no-repeat';
        tempIcon.style.backgroundSize = 'contain';
    }

    switch(weatherDisplay) {
        case 'Clouds': 
            changeContainerBackground('url(img/cloudy.jpg)');
            changeIcon('url(img/cloudy-day.png)', 'url(./img/temperature-512.png)');
            break;
        case 'Clear':
            changeContainerBackground('url(img/sun.jpg)');
            container.style.color = 'black'
            changeIcon('url(img/sunny.png)', 'url(./img/black-temp.png)');
            break;
        case 'Rain' || 'Thunderstorm':
            changeContainerBackground('url(img/rainy.jpg)');
            changeIcon('url(img/rain-512.png)', 'url(./img/temperature-512.png)');
            break;
        case 'Mist':
            changeContainerBackground('url(img/mist.jpg)');
            changeIcon('url(img/misty.png)', 'url(./img/temperature-512.png)');
            break;
        default:
            changeContainerBackground('url(img/default.jpg)');
            changeIcon('url(img/sunny.png)', 'url(./img/temperature-512.png)');
    }
}





