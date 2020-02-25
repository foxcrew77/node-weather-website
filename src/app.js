const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //dynamic page with templating
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {  //route handler
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Andrew Mead',
        message: 'This is a help page'
    })
})

app.get('/Weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'Please specify an address'
        })
    } 
    geocode(address, (error, {longitude, latitude, location} ={}) => {
        if(error){ 
            console.log(error)
            return res.send (error)
         }
        forecast(longitude, latitude, (error, forecastdata) => {
            if(error) { return res.send (error) }
            res.send({
                location,
                forecast : forecastdata,
                address
            })
        })
    })
})



app.get('/products', (req, res) => { //cant send two responds, so put return
if(!req.query.search){
    return res.send({
        error: 'You must provide a search term'
    })
}

    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Help article not found',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        error: 'Page not found',
        name: 'Andrew Mead'
    })
})

app.listen(port, () => {   //start the server
    console.log('Server is up on port ' + port)
})