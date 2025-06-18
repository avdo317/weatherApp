const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('temp-img');
const description = document.getElementById('description');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

date.innerHTML = `${day}. ${month}. ${year}`;
async function getWeather() {
  try {
    const cityName = document.getElementById('searchInput').value;
    const weatherData = await fetch
      (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e03b37fa6490c77bd8ba9fc061e935de`);

    const weatherD = await weatherData.json();
    console.log(weatherD);

    city.innerHTML = `${weatherD.name}`;
    description.innerHTML = `${weatherD.weather[0].main}`
    tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherD.weather[0].icon}@2x.png"/>`;
    temp.innerHTML = `<h2>${Math.round(weatherD.main.temp)}°C</h2>`;
    tempMax.innerHTML = `${weatherD.main.temp_max}°C`;
    tempMin.innerHTML = `${weatherD.main.temp_min}°C`;
  } catch (error) {
    console.log(error)
  }
}

document.getElementById('searchButton').addEventListener('click', getWeather);
document.getElementById('searchInput').addEventListener('keydown', (e) => {
  e.key === 'Enter' ? getWeather() : null;
});

