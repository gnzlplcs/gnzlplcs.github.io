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

// ------------RATING----------------
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

// Toggle nav 
function toggle() {
    document.getElementById('nav-menu').classList.toggle('hide');
}

// ---------------------JS Gallery----------------
const imgOptions = {
    threshold: 1,
    rootmargin: "0px 0px -300px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions)

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}


// ---------------JSON Request-----------------------
const requestURLtowns = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(requestURLtowns)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Fish Haven' || towns[i].name == 'Preston' || towns[i].name == 'Soda Springs') {
                let card = document.createElement('section');
                let divText = document.createElement('div');
                let divImg = document.createElement('div');
                let h2 = document.createElement('h2');
                let motto = document.createElement('p');
                let yearFounded = document.createElement('p');
                let population = document.createElement('p');
                let annualRainFall = document.createElement('p');
                let image = document.createElement('img');
                divText.className = "textContainer";
                divImg.className = "imgContainer";
                h2.textContent = towns[i].name;
                motto.className = 'motto';
                motto.textContent = towns[i].motto;
                yearFounded.textContent = `Year Founded: ${towns[i].yearFounded}`;
                population.textContent = `Population: ${towns[i].currentPopulation}`;
                annualRainFall.textContent = `Annual Rain Fall: ${towns[i].averageRainfall}`;
                image.setAttribute('src', 'images/' + towns[i].photo);
                divText.appendChild(h2);
                divText.appendChild(motto);
                divText.appendChild(yearFounded);
                divText.appendChild(population);
                divText.appendChild(annualRainFall);
                divImg.appendChild(image);
                card.appendChild(divText);
                card.appendChild(divImg);
                document.querySelector('div.cards-home').appendChild(card);
            }

        }
    })

// ---------------JSON Request-----------------------
let cityID = 5604473;
let appid = "96903c0c4a665e1829d511ed75451893";

// ----------Weather Summary-------------
const requestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${appid}&units=imperial`;

fetch(requestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        document.getElementById('max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        document.getElementById('min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('humidity').textContent = jsonObject.main.humidity;
        document.getElementById('wind').textContent = jsonObject.wind.speed;

        // -------------------Setting up Wind Chill----------------
        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);

        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(0);
        }
        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';
        document.getElementById('windchill').textContent = finalResult;
    });

// -------------Forecast------------
const requestURLforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${appid}&units=imperial`;

fetch(requestURLforecast)
    .then((response) => response.json())
    .then((jsonObject) => {
        // ----------------Declaring variables---------------
        const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let daysArray = [];
        let iconsArray = [];
        let descIconArray = [];
        let tempArray = [];

        // --------------Setting up arrays----------------------
        for (let i = 0; i < jsonObject.list.length; i++) {
            if (jsonObject.list[i].dt_txt.indexOf('18:00:00') > -1) {
                let tempDay = new Date(jsonObject.list[i].dt_txt);
                daysArray.push(dayOfWeek[tempDay.getDay()]);
                iconsArray.push(jsonObject.list[i].weather[0].icon);
                descIconArray.push(jsonObject.list[i].weather[0].description)
                tempArray.push(jsonObject.list[i].main.temp);
            }
        }

        for (let i = 0; i < tempArray.length; i++) {
            // --------------Creating HTML elements--------------------
            let divCard = document.createElement('div');
            let dayP = document.createElement('p');
            let iconImg = document.createElement('img');
            let tempP = document.createElement('p');
            divCard.className = "forecast-day";
            dayP.setAttribute('id', `dayOfWeek${i + 1}`);
            iconImg.setAttribute('id', `icon${i + 1}`);
            tempP.setAttribute('id', `temp${i + 1}`);
            divCard.appendChild(dayP);
            divCard.appendChild(iconImg);
            divCard.appendChild(tempP);
            document.getElementById("forecast").appendChild(divCard);

            // ------------------Assigning values-----------------
            document.getElementById(`dayOfWeek${i + 1}`).textContent = `${daysArray[i]}`;
            document.getElementById(`icon${i + 1}`).setAttribute('src', `https://openweathermap.org/img/wn/${iconsArray[i]}@4x.png`);
            document.getElementById(`icon${i + 1}`).setAttribute('alt', `${descIconArray[i]} icon`);
            document.getElementById(`temp${i + 1}`).textContent = `${tempArray[i].toFixed(0)}°F`;
        }
    });