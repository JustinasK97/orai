async function getData(city){
   let url = 'https://api.meteo.lt/v1/places/'+city+'/forecasts/long-term';
   let response = await fetch(url);
   return await response.json();

}

async function showData() {
    const data = await getData ('Kaunas');





    console.log(data)
}

showData()