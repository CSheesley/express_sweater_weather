var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;

const fetch = require('node-fetch');
const google_api_url = 'https://maps.googleapis.com/maps/api/geocode/json?';
const dark_sky_api_url = 'https://api.darksky.net/forecast';

router.get("/", function(req, res, next) {

  let locationSubmit = req.query.location
  let keySubmit = req.body.api_key

  let splitLocation = locationSubmit.split(",");
  let city = splitLocation[0];
  let state = splitLocation[1];

  User.findOne({ where: { apiKey: keySubmit } })
    .then(user => {
      if(user) {
        if(city && state) {

          Location.findOne({ where: { city: city, state: state } })
          .then(location => {
            if(location) {
              let latitude = location.latitude
              let longitude = location.longitude

              return { latitude: latitude, longitude: longitude };
            } else {
              //GEOCODING API CALL - for lat long
              return fetch(`${google_api_url}address=${city},${state}&key=${process.env.GOOGLE_API_KEY}`)
                .then(response => response.json())
                .then(location => {
                  let latitude = location.results[0].geometry.location['lat']
                  let longitude = location.results[0].geometry.location['lng']

                Location.create({
                  city: city,
                  state: state,
                  latitude: latitude,
                  longitude: longitude
                })
                return { latitude: latitude, longitude: longitude };
              })
            }
          })
          .then(coordinates => {
            //DARK SKY API CALL - for weather data
            let latitude = coordinates.latitude
            let longitude = coordinates.longitude

            return fetch(`${dark_sky_api_url}/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?exclude=minutely,alerts,flags`)
              .then(response => response.json())
              .then(weatherData => {
                let location = `${city}, ${state}`
                let currently = weatherData.currently
                let hourly = weatherData.hourly.data.slice(0, 8);
                let daily = weatherData.daily.data.slice(0, 7);

                for (let [index, hour] of hourly.entries()) {
                  hourly[index] = {
                    "time": hour.time,
                    "summary": hour.summary,
                    "icon": hour.icon,
                    "precipIntensity": hour.precipIntensity,
                    "precipProbability": hour.precipProbability,
                    "temperature": hour.temperature,
                    "humidity": hour.humidity,
                    "pressure": hour.pressure,
                    "windSpeed": hour.windSpeed,
                    "windGust": hour.windGust,
                    "windBearing": hour.windBearing,
                    "cloudCover": hour.cloudCover,
                    "visibility": hour.visibility
                  }
                }

                for (let [index, day] of daily.entries()) {
                  daily[index] = {
                    "time": day.time,
                    "summary": day.summary,
                    "icon": day.icon,
                    "sunriseTime": day.sunriseTime,
                    "sunsetTime": day.sunsetTime,
                    "precipIntensity": day.precipIntensity,
                    "precipIntensityMax": day.precipIntensityMax,
                    "precipIntensityMaxTime": day.precipIntensityMaxTime,
                    "precipProbability": day.precipProbability,
                    "precipType": day.precipType,
                    "temperatureHigh": day.temperatureHigh,
                    "temperatureLow": day.temperatureLow,
                    "humidity": day.humidity,
                    "pressure": day.pressure,
                    "windSpeed": day.windSpeed,
                    "windGust": day.windGust,
                    "cloudCover": day.cloudCover,
                    "visibility": day.visibility,
                    "temperatureMin": day.temperatureMin,
                    "temperatureMax": day.temperatureMax
                  }
                }

                let output =
                {
                  "location": location,
                  "currently": currently,
                  "hourly": {
                    "summary": weatherData.hourly.summary,
                    "icon": weatherData.hourly.icon,
                    "data": hourly
                  },
                  "daily": {
                    "summary": weatherData.daily.summary,
                    "icon": weatherData.daily.icon,
                    "data": daily
                  }
                }

                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(output));
              })
          })
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(409).send("CONFLICT: Must include City(full name) and State(abbrev)" );
        }
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send("UNAUTHORIZED" );
      }
    })
});

module.exports = router;
