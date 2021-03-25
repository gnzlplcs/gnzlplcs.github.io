const lat = -12.0266034;
const lon = -77.1278654;
const apiKey = "96903c0c4a665e1829d511ed75451893";
const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
console.log(requestURL);