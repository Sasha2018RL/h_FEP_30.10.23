const cityInputHandler = _.debounce(getWeatherByCity, 450);

const city_input = document.getElementById('city');
const city_not_found = document.getElementById('city-not-found');
const weather_info = document.getElementById('weather-info');

const d_city = document.getElementById('d-city');
const d_icon = document.getElementById('d-icon');
const d_temp_real = document.getElementById('d-temp-real');
const d_temp_feel = document.getElementById('d-temp-feel');
const d_pressure = document.getElementById('d-pressure');
const d_humidity = document.getElementById('d-humidity');
const d_wind_speed = document.getElementById('d-wind-speed');
const d_wind_angle = document.getElementById('d-wind-angle');
const d_description = document.getElementById('d-description');

function getIconLink(code) {
    return `https://openweathermap.org/img/w/${code}.png`
}

async function getWeatherByCity(city) {
    try {
        const res = (await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: 'metric',
                APPID: '5d066958a60d315387d9492393935c19',
                lang: 'ru'
            }
        })).data;

        const weather = _.get(res, 'weather[0]');


        d_city.innerText = res.name;
        d_icon.setAttribute('src', getIconLink(weather.icon));
        d_temp_real.innerText = res.main.temp;
        d_temp_feel.innerText = res.main.feels_like;
        d_pressure.innerText = res.main.pressure;
        d_humidity.innerText = res.main.humidity;
        d_wind_speed.innerText = res.wind.speed;
        d_wind_angle.innerText = res.wind.deg;
        d_description.innerText = weather.description;

        city_not_found.setAttribute('hidden', '1')
        weather_info.removeAttribute('hidden')

        localStorage.setItem('city', city);
    }catch(error){
        weather_info.setAttribute('hidden', '1')
        city_not_found.removeAttribute('hidden')
    }
}

if (localStorage.getItem('city')) {
    const city = localStorage.getItem('city');
    city_input.value = city;
    getWeatherByCity(city);
}

// Enable bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))