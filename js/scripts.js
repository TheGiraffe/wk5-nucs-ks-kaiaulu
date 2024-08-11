console.log('javascript connected!');

const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
});

// when the pause button is clicked, pause the carousel
const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function(){
    if (faIcon.classList.contains('fa-pause')){
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        console.log('pausing the carousel');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        console.log('cycle the carousel');
        carousel.cycle();
    }
});

async function fetchWeather(){
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    let city = "Kihei";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    }catch(e){
        console.error('There was an error:',e);
    }
};

function displayWeather(data){
    const city = data.name;
    const temp = data.main.temp;
    const temp_c = ((temp-32) * (5/9)).toFixed(1);
    const feels_like = Math.round(data.main.feels_like);
    const weatherDescription = data.weather[0].description;
    const icon = data.weather[0].icon;
    console.log(temp, weatherDescription, icon);

    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;

    document.getElementById("weather-icon").appendChild(weatherIcon);
    document.getElementById("weather-temp").textContent = `${temp}\u00B0F (~${temp_c}\u00B0C) - Feels like ${feels_like}\u00B0F`;
    document.getElementById("weather-description").textContent = weatherDescription;
    document.getElementById("city-name").textContent = `${city}`;
}

fetchWeather();