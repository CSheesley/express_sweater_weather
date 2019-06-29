var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
// reference Location model

router.get("/", function(req, res, next) {

  let locationSubmit = req.query.location
  let keySubmit = req.body.api_key

  User.findOne({ where: { apiKey: keySubmit } })
  .then(user => {
    if(user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(
        // Forecast Information
        // find or create Location Model, based on locationSubmit
        //  if location - return lat/long
        //  else api call to get lat/long
        //    create location object with lat long
        //  API call for weather information
        //    wrap weather information into HOURLY and DAILY objects
        //    will need to iterate through, with a limit
        //  Serializer to format final output
      );
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send("UNAUTHORIZED" );
    }
  })
});

module.exports = router;
