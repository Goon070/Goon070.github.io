const weather = document.querySelector(".js-weather");
const alarm = document.querySelector(".js-alarm")
const API_KEYS = "80b5ec00b18083dd3199a450bb50fac1";


function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`
    ) .then(function(response) {
        return response.json();
    }) . then(function(json) {
        const temp = json.main.temp;
        const country = json.name;
        weather.innerText = `${country}의 기온은 ${temp}c`
        addInbody(temp);
    })
}


function addInbody(temp) {
    const alarmTextBox = ["@지금은 다소 쌀쌀하네요.💨","@지금은 다소 따뜻하네요.🔆","@지금은 날씨가 추워요.⚠","@지금은 더워요.💦"]
    if (temp > 5 && temp < 10) {
        alarm.innerText = alarmTextBox[0];
    } else if(temp < 5) {
        alarm.innerText = alarmTextBox[2];
    } else if(temp > 10 && temp < 19){
        alarm.innerText = alarmTextBox[1];
    } else {
        alarm.innerText = alarmTextBox[3];
    }
}

function hadleSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    saveWeather(coordsObj)
    getWeather(latitude, longitude)
}

function saveWeather(coords) {
    localStorage.setItem("coords",JSON.stringify(coords))
}


function handleError() {
    console.log("Can not get your Location.")
}

function askWeather() {
    navigator.geolocation.getCurrentPosition(hadleSucces, handleError)
    //geolocation 은 사용자의 현재 위치를 가져오는 API
    //getCurrentPosition 는 장치의 현재위치를 가져오는 메소드
}

function loadWeather() {
    const loadedWeather = localStorage.getItem("coords");
    if (loadedWeather === null) {
        askWeather()
    } else {
        //getWeather(loadedWeather) 
        //이게 안되는이유는 로컬스토리지에 있는 value는 문자열이라서. 그리고 오브젝트라고 하더라도 값을 지정해주지않음
        const parseCoords = JSON.parse(loadedWeather);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadWeather();
    setInterval(loadWeather, 1000000);
}

init();