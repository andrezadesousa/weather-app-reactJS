import React, { useState } from "react";
import "./index.css";

import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

export const WeatherApp = () => {

  let api_key = "fcc8ee4ade3fdb4d8967dee84a19b1b5"

  const [wicon, setwIcon] = useState(cloudIcon)

  const search = async () => {
    const element = document.getElementsByClassName("city__input")
    if(element[0].value === ""){
      return 0
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json()

    const humidity = document.getElementsByClassName("humidity__percent")
    const wind = document.getElementsByClassName("wind__rate")
    const temperature = document.getElementsByClassName("weather__temp")
    const location = document.getElementsByClassName("weather__location")

    humidity[0].innerHTML = data.main.humidity+" %"
    wind[0].innerHTML = Math.floor(data.wind.speed)+" km/l"
    temperature[0].innerHTML = Math.floor(data.main.temp)+"°f"
    location[0].innerHTML = data.name

    if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
      setwIcon(clearIcon)
    }else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
      setwIcon(cloudIcon)
    }else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
      setwIcon(drizzleIcon)
    }else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
      setwIcon(drizzleIcon)
    }else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
      setwIcon(rainIcon)
    }else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
      setwIcon(rainIcon)
    }else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
      setwIcon(snowIcon)
    }else{
      setwIcon(clearIcon)
    }

    console.log("AQUII", data.main.humidity)
  }

  return (
    <div className="container">
      <div className="top__bar">
        <input
          type="text"
          className="city__input"
          placeholder="Search"
          name=""
          id=""
        />
        <div className="search__icon" onClick={() => {search()}}>
          <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className="weather__image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather__temp">24</div>
      <div className="weather__location">London</div>

      <div className="data__container">
        <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
                <div className="humidity__percent">64%</div>
                <div className="text">Humidity</div>
            </div>
        </div>

        <div className="element">
            <img src={windIcon} alt="" className="icon"/>
            <div className="data">
                <div className="wind__rate">18 Km/h</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
      
    </div>
  );
};
