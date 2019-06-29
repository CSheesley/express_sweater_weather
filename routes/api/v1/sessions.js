var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Log a user in
router.post("/", function(req, res, next) {

  let userEmail = req.body.email
  let userPassword = req.body.password

  User.findOne({ where: { email: userEmail } })
  .then(user => {
    if(user) {
      var hash = user.password;
      bcrypt.compare(userPassword, hash, function(err, response) {
        if(response === true) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send( { api_key: user.apiKey} );
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(409).send("CONFLICT: Invalid Password" );
          }
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(409).send("CONFLICT: User does not exist" );
    }
  })
});

module.exports = router;
