//gauti visus duomenis is api//
// async function start(){
//    let url = 'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term';
//    let response = await fetch(url);
//    let orai = await response.json(); 
//    console.log(orai)
// }
// start()



// async function getData(){
//    let url = 'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term';
//    let response = await fetch(url);
//    let orai = await response.json(); 
//    console.log(orai['forecastTimestamps'])
// }
// getData()


// Iconst fetchWeather = async () => {
//     weather = await fetch(
//         'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term'
//         ).then(res => res.json());
// };
// function today (value){
//   return value.forecastTimeUtc.includes('2019-12-10');
// }
// const showWeather = async () => {
//   // gaunami duomenys is api
//       await fetchWeather();
//       let weatherItems = weather.forecastTimestamps;
//       weatherItems = weatherItems.filter(today)
//       for (let i=0; i< weatherItems.length; i++){
//         const irasas = document.createElement('div');
//         irasas.classList.add("valandine")
//         document.querySelector('#weather').appendChild(irasas);
//         for (weatherItem in weatherItems[i]){
//             let valandai = document.createElement('div');
//             valandai.classList.add("valanda");
//             valandai.textContent = weatherItems[i][weatherItem];
//             irasas.appendChild(valandai);
//         }
//     }
// }
// showWeather()


//GAUTI DUOMENIS IS API//
async function getData(city) {
    let url = 'https://api.meteo.lt/v1/places/'+city+'/forecasts/long-term';
    let response = await fetch(url);
    return await response.json();

}
//GAUTI KONKRETAUS MIESTO DUOMENIS IS API//
async function showData(callback) {
    const data = await getData('kaunas');
    Alldata = data ['forecastTimestamps'];

    let realTime = new Date(data['forecastTimestamps'][0]['forecastTimeUtc']);


    let DaysData = [];
    const days = document.querySelector(".days")

    let weatherData = [];
    const hours = document.querySelector(".hours")
    console.log(data.forecastTimestamps[0].forecastTimeUtc)

  
   let weatherIcons = {

        clear: '<i class="fas fa-sun"></i>',
        isolatedClouds: '<i class="fas fa-cloud"></i>',
        scatteredClouds: '<i class="fas fa-cloud-sun"></i>',
        overcast: '<i class="fas fa-cloud"></i>',
        lightRain: '<i class="fas fa-cloud-rain"></i>',
        moderateRain: '<i class="fas fa-cloud-rain"></i>',
        heavyRain: '<i class="fas fa-cloud-showers-heavy"></i>',
        sleet: '<i class="fas fa-cloud-meatball"></i>',
        lightSnow: '<i class="fas fa-snowflake"></i>',
        moderateSnow: '<i class="fas fa-snowflake"></i>',
        heavySnow: '<i class="fas fa-snowflake"></i>',
        fog: '<i class="fas fa-smog"></i>',
        humidityIcon: '<i class="fas fa-tint"></i>',
        isolatedCloudsNight: '<i class="fas fa-cloud-moon"></i>'

    };


    async function getWeatherIcon(conditionCode){
        switch (conditionCode) {
            case ("clear"):
                return weatherIcons.clear;
            case ("isolated-clouds"):
                return weatherIcons.isolatedClouds;
            case ("scattered-clouds"):
                return weatherIcons.scatteredClouds;
            case ("overcast"):
                return weatherIcons.overcast;
            case ("light-rain"):
                return weatherIcons.lightRain;
            case ("moderate-rain"):
                return weatherIcons.moderateRain;
            case ("heavy-rain"):
                return weatherIcons.heavyRain;
            case ("sleet"):
                return weatherIcons.sleet;
            case ("light-snow"):
                return weatherIcons.lightSnow;
            case ("moderate-snow"):
                return weatherIcons.moderateSnow;
            case ("heavy-snow"):
                return weatherIcons.heavySnow;
            case ("fog"):
                return weatherIcons.fog;
            case ("isolatedClouds"):
                return weatherIcons.isolatedCloudsNight;
        }
    }


const button = document.querySelector('.butonas');
const inputValue = document.querySelector('.form-control')

button.addEventListener('click', async function(){
    let url = 'https://api.meteo.lt/v1/places/' + inputValue.value + '/forecasts/long-term';
    let response = await fetch(url);
    return await response.json(); 


 });   


    for (let i = 0; i < 24; i++) {
        weatherData [i] = data.forecastTimestamps[i];

        let newHour = new Date(data.forecastTimestamps[i].forecastTimeUtc);

        //---------------stulpelis--------------------------//

        const whatHour = document.createElement("div");
        hours.appendChild(whatHour);
        whatHour.className = "col hour";

        //--------eilute---laikas------//

        let time = document.createElement('div');
        whatHour.appendChild(time);
        time.className = 'row time';
        time.innerText = newHour.getHours() +":00";

        //-----eilute---ikonas------------------//

        let weatherIcon = document.createElement("div");  
        weatherIcon.className = 'row weatherIcon';
        weatherIcon.innerHTML = await getWeatherIcon(weatherData[i]['conditionCode']);
        whatHour.appendChild(weatherIcon);

        //--------eilute------laipsniai-----------------//

        let temp = document.createElement("div");
        whatHour.appendChild(temp);
        temp.className = "row temp";
        temp.innerText = data.forecastTimestamps[i].airTemperature +"°";

        //--------------eilute--krituliu--ikonas---------------------//

        let humidityIcon = document.createElement('div')
        humidityIcon.className = 'row humidityIcon';
        humidityIcon.innerHTML = weatherIcons.humidityIcon
        whatHour.appendChild(humidityIcon) ;

        //--------eilute-----------Krituliai--------------------------//

        let humidity = document.createElement("div")
        whatHour.appendChild(humidity)
        humidity.className = "row rain"
        humidity.innerText = data.forecastTimestamps[i].totalPrecipitation +" %";

        //------------eilute---vejas-----------------------------------//

        let wind = document.createElement("div")
        whatHour.appendChild(wind)
        wind.className = "row wind"
        wind.innerText = data.forecastTimestamps[i].windGust +" m/s";

        //--------------eiilute--vejo-kryptis---------------------//
        let windDirection = document.createElement("div");
        whatHour.appendChild(windDirection);
        wind.classNam = "row windDirection";
        //----------ikoneles------pridejimas---------------//
        let windDirIcon = document.createElement("i");
        windDirection.appendChild(windDirIcon);
        wind.className = "row windDirIcon"
        let degree = data.forecastTimestamps[i].windDirection;
        windDirIcon.className = "wi wi-wind from-" + degree + "-deg"
    
         
    }

async function todayminmax()  {
    for (let i=0; i < 7; i++) {


 let todaydata = Alldata.filter(function (item) {
    let currentDate = new Date();
    let day = currentDate.getDate() + i;
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formatd = year + "-" + month + "-" + day;
    console.log(item.forecastTimeUtc)
    return item.forecastTimeUtc.includes(formatd)

});

    const maxtemp = Math.max(...todaydata.map(o => o.airTemperature));
    
            //isrenka maziausia temp
    const mintemp = Math.min(...todaydata.map(o => o.airTemperature));
    

    const week = document.querySelector(".days")
    let day = document.createElement("div")
    week.appendChild(day)
    //---------------stulpelis--------------------------//
    day.className = "col Day"

     let dayHeader = document.createElement("div")
     dayHeader.className = 'row DayHeader'

     let dayTemp = document.createElement('p')

     day.appendChild(dayHeader)
     day.appendChild(dayTemp)

     dayTemp.innerText = ' Night: ' + mintemp + ' Day: ' + maxtemp;


}

}

    todayminmax();



showData()
}