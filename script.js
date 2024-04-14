document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the button
    document.querySelector('.search button').addEventListener('click', getWeather);
});

function getWeather(){
    var location=document.getElementById('location').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5b4bee0ba241d092159faf007e166080`)
    .then(response => response.json())
    .then(data => {
        if (data.cod !== 200) {
            err.innerHTML=`
            <img src='./img/none.png' style='width:220px'>
            <h3>Oops city not found</h3>`
            document.getElementById('weather').style.display = 'none';
            return;
        }
        // Extract weather details from the response
        const temperature = Math.round(data.main.temp - 273.15);
        const city = data.name;
        // const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;
        const weatherIcon=document.getElementById('weather-icon')
        // Convert sunrise and sunset times from UNIX timestamp to local time
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        document.getElementById('weather-main').innerHTML=weatherDescription;
        document.getElementById('city').innerHTML=city;
        document.getElementById('temp').innerHTML=`${temperature}°C`;
        document.getElementById('humidity').innerHTML=`${humidity}%`;
        document.getElementById('wind-speed').innerHTML=`${windSpeed} m/s`;
        document.getElementById('sunrise').innerHTML=sunriseTime;
        document.getElementById('sunset').innerHTML=sunsetTime;

        switch (weatherDescription) {
            case 'clouds':
                weatherIcon.src = 'img/clouds.png';
                break;
            case 'few clouds':
                weatherIcon.src = 'img/clouds.png';
                break;
            case 'overcast clouds':
                weatherIcon.src = 'img/overcast.png';
                break;
            case 'clear sky':
                weatherIcon.src = 'img/clear-sky.png';
                break;
            case 'Drizzle':
                weatherIcon.src = 'img/drizzle.png';
                break;
            case 'Rain':
                weatherIcon.src = 'img/rainy-day.png';
                break;
            case 'Mist':
                weatherIcon.src = 'img/mist.png';
                break;
            // Add more cases as necessary for other descriptions
            default:
                // Set a default icon if the description is unknown
                weatherIcon.src = 'img/clear-sky.png';
                break;
        }
        document.getElementById('weather').style.display ='block'
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching the weather data.');
    });
}