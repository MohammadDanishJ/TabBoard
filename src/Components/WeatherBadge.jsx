import React, { useRef, useState } from "react";
import { PopoverPopup } from "./Popover";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, FormGroup, Input, Switch } from "@mui/material";

const WeatherBadge = ({
  noLocation = false,
  weatherData,
  setWeatherType,
  weatherMethod,
}) => {
  const [checked, setChecked] = useState(true);
  const locationRef = useRef(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setWeatherType("auto");
    } else {
      setWeatherType("manual");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (locationRef.current.children[0].value.length === 0) return;
    try {
      weatherMethod(locationRef.current.children[0].value);
    } catch (error) {
      console.log(error);
    }
  };

  if (noLocation) {
    return (
      <PopoverPopup
        buttonData={
          <div className="weather">
            <div className="weather-header">
              <img
                src={`${process.env.REACT_APP_WEATHER_API_ICON_URL}50d@2x.png`}
                alt="weather icon"
              />
              <p className="weather-temperature">0&deg;</p>
            </div>
            <p className="weather-city">Select City</p>
          </div>
        }
        popupData={
          <form onSubmit={handleSubmit}>
            <FormGroup sx={{ p: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Automatic"
              />
              {!checked && (
                <>
                  <FormControlLabel
                    sx={{ p: 2 }}
                    control={
                      <Input ref={locationRef} placeholder="Enter Location" />
                    }
                  />
                  <Button type="submit">Save Location</Button>
                </>
              )}
            </FormGroup>
          </form>
        }
      />
    );
  }

  return (
    // <button className="weather" onClick={(e) => PopoverPopup(e.currentTarget)}>
    //   <div className="weather-header">
    //     <img
    //       src={`${process.env.REACT_APP_WEATHER_API_ICON_URL}${weatherData.weather[0].icon}@2x.png`}
    //       alt="weather icon"
    //     />
    //     <p className="weather-temperature">
    //       {Math.round(weatherData.main.temp)}&deg;
    //     </p>
    //   </div>
    //   <p className="weather-city">{weatherData.name}</p>
    // </button>

    <PopoverPopup
      buttonData={
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
      }
      popupData={
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ p: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Automatic"
            />
            {!checked && (
              <>
                <FormControlLabel
                  sx={{ p: 2 }}
                  control={
                    <Input ref={locationRef} placeholder="Enter Location" />
                  }
                />
                <Button type="submit">Save Location</Button>
              </>
            )}
          </FormGroup>
        </form>
      }
    />
  );
};

export default WeatherBadge;
