// const
// //
// //     async function getData(city){
// //     let url = 'https://api.meteo.lt/v1/places/'+city+'/forecasts/long-term';
// //     let response = await fetch(url);
// //     return await response.json();
// //
// // }
// //
// // async function showData() {
// //     const data = await getData ('Kaunas');
// //
// //
// //
// //
// //
// //     console.log(data)
// // }
// //
// // showData()
const addCity = document.querySelector('button');
const cityName = document.querySelector('input');
const citys = document.querySelector('.antraste');

addCity.addEventListener('click', addTheCity);

function addTheCity(){
    const city2 = document.createElement('h2')
    city2.textContent=cityName.value;
    citys.appendChild(city2);
}


let weather;
let place = document.querySelector('input'); //paieskos inputas
let city;
city = place.addEventListener('input',  e => {
    const fetchWeather = async (callback) => {
        weather = await fetch(
            'https://api.meteo.lt/v1/places/'+e.target.value+'/forecasts/long-term'
        ).then(res => res.json());
    };
//Filter today
    function today(value){
        return  value.forecastTimeUtc.includes('2019-12-10');
    }
    const showWeather = async () => {
        // getting the weather data from api
        await fetchWeather(city);
        let weatherItems = weather.forecastTimestamps; //duomenys
        weatherItems = weatherItems.filter(today)
        //Rendering
        const weatherUiItems = document.querySelector('ul');
        city  = weather.place.name;
        const location = document.createElement('h2');
        location.textContent = city;
        document.querySelector('div').appendChild(location)
        //console.log(weatherItems)
        for(weatherItem of weatherItems){
            console.log(weatherItem)
            for(ItemValue in weatherItem){ //1
                const li = document.createElement('div');
                li.textContent = ItemValue+':'+weatherItem[ItemValue];
                document.querySelector('ul').appendChild(li);
            }
        }
    }
    showWeather()
});