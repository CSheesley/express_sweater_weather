var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;

const fetch = require('node-fetch');
const google_api_url = 'https://maps.googleapis.com/maps/api/geocode/json?'

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
              // API call to return lat, long
              return fetch(`${google_api_url}address=${city},${state}&key=${process.env.GOOGLE_API_KEY}`)
              .then(response => response.json())
              .then(location => {
                let latitude = location.results[0].geometry.location['lat']
                let longitude = location.results[0].geometry.location['lng']
                // if clause for lat long return
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
            // Dark Sky API Weather Call
            res.setHeader("Content-Type", "application/json");
            res.status(200).send( 'Dark Sky Api Weather Data to come' );
          })
          //  API call for weather information
          //    wrap weather information into HOURLY and DAILY objects
          //    will need to iterate through, with a limit
          //  Serializer to format final output
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
