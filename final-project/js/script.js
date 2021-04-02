const lat = -12.04318;
const lon = -77.02824;
const apiKey = "96903c0c4a665e1829d511ed75451893";
const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then((jsonObject) => {

        // --------Weather JSON--------------
        let divWeather = document.createElement('div');
        let weatherTitle = document.createElement('h3');
        let tempDiv = document.createElement('div');
        let descDiv = document.createElement('div');
        let humDiv = document.createElement('div');
        weatherTitle.textContent = 'Weather Summary';
        tempDiv.textContent = `Temperature: ${jsonObject.current.temp}°C`;
        descDiv.textContent = `Condition: ${jsonObject.current.weather[0].main}`;
        humDiv.textContent = `Humidity: ${jsonObject.current.humidity}%`;
        divWeather.appendChild(weatherTitle);
        divWeather.appendChild(tempDiv);
        divWeather.appendChild(descDiv);
        divWeather.appendChild(humDiv);

        // --------------Forecast JSON--------------
        let divForecast = document.createElement('div');
        for (let i = 0; i < 3; i++) {
            let dayLabel = document.createElement('div');
            let condIcon = document.createElement('img');
            let condDesc = document.createElement('div');
            let currentDay = new Date(jsonObject.daily[i + 1].dt * 1000);
            dayLabel.textContent = dayOfWeek[currentDay.getDay()];
            condIcon.setAttribute('src', `https://openweathermap.org/img/wn/${jsonObject.daily[i].weather[0].icon}@4x.png`);
            condDesc.textContent = jsonObject.daily[i].weather[0].main;
            divForecast.appendChild(dayLabel);
            divForecast.appendChild(condIcon);
            divForecast.appendChild(condDesc);
        }

        document.querySelector('div.weather').appendChild(divWeather);
        document.querySelector('div.weather').appendChild(divForecast);
    });