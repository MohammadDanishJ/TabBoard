import React from "react";

const WeatherBadge = ({ weatherData }) => {
  return (
    <div className="weather">
      <div className="weather-header">
        <img
          src={`${process.env.REACT_APP_WEATHER_API_ICON_URL}${weatherData.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p className="weather-temperature">
          {Math.round(weatherData.main.temp)}&deg;
        </p>
      </div>
      <p className="weather-city">{weatherData.name}</p>
    </div>
  );
};

export default WeatherBadge;
