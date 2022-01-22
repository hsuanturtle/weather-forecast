//Fetch Weather API and Display Weather
let weather = {
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}
            &units=metric&appid=1fae6037580f24185a50b1e85b55dd83
            `
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { temp } = data.main;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const { feels_like } = data.main;
    const { humidity } = data.main;
    console.log(name, country, temp, icon, description, feels_like, humidity);

    document.querySelector(".location").innerHTML = `${name}, ${country}`;
    document.querySelector(".temp").innerHTML = `Temperature: ${temp} °C`;
    document.querySelector(
      ".description"
    ).innerHTML = `Weather: ${description}`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".feel").innerHTML = `Feels Like: ${feels_like} °C`;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity} %`;
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}')`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".submit").addEventListener("click", function () {
  weather.search();
  document.querySelector(".search-bar").value = "";
});
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    weather.search();
    document.querySelector(".search-bar").value = "";
  }
});

weather.fetchWeather("Taichung");
