async function getWeather() {
  const locurl = "https://cdn.invisyarcticfox.uk/location.json";
  
  try {
    const response = await fetch(locurl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const location = await response.json();
    console.log(location)

    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=5796abbde9106b7da4febfae8c44c232`;
    console.log(weatherurl)
    try {
      const response = await fetch(weatherurl)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const weather = await response.json()
      console.log(weather)

      document.querySelector('div.info').innerHTML = `
        <div>${weather.coord.lat}</div>
        <div>${weather.coord.lon}</div>
        <div>${weather.name}</div>
        <div>${weather.sys.country}</div>
        <div>${weather.weather.filter(m => m.length != '1').shift().description}</div>
        <div>${weather.main.temp}<sup>°c</sup></div>
      `

    } catch (error) {
      console.error(error.message);
    }
  } catch (error) {
    console.error(error.message);
  }


}
getWeather()