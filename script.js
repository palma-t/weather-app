const button = document.querySelector("button");
button.addEventListener("click", () => {
   makeItHappen();
})

function getInput () {
    const input = document.querySelector("#location");
    const askedLocation = input.value;
    return askedLocation;
}

async function getInformation (city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=SPUA37TG35B6P4ANLXQUXJAWH&contentType=json
        `, {mode: 'cors'})
        const cityData = await response.json();
        console.log(cityData);
        const cityInformation = {
            location: cityData.resolvedAddress,
            temperature: cityData.currentConditions.temp,
            conditions: cityData.currentConditions.conditions,
            humidity: cityData.currentConditions.humidity,
            precipitation: cityData.currentConditions.precip,
            sunriseTime: cityData.currentConditions.sunrise,
            sunseTime: cityData.currentConditions.sunset,
            wind: cityData.currentConditions.windspeed,
            time: cityData.currentConditions.datetime,
            icon: cityData.currentConditions.icon
        };
        console.log({cityInformation});
        return cityInformation;
    } catch (e) {
        console.log("We could not find this place, please try again" + e)
    }
}

function styleItAll (city) {
    const body = document.querySelector("body");
    const globalDiv = document.querySelector(".global-div");

    const citySquare = document.querySelector("#answers");
    citySquare.innerHTML = "";
    citySquare.classList.add("city-square");

    const upperDiv = document.createElement("div");
    upperDiv.classList.add("upper-div");

    const cityDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("temp-div");
    const conditionsDiv = document.createElement("div");

    nameDiv.textContent = city.location;
    tempDiv.textContent = city.temperature;
    conditionsDiv.textContent = city.conditions;
    
    cityDiv.appendChild(nameDiv);
    cityDiv.appendChild(tempDiv);
    cityDiv.appendChild(conditionsDiv);

    const cloudDiv = document.createElement("img");
    cloudDiv.src = `./images/weather-icons/${city.icon}.svg`;

    upperDiv.appendChild(cityDiv);
    upperDiv.appendChild(cloudDiv);

    const sunDiv = document.createElement("div");
    sunDiv.classList.add("sun-div");

    const sunriseDiv = document.createElement("div");
    sunriseDiv.classList.add("sun-element");
    const sunriseText = document.createElement("div");
    const sunriseImg = document.createElement("img");


    const sunsetDiv = document.createElement("div");
    sunsetDiv.classList.add("sun-element");
    const sunsetText = document.createElement("div");
    const sunsetImg = document.createElement("img");

    sunriseText.textContent = city.sunriseTime;
    sunriseImg.src = "./images/weather-sunset-up.svg"
    sunsetText.textContent = city.sunseTime;
    sunsetImg.src = "./images/weather-sunset-down.svg"

    sunriseDiv.appendChild(sunriseImg);
    sunriseDiv.appendChild(sunriseText);
    sunsetDiv.appendChild(sunsetImg);
    sunsetDiv.appendChild(sunsetText)

    sunDiv.appendChild(sunriseDiv);
    sunDiv.appendChild(sunsetDiv);

    const moreInfoDiv = document.createElement("div");
    moreInfoDiv.classList.add("more-info-div");

    const humidityDiv = document.createElement("div");
    const humidityImg = document.createElement("img");
    const humidityText = document.createElement("div");
    humidityImg.src = "./images/water-percent.svg";
    humidityText.textContent = city.humidity;
    humidityDiv.appendChild(humidityImg);
    humidityDiv.appendChild(humidityText);
    humidityDiv.classList.add("single-info-div");

    const precipDiv = document.createElement("div");    
    const precipImg = document.createElement("img");
    const precipText = document.createElement("div");
    precipImg.src = "./images/weather-rainy.svg";
    precipText.textContent = city.precipitation;
    precipDiv.appendChild(precipImg);
    precipDiv.appendChild(precipText);
    precipDiv.classList.add("single-info-div");

    const windDiv = document.createElement("div");
    const windImg = document.createElement("img");
    const windText = document.createElement("div");
    windImg.src = "./images/weather-windy.svg";
    windText.textContent = city.wind;
    windDiv.appendChild(windImg);
    windDiv.appendChild(windText);
    windDiv.classList.add("single-info-div");

    moreInfoDiv.appendChild(humidityDiv);
    moreInfoDiv.appendChild(precipDiv);
    moreInfoDiv.appendChild(windDiv);

    citySquare.appendChild(upperDiv);
    citySquare.appendChild(sunDiv);
    citySquare.appendChild(moreInfoDiv);

    if((city.time > city.sunriseTime) && (city.time < city.sunseTime)) {
        console.log("day style");
        body.classList.add("body-day-style");
        globalDiv.classList.add("city-day-style");
    } else {
        body.classList.add("body-night-style");
        globalDiv.classList.add("city-night-style");  
    }
        
}

async function makeItHappen () {
    const askedCity = await getInformation(getInput());
   styleItAll(askedCity);
}

