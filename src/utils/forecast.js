const fetch = require('make-fetch-happen')


const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/a8f2e904cd1550521beba2668a4159f3/' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '?units=si' 
    fetch(url)
    .then(res => res.json())
    .then(body => {
        if(body.code === 400){
            callback('Location not found. Try another search', undefined)
        } else {
            callback(undefined, body.currently.summary + '. It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain with humidity of ' + body.currently.humidity +'.')
        }
    })
    .catch(err => {
        if(err){
            callback('Failed to connect to service!', undefined)
        }
    })
}

module.exports = forecast
