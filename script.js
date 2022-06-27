
const submit = document.querySelector('button');
submit.addEventListener('click', (e) => search(e));

function search(e) {
    e.preventDefault()
    const input = document.querySelector('input').value;
    
    fetchWeatherData(`http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=775f80930103eb948ca48290efbf90f1`);

}

async function fetchWeatherData(link) { 
    const response = await fetch(link, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    facFun(weatherData);
}
fetchWeatherData('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=775f80930103eb948ca48290efbf90f1');

const facFun = (weatherData) => {
    let data = {
        cityName: weatherData.name,
        temp: weatherData.main.temp,
        maxTemp: weatherData.main.temp_max,
        minTemp: weatherData.main.temp_min,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        weather: weatherData.weather[0].main,
        wind: weatherData.wind.speed
    }

    console.log(data);
}





