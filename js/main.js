
// today's card variable

let today=document.getElementById('today');
let todayDate=document.getElementById('today-date');
let cityLocation=document.getElementById('location');
let todayDegree=document.getElementById('today-degree');
let todayIcon=document.getElementById('today-icon');
let description=document.getElementById('today-description');
let humidty=document.getElementById('humidty');
let wind=document.getElementById('wind');
let compass=document.getElementById('compass');
let searchBar=document.getElementById('search-bar');

// next days variables

let nextDay=Array.from(document.getElementsByClassName('nextDay'));
let nextDayIcon=document.getElementsByClassName('nextDay-icon');
let maxDegree=document.getElementsByClassName('max-degree');
let minDegree=document.getElementsByClassName('min-degree');
let nextDayDescription=document.getElementsByClassName('nextDay-description');

let currentCity ="cairo"
let apiResponse=0;
let responseDate=0;
let monthName=['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
let days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

 

  async function getWeatherApi(){
     apiResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
     responseDate = await apiResponse.json()
     console.log( responseDate);
     displayTodayWeather();
     displayNextDays()
  }
  getWeatherApi()

function displayTodayWeather(){
    let date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML= `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML =responseDate.location.name;
    todayDegree.innerHTML = responseDate.current.temp_c;
    todayIcon.setAttribute("src",`https:${responseDate.current.condition.icon}`);
    description.innerHTML=responseDate.current.condition.text;
    humidty.innerHTML=responseDate.current.humidity;
    wind.innerHTML= responseDate.current.wind_kph;
    compass.innerHTML= responseDate.current.wind_dir;   
};


function displayNextDays(){
    for(let i=0;i<nextDay.length;i++){
     nextDay[i].innerHTML = days[new Date(responseDate.forecast.forecastday[i+1].date).getDay()];
     nextDayIcon[i].setAttribute("src",`https:${responseDate.forecast.forecastday[i+1].day.condition.icon}`);
     maxDegree[i].innerHTML = responseDate.forecast.forecastday[i+1].day.maxtemp_c;
     minDegree[i].innerHTML = responseDate.forecast.forecastday[i+1].day.mintemp_c ;
     nextDayDescription[i].innerHTML = responseDate.forecast.forecastday[i+1].day.condition.text;
    }
}

searchBar.addEventListener("keyup",function(){
    currentCity=searchBar.value;
    getWeatherApi()
})


