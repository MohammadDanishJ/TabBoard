const currentTimeEl = document.getElementById('currentTimeEl')

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        let backgroundImage = data.urls.regular
        document.body.style.backgroundImage = `url(${backgroundImage})`
        const imageAuthor = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage =
            'url(http://placekitten.com/1000/1000)'
    })

setInterval(() => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString('en-US', {
        timeStyle: 'short',
    })
    currentTimeEl.querySelector('span').textContent = currentTime
        .replace("AM", "").replace("PM", "")
}, 1000)