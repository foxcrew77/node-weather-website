const fetch = require('make-fetch-happen')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9kZWpzMDA3IiwiYSI6ImNrNnFoM2tqOTFzeGIzZHBmM3FzOHdlNmQifQ.ZbOL-Vq3zs12vNlgMOFSUQ&limit=1'
    fetch(url)
    .then(res => res.json())
    .then(body => {
        callback(undefined, {
          latitude: body.features[0].geometry.coordinates[0],
          longitude: body.features[0].geometry.coordinates[1],
          location: body.features[0].place_name
        })
    })
    .catch(error => {
      if(error.name === "TypeError"){
        callback({
          error: 'Location not found. Try another search!'
        }, undefined)
      } else {
        callback({
          error: 'Failed to connect to service!!'
        }, undefined)
      }
    })
  }

module.exports = geocode
