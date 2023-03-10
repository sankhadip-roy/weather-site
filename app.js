function feedBack() {
    alert("If you are in mobile device turn on desktop mode. This is not yet optimized for smaller screens")
}
setTimeout(feedBack, 5000);
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
weather.innerHTML = `<h5> Waiting for your input... <h5>`
const getWeather = async (city) => {
    weather.innerHTML = `<h5> Loading... <h5>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    console.log(data)
    let unix1 = data.sys.sunrise;
    let date1 = new Date(unix1 * 1000);
    let unix2 = data.sys.sunset;
    let date2 = new Date(unix2 * 1000);
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
            <table class="table table-hover table-borderless table-sm table-striped  table-responsive">
                <thead>
                    <tr>
                    <th scope="col">${data.name}</th>
                    <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Humidity</td>
                    <td>${data.main.humidity} g.m-3</td>
                    </tr>
                    <tr>
                    <td >Temp</td>
                    <td>Max: ${data.main.temp_max} Min: ${data.main.temp_min} ℃</td>
                    </tr>
                    <tr>
                    <td >Feel like</td>
                    <td>${data.main.feels_like} ℃</td>
                    </tr>
                    <tr>
                    <td>Wind Speed</td>
                    <td>${data.wind.speed} m/s in ${data.wind.deg}°</td>
                    </tr>
                    <tr>
                    <td >Pressure</td>
                    <td>${data.main.pressure / 1013} atm</td>
                    </tr>
                    <tr>
                    <td >Sunrise</td>
                    <td>${date1.toLocaleTimeString("en-US")}</td>
                    </tr>
                    <tr>
                    <td >Sunset</td>
                    <td>${date2.toLocaleTimeString("en-US")}</td>
                    </tr>
                    <tr>
                    <td >Location</td>
                    <td>${data.sys.country} | ${data.coord.lat},  ${data.coord.lon} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}

form.addEventListener(
    "submit",
    function (event) {
        getWeather(search.value)
        event.preventDefault();
    }
)