const apiKey = '4525a9ec3053fd7b173e9195f33778f1';

// Function to get weather based on the city input
async function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Successfully fetched weather data
            document.getElementById('cityName').textContent            = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent         = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weatherDescription').textContent  = `Weather: ${data.weather[0].description}`;


            // More detailed weather info
            document.getElementById('humidity').textContent  = `Humidity: ${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById('weatherIcon').src       = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Show more info container
            document.getElementById('moreInfoContainer').style.display = 'none'; // Initially hide
        }
        
        else {
            // Handle the error, city not found, etc.
            document.getElementById('cityName').textContent             = 'City not found';
            document.getElementById('temperature').textContent          = '';
            document.getElementById('weatherDescription').textContent   = '';
            document.getElementById('humidity').textContent             = '';
            document.getElementById('windSpeed').textContent            = '';
        }
    }
    
    catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('cityName').textContent = 'Error fetching weather data';
    }
}

// Function to get the user's current location and fetch weather data
async function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data     = await response.json();

        if (data.cod === 200) {
            // Successfully fetched weather data for location
            document.getElementById('cityName').textContent           = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent        = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weatherDescription').textContent = `Weather: ${data.weather[0].description}`;


            // More detailed weather info
            document.getElementById('humidity').textContent  = `Humidity: ${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById('weatherIcon').src       = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        }
        
        else {
            // Handle errors
            document.getElementById('cityName').textContent = 'Location not found';
        }
    }
    
    catch (error) {
        console.error('Error fetching the weather data:', error);
        document.getElementById('cityName').textContent = 'Error fetching weather data';
    }
}

// Function to handle the button click for getting weather by city
document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherByCity(city);
    }
    
    else {
        document.getElementById('cityName').textContent = 'Please enter a city name';
    }
});

// Automatically get weather based on the user's location when the page loads
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            },
            (error) => {
                console.error('Error getting location:', error);
                if (error.code === error.PERMISSION_DENIED) {
                    document.getElementById('cityName').textContent = 'Location access denied. Please enter a city.';
                }
                
                else {
                    document.getElementById('cityName').textContent = 'Unable to get location.';
                }
            }
        );

    }
    
    else {
        document.getElementById('cityName').textContent = 'Geolocation not supported by this browser';
    }
};

// Function to handle the button click for showing more info
document.getElementById('showMoreBtn').addEventListener('click', function () {
    const moreInfoContainer = document.getElementById('moreInfoContainer');

    if (moreInfoContainer.style.display === 'none' || moreInfoContainer.style.display === '') {
        moreInfoContainer.style.display = 'block'; // Show the container
        document.getElementById('showMoreBtn').textContent = 'Hide More Info';
    }
    
    else {
        moreInfoContainer.style.display = 'none'; // Hide the container
        document.getElementById('showMoreBtn').textContent = 'Show More Info';
    }
});
