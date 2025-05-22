const apiKey = "911779b361c82987de5617e1b2ed703d";
const gnewsApiKey = "f77b7b5a860324cd3735cd428c37d3f9";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultBox = document.getElementById("weatherResult");

    if (!city) {
        resultBox.innerHTML = "Please enter a city name.";
        return;
    }

    resultBox.innerHTML = "Loading...";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const description = data.weather[0].description;
            const capitalized = description.charAt(0).toUpperCase() + description.slice(1);
            const icon = data.weather[0].icon;

            resultBox.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${capitalized}" />
                <p>${capitalized}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById("cityInput").value = "";
        })
        .catch(error => {
            resultBox.innerHTML = "Error: " + error.message;
        });
}

function getWeatherNews() {
    const newsUrl = `https://gnews.io/api/v4/search?q=weather&lang=en&country=nigeria&min=5&apikey=${gnewsApiKey}`;

    fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById("newsList");
            newsList.innerHTML = "";
            data.articles.forEach(article => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsList.appendChild(li);
            });
        })
        .catch(err => {
            document.getElementById("newsList").innerHTML = "<li>Unable to fetch news right now.</li>";
            console.error(err);
        });
}

function generatePastWeather() {
    const conditions = ["Sunny ☀️", "Partly Cloudy ⛅", "Rainy 🌧️", "Thunderstorm ⛈️", "Cloudy ☁️", "Windy 🌬️"];
    const weatherContainer = document.getElementById('previous-weather');
    for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (i + 1));
        const formattedDate = date.toDateString();
        const temp = Math.floor(Math.random() * 10) + 24;
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const dayHTML = `
            <div class="day-box">
                <strong>${formattedDate}</strong><br>
                Temp: ${temp}°C<br>
                Condition: ${condition}
            </div>
        `;
        weatherContainer.innerHTML += dayHTML;
    }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
    getWeatherNews();
    generatePastWeather();
});
