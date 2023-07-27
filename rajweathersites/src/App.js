import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const api = {
  key: "718e1485fb49ee8f003baf67269de9f2",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year} ,${day} `
  }
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          if (result){
            console.log(result);
          }
          else{
            console.log("No City Data Found.")
          }
        });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    <main className="container-fluid WeatherContentSty">
      <div class="container p-3">
      <h2 className="font-italic text-center p-3">
      <img src={require('./images/Logos/RajSites_Logo.png')} alt="CloudWinds" className="img-fluid imglogo-sty" width={40} height={40}/>&nbsp;<span>Raj Weather Sites</span></h2>
      <div className="search-box d-flex">
        <input 
          type="text"
          className="search-bar form-control me-2"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div className="weatherbgcontainer w-100 text-center">
        <div className="weatherbgcontent bg-colorsty p-3 m-4 font-italic">
        <h4 className="date">{dateBuilder(new Date())}</h4>
        <h4 className="font-italic text-center p-2">Location is {weather.name}, {weather.sys.country}</h4>
          <img src={require('./images/Clouds.png')} alt="Clouds" width={200} height={200}/>
        <h5 className="font-italic text-center">Weather: {weather.weather[0].main} ({weather.weather[0].description})</h5>
        <h5 className="p-2">Co-ordinates are {weather.coord.lon}, {weather.coord.lat}</h5>
        <div className="row">
          <div className="col">
          <table className="table">
  <tbody>
    <tr>
      <th scope="row" className="rowsty">Sun Rises At</th>
      <td>{new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</td>
    </tr>
    <tr>
      <th scope="row" className="rowsty">Feels Like</th>
      <td>{weather.main.feels_like} °C</td>
    </tr>
    <tr>
    <th scope="row" className="rowsty">Humidity</th>
      <td>{weather.main.humidity} G.m -3</td>
    </tr>
    <tr>
    <th scope="row" className="rowsty">Pressure</th>
      <td>{weather.main.pressure/1000} atm</td>
    </tr>
    </tbody>
    </table>
    </div>
          <div className="col">
          <table className="table">
  <tbody>
  <tr>
      <th scope="row" className="rowsty">Sunsets At</th>
      <td>{new Date(weather.sys.sunset*1000).toLocaleTimeString()}</td>
    </tr>
    <tr>
      <th scope="row" className="rowsty">Temparature</th>
      <td>{weather.main.temp} °C</td>
    </tr>
    <tr>
      <th scope="row" className="rowsty">Maximum Temparature</th>
      <td>{weather.main.temp_max} °C</td>
    </tr>
    <tr>
      <th scope="row" className="rowsty">Minimum Temparature</th>
      <td>{weather.main.temp_min} °C</td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <img src={require('./images/Cloud_with_Wind.png')} alt="CloudWinds" width={175} height={175}/>
          <h5 className="font-italic text-center pt-2 pb-2">Speed: {weather.wind.speed} mph</h5>
          </div>
          <div className="col">
          <img src={require('./images/Wind_Direction_Compass.png')} alt="CloudWinds" width={175} height={175}/>
          <h5 className="font-italic text-center pt-2 pb-2">Direction: {weather.wind.deg}°</h5>
          </div>
          {(typeof weather.wind.gust != "undefined") ? (
          <div className="col">
            <img src={require('./images/Wind_Gust.png')} alt="CloudWinds" width={175} height={175}/>
            <h5 className="font-italic text-center pt-2 pb-2">Gust: {weather.wind.gust} Knots</h5>
          </div>
          ) : (<div></div>)
        }
        </div>
       </div>
      </div>
      // //<div>
      //   <div className="location-box">
      //     <div className="location">{weather.name}, {weather.sys.country}</div>
      //     <div className="date">{dateBuilder(new Date())}</div>
      //   </div>
      //   <div className="weather-box">
      //     <div className="temp">
      //       {Math.round(weather.main.temp)}°c
      //     </div>
      //     <div className="weather">{weather.weather[0].main}</div>
      //   </div>
      // </div>
      ) : (
        <div className="NoDetailBgSty text-center">
        <h6 className="fst-italic p-2">Sorry! Please try with another city name.</h6>
        <div className="row">
          <div className="col text-center"><img src={require('./images/ErrorImg/Oops_Err.gif')} alt="CloudWinds" width={300} height={300}/></div>
          <div className="col text-center"><img src={require('./images/weather-forecasts.png')} alt="CloudWinds" width={300} height={300}/></div>
        </div>
        
        
        </div>
      )}
      </div>
    </main>
  </div>
  );
}

export default App;
