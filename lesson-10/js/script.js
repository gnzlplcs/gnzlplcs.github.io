// -------------DATE---------------

let myData = new Date(document.lastModified);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let result = `${weekdays[myData.getDay()]}, ${myData.getDate()} ${months[myData.getMonth()]} ${myData .getFullYear()}`;
document.getElementById('lastUpdate').innerHTML = result;

// ------------Friday banner--------------
const currentDate = new Date();
let today = currentDate.getDay();
let element = document.getElementById('friday-banner');
if (today == 5) {
    element.style.display = "block";
}

// ----------------Font --------------------
WebFont.load({
    google: {
        families: ['Work Sans', 'Neuton', 'Asul']
    }
});

// ---------------Toggle nav-----------------
function toggle() {
    document.getElementById('nav-menu').classList.toggle('hide');
}

// ---------------JSON Request-----------------------
const requestURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=96903c0c4a665e1829d511ed75451893&units=imperial";

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.log(jsonObject)
        document.getElementById('temperature').textContent = jsonObject.main.temp;
        document.getElementById('max-temp').textContent = jsonObject.main.temp_max;
        document.getElementById('min-temp').textContent = jsonObject.main.temp_min;
        document.getElementById('humidity').textContent = jsonObject.main.humidity;
        document.getElementById('wind').textContent = jsonObject.wind.speed;

        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);

        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(1);
        }

        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';

        document.getElementById('windchill').textContent = finalResult;
    })

// Five days forecast
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let day1 = days[currentDate.getDay()];
let day2 = days[currentDate.getDay() + 1];
let day3 = days[currentDate.getDay() + 2];
let day4 = days[currentDate.getDay() + 3];
let day5 = days[currentDate.getDay() + 4];
document.getElementById('day1').innerHTML = day1;
document.getElementById('day2').innerHTML = day2;
document.getElementById('day3').innerHTML = day3;
document.getElementById('day4').innerHTML = day4;
document.getElementById('day5').innerHTML = day5;