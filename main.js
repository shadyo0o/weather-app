const apiKey = `c1ebd494f0e140d6920185856240807`;
const apiUrl = ` http://api.weatherapi.com/v1/forecast.json`;
let finalResponse = [];
let searchPosition = document.querySelector("#findLocation");

searchPosition.addEventListener("change", function () {
    getweather(searchPosition.value);
});

let btn = document.querySelector(".findBtn");

btn.addEventListener("click", function () {
    getweather(searchPosition.value);
});



async function getweather(country) {
    try {
        let response = await fetch(`${apiUrl}?key=${apiKey}&q=${country}&days=3`);
        let finalResponse = await response.json();
        console.log(finalResponse);
        display(finalResponse);
        document.querySelector("#location").innerHTML = `${finalResponse.location.name}`;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
}
getweather();
function display(data) {
    let dataarray = data.forecast.forecastday;

    document.querySelector(".todayDate").innerHTML = dataarray[0].date;
    document.querySelector(".cityName").innerHTML = data.location.name;
    document.querySelector("#weatherTemp").innerHTML = `${data.current.temp_c}°`;
    document.querySelector("#weatherCondition").innerHTML =data.current.condition.text;
    document.querySelector("#windSpeed").innerHTML = `${data.current.wind_kph} km/h`;
    document.querySelector("#rainProbability").innerHTML = `${data.current.humidity} %`;
    let cartona = ``;
    for (i = 0; i < dataarray.length; i++) {
        let date = new Date(dataarray[i].date);
        let day = date.toLocaleDateString("en-us", { weekday: "long" });
        
        cartona += `
                    <div class="today flex-grow-1 m-2">
                    <div class="innerCard bg-primary-subtle rounded-3 py-2 px-4">
                        <p class="weekDay text-center fw-bolder text-black ">${day}</p>
                        <div class="d-flex justify-content-between">
                            <div class="text-center">
                                <p id="maxTemp" class="temp-type fw-bold m-1">Max Temp</p>
                                <p class="">${dataarray[i].day.maxtemp_c}°</p>
                            </div>
                            <div class="text-center">
                                <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp</p>
                                <p class="">${dataarray[i].day.avgtemp_c}°</p>
                            </div>
                            <div class="text-center m-0 p-0">
                                <p id="minTemp" class="temp-type fw-bold m-1">Min Temp</p>
                                <p class="">${dataarray[i].day.mintemp_c}°</p>
                            </div>
                        </div>
                        <p class="text-center fw-semibold text-dark-emphasis m-0 p-0">${dataarray[i].day.condition.text}</p>
                        <img src="http:${dataarray[i].day.condition.icon}" width="50px" class="m-auto d-block" alt="">
                    </div>
                </div>
    `;
    }
    document.querySelector(".weatherCards").innerHTML = cartona;
}

function currentposition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    let finalposition = `${latitude} , ${longitude}`;

    console.log(finalposition);
    getweather(finalposition);
}

navigator.geolocation.getCurrentPosition(currentposition);
