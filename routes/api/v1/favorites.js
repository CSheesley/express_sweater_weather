var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Location = require('../../../models').Location;
var Favorite = require('../../../models').Favorite;

const fetch = require('node-fetch');
const google_api_url = 'https://maps.googleapis.com/maps/api/geocode/json?';
const dark_sky_api_url = 'https://api.darksky.net/forecast';

router.post("/", function(req, res, next) {

  let locationSubmit = req.body.location
  let keySubmit = req.body.api_key

  let splitLocation = locationSubmit.split(",");
  let city = splitLocation[0];
  let state = splitLocation[1];

  User.findOne({ where: { apiKey: keySubmit } })
    .then(user => {
      if(user) {
        if(city && state) {

          let cityFormatted = city.toLowerCase();
          let stateFormatted = state.toLowerCase().trim();

          Location.findOne({ where: { city: cityFormatted, state: stateFormatted } })
            .then(location => {
              if(location) {
                Favorite.create({
                  UserId: user.id,
                  LocationId: location.id
                })

                output = `${location.city}, ${location.state} has been added to your favorites`
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(output);
              } else {
                return fetch(`${google_api_url}address=${city},${state}&key=${process.env.GOOGLE_API_KEY}`)
                  .then(response => response.json())
                  .then(location => {
                    let latitude = location.results[0].geometry.location['lat']
                    let longitude = location.results[0].geometry.location['lng']

                    Location.create({
                      city: cityFormatted,
                      state: stateFormatted,
                      latitude: latitude,
                      longitude: longitude
                    })
                    .then(location => {

                      Favorite.create({
                        UserId: user.id,
                        LocationId: location.id
                      })

                    output = `${location.city}, ${location.state} has been added to your favorites`
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(output);
                  })
                })
              }
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
