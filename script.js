
const apiKey = '4525a9ec3053fd7b173e9195f33778f1';

// Function to get weather based on city name
async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('result').innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
}

// Function to display the weather information
function displayWeather(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

// Function to get weather based on geolocation (current location)
async function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('result').innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
}

// Function to get the user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            },
            (error) => {
                console.error('Error getting location:', error);
                document.getElementById('result').innerHTML = `<p>Unable to retrieve your location. Please enter a city.</p>`;
            }
        );
    } else {
        document.getElementById('result').innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
    }
}

// Automatically get the user's weather when the page loads
window.onload = () => {
    getUserLocation();
};