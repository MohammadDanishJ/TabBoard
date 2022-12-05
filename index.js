const currentTimeEl = document.getElementById('currentTimeEl')
const weather = document.getElementById('weather')
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

navigator.geolocation.getCurrentPosition(position => {
    // prettier-ignore
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=b186569fa5afd008ec39a6e0248dccb3`)
        .then(res => {
            if (!res.ok) {
                throw Error('Weather data not available.')
            }
            return res.json()
        })
        .then(data => {
            const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            const city = data.name
            const temperature = Math.round(data.main.temp)

            weather.innerHTML = `
                    <div class="weather-header">
                        <img src=${iconURL} />
                        <p class="weather-temperature">${temperature}&deg;</p>
                    </div>
                    <p class="weather-city">${city}</p>
                `
        })
        .catch(err => console.error(err))
})
