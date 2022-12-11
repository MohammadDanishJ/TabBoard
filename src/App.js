import React, { useEffect, useState } from 'react'
import WeatherBadge from './Components/WeatherBadge';
import './style.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentTimeEl = document.getElementById('currentTimeEl')
    const imageAuthorEl = document.getElementById('imageAuthor')

    fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
      .then(res => res.json())
      .then(data => {
        let backgroundImage = data.urls.regular
        document.body.style.backgroundImage = `url(${backgroundImage})`
        imageAuthorEl.innerHTML = `Author: <strong>${data.user.name}</strong>`
      })
      .catch(err => {
        document.body.style.backgroundImage =
          'url(http://placekitten.com/1000/1000)'
      })
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setInterval(() => {
      const date = new Date()
      const currentTime = date.toLocaleTimeString('en-US', {
        timeStyle: 'short',
      })
      currentTimeEl.querySelector('span.time').textContent = currentTime.replace("AM", "").replace("PM", "")
      currentTimeEl.querySelector('span.date').textContent = `${weekday[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }, 1000)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const response = await fetch(`${process.env.REACT_APP_WEATHER_API_URL}?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        const data = await response.json()
        setData(data)
      }
      );
    }
    fetchData();
  }, [])

  return (
    <main>
      <div className="top fl-j-fe">
        {(typeof data.main != 'undefined') ? (
          <>
            <WeatherBadge weatherData={data} />
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div className="center">
        <div id="currentTimeEl" className="current_time fl fl-c fl-d-col p-rel lhinit">
          <span className="time"></span>
          <span className="date text-center"></span>
        </div>
      </div>
      <div className="bottom">
        <div id="imageAuthor" className="fl fl-c"></div>
      </div>
    </main>
  )
}

export default App