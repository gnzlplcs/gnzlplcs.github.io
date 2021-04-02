// ----------------Font --------------------
WebFont.load({
    google: {
        families: ['Bangers', 'Cabin Condensed', 'Crimson Pro']
    }
});

// -----------Directory API Manipulation
const upcEvURL = 'https://gnzlplcs.github.io/final-project/js/directory.json';

// -------------Business Cards---------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let businessCard = document.createElement('section');
        let business = jsonObject.local_business;
        business.forEach(local => {
            let localName = document.createElement('h3');
            let localDesc = document.createElement('div');
            let localAddress = document.createElement('div');
            let localContact = document.createElement('div');
            let contactLink = document.createElement('a');
            let localSite = document.createElement('div');
            let siteLink = document.createElement('a');
            localName.textContent = local.name;
            localDesc.textContent = local.description;
            localAddress.textContent = `${local.address.number} ${local.address.street}, ${local.address.district}`;
            contactLink.setAttribute('href', `tel:+${local.contact.phone}`);
            contactLink.textContent = `Call: ${local.contact.phone}`;
            localContact.appendChild(contactLink);
            siteLink.setAttribute('href', `${local.url}`);
            siteLink.textContent = 'Visit Business Site';
            localSite.appendChild(siteLink);
            businessCard.appendChild(localName);
            businessCard.appendChild(localDesc);
            businessCard.appendChild(localAddress);
            businessCard.appendChild(localContact);
            businessCard.appendChild(localSite);
        });
        document.querySelector('div.cards-locals').appendChild(businessCard);
    });

// ----------Upcoming Events---------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let upcEvCard = document.createElement('section');
        let events = jsonObject.events;
        events.forEach(cityEvent => {
            let textContainer = document.createElement('div');
            let imgContainer = document.createElement('div');
            let upcEvTitle = document.createElement('h3');
            let upcEvDate = document.createElement('div');
            let upcEvPlace = document.createElement('div');
            let upcEvImg = document.createElement('img');
            upcEvTitle.textContent = cityEvent.name;
            upcEvDate.textContent = `When: ${cityEvent.date}`;
            upcEvPlace.textContent = `Where: ${cityEvent.place}`;
            upcEvImg.setAttribute('src', `assets/${cityEvent.image}`);
            upcEvImg.setAttribute('alt', `${cityEvent.name} Image`);
            textContainer.appendChild(upcEvTitle);
            textContainer.appendChild(upcEvDate);
            textContainer.appendChild(upcEvPlace);
            imgContainer.appendChild(upcEvImg);
            upcEvCard.appendChild(textContainer);
            upcEvCard.appendChild(imgContainer);
        });
        document.querySelector('div.upcoming-events').appendChild(upcEvCard);
    });

// *********************************************
// ---------Weather API Manipulation------------
const lat = -12.04318;
const lon = -77.02824;
const apiKey = "96903c0c4a665e1829d511ed75451893";
const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

fetch(requestURL)
    .then(response => response.json())
    .then((jsonObject) => {

        // --------Weather JSON--------------
        let weatherCard = document.createElement('section');
        let weatherTitle = document.createElement('h3');
        let tempDiv = document.createElement('div');
        let descDiv = document.createElement('div');
        let humDiv = document.createElement('div');
        weatherTitle.textContent = 'Weather Summary';
        tempDiv.textContent = `Temperature: ${jsonObject.current.temp.toFixed(0)}°C`;
        descDiv.textContent = `Condition: ${jsonObject.current.weather[0].main}`;
        humDiv.textContent = `Humidity: ${jsonObject.current.humidity}%`;
        weatherCard.appendChild(weatherTitle);
        weatherCard.appendChild(tempDiv);
        weatherCard.appendChild(descDiv);
        weatherCard.appendChild(humDiv);

        // --------------Forecast JSON--------------
        let forecastCard = document.createElement('section');
        for (let i = 0; i < 3; i++) {
            let dayLabel = document.createElement('div');
            let condIcon = document.createElement('img');
            let tempDay = document.createElement('div');
            let currentDay = new Date(jsonObject.daily[i + 1].dt * 1000);
            dayLabel.textContent = dayOfWeek[currentDay.getDay()];
            condIcon.setAttribute('src', `https://openweathermap.org/img/wn/${jsonObject.daily[i].weather[0].icon}@4x.png`);
            tempDay.textContent = `${jsonObject.daily[i].temp.day.toFixed(0)}°C | ${jsonObject.daily[i].weather[0].main}`;
            forecastCard.appendChild(dayLabel);
            forecastCard.appendChild(condIcon);
            forecastCard.appendChild(tempDay);
        }

        document.querySelector('div.weather').appendChild(weatherCard);
        document.querySelector('div.weather').appendChild(forecastCard);
    });