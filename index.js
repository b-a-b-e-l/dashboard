let latitude = ""
let longitude = ""
let key = "0096e74278950fd9325fbc33e0f38fed"

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=cat")
.then(res => res.json())
.then(data => {
document.body.style.backgroundImage = `url("${data.urls.small})`
document.getElementById("author-name").textContent = data.user.first_name + " " + data.user.last_name
console.log(data.urls)
})
.catch(
    document.body.style.backgroundImage = 'url("./images/icen.jpg")'
)

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(res => res.json())
.then(data => {
    document.getElementById("crypto-logo").innerHTML = `
    <img src=${data.image.small} class="doge-icon"/>
    `
    document.getElementById("crypto-name").textContent = `${data.name} price:`
    document.getElementById("current-price").textContent = `${(data.market_data.current_price.eur)} €`
})
.catch(
    document.getElementById("current-price").textContent = "Not available"
)

function updateTime() {
const today = new Date().toLocaleTimeString("en-GB", {hour: '2-digit', minute:'2-digit'})
console.log(today)
document.getElementById("current-time").textContent = today
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(latitude)
        console.log(longitude)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`
            document.getElementById("temperature").textContent = Math.round(data.main.temp)
            document.getElementById("weather-description").textContent = data.weather[0].description
        })
        .catch(
            document.getElementById("temperature").textContent = "Not available"
        )
        })}



getLocation()
updateTime()
setInterval(updateTime, 30000);


