const button = document.querySelector("button");
button.addEventListener("click", () => {
   getInformation(getInput())
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
        const cityInformation = {
            location: cityData.address,
            temperature: cityData.currentConditions.temp,
            conditions: cityData.currentConditions.conditions,
            humidity: cityData.currentConditions.humidity,
            precipitation: cityData.currentConditions.precip,
            sunriseTime: cityData.currentConditions.sunrise,
            sunseTime: cityData.currentConditions.sunset
        };
        console.log({cityInformation});
        return {cityInformation};
    } catch (e) {
        console.log("We could not find this place, please try again" + e)
    }
}
