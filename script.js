const apiKey = '7cdc52c67051b9b535f87dcc3a07fc8e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const weathericonElement = document.getElementById('weathericon');
const temperatureElement = document.getElementById('temperature');
const timeElement = document.getElementById('time');
const descriptionElement = document.getElementById('description');
const pressureElement = document.getElementById('pressure');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

const apUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=London';

async function checkweather() {
    const resp = await fetch(apUrl + `&appid=${apiKey}`);
    var weat = await resp.json();
    console.log(weat);
    locationElement.textContent = weat.name;
    temperatureElement.textContent = `${Math.round(weat.main.temp)}°C`;
            
    descriptionElement.textContent = weat.weather[0].description;
    pressureElement.textContent = `Pressure: ${weat.main.pressure} hPa`;
    humidityElement.textContent = `Humidity: ${weat.main.humidity} %`;
    windElement.textContent = `Wind Speed: ${weat.wind.speed} km/hr`;

    var tzone = weat.timezone;
    var datey = new Date((new Date().getTime())+(tzone)*1000);
    datey.setHours(datey.getHours() );

    var stamp = datey.toISOString().replace("T", " ").split(".")[0];
    var dty = new Date(stamp);
    var hours = dty.getHours();
    console.log(hours);
    timeElement.textContent = stamp;

    if(weat.weather[0].main == "Clouds"){
        weathericonElement.src = "images/clouds.webp";
    }
    else if(weat.weather[0].main == "Clear" && hours < 17 ){
        weathericonElement.src = "images/sun.jpeg";
    }
    else if(weat.weather[0].main == "Clear" && hours >= 17 ){
        weathericonElement.src = "images/night.webp";
    }
    else if(weat.weather[0].main == "Drizzle" ){
        weathericonElement.src = "images/driz.png";
    }

    else if(weat.weather[0].main == "Mist" || weat.weather[0].main == "Haze" ){
        weathericonElement.src = "images/mist.png";
    }
    else if(weat.weather[0].main == "Rain"){
        weathericonElement.src = "images/rain.png";
    }
    else if(weat.weather[0].main == "Snow"){
        weathericonElement.src = "images/snow.png";
    }
    else if(weat.weather[0].main == "Thunderstorm"){
        weathericonElement.src = "images/thunder.webp";
    }


}
checkweather();


searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
   
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;

              var zone = data.timezone;
              var date = new Date((new Date().getTime())+(zone)*1000);
              
              date.setHours(date.getHours() );
        
              var timestamp = date.toISOString().replace("T", " ").split(".")[0];
              var dt = new Date(timestamp);
              var hrs = dt.getHours();
              console.log(hrs);
              timeElement.textContent = timestamp;
                  
            descriptionElement.textContent = data.weather[0].description;
            pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
            humidityElement.textContent = `Humidity: ${data.main.humidity} %`;
            windElement.textContent = `Wind Speed: ${data.wind.speed} km/hr`;

            if(data.weather[0].main == "Clouds"){
                weathericonElement.src = "images/clouds.webp";
            }
            else if(data.weather[0].main == "Clear" && hrs < 17 ){
                weathericonElement.src = "images/sun.jpeg";
            }
            else if(data.weather[0].main == "Clear" && hrs >= 17){
                weathericonElement.src = "images/night.webp";
            }

            else if(data.weather[0].main == "Drizzle"  ){
                weathericonElement.src = "images/driz.png";
            }

            else if(data.weather[0].main == "Mist" || data.weather[0].main == "Haze" ){
                weathericonElement.src = "images/mist.png";
            }

            else if(data.weather[0].main == "Rain"){
                weathericonElement.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Snow"){
                weathericonElement.src = "images/snow.png";
            }
            else if(data.weather[0].main == "Thunderstorm"){
                weathericonElement.src = "images/thunder.webp";
            }

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

