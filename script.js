async function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const response = await fetch(`http://localhost:3000/weather/${city}`);

    if (!response.ok) {
        alert("City not found or API error!");
        return;
    }

    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("feelsLike").innerText = `Feels like: ${data.main.feels_like}°C`;
    document.getElementById("description").innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;
    
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    document.getElementById("sunrise").innerText = `Sunrise: ${sunriseTime}`;
    document.getElementById("sunset").innerText = `Sunset: ${sunsetTime}`;


    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${iconCode}.png`;

    styleUpdate()
}

function styleUpdate(){
    document.getElementById("weather").style.display = "flex";
    document.getElementById("cityname").style.display = "flex";
}
