var pry = require('pryjs');

var express = require("express");
var router = express.Router();
var User = require('../../../models').User;

const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create new user
router.post("/", function(req, res, next) {

  let userEmail = req.body.email
  let userPassword = req.body.password
  let userPasswordConfirmation = req.body.password_confirmation

  User.findOne({ where: { email: userEmail } })
    .then(user => {
        if(user) {
          res.setHeader("Content-Type", "application/json");
          res.status(409).send("CONFLICT: User Already Exists" );
      }
        else {
          if(userPassword === userPasswordConfirmation) {
            bcrypt.hash(userPassword, saltRounds, function(err, hash) {
              User.create({
                email: req.body.email,
                password: hash,
                apiKey: uuidv1()
              })
              .then(user => {
                res.setHeader("Content-Type", "application/json");
                res.status(201).send( { api_key: user.apiKey} );
              })
              .catch(error => {
                res.setHeader("Content-Type", "application/json");
                res.status(500).send({ error });
              });
            });
          }
          else {
            res.setHeader("Content-Type", "application/json");
            res.status(409).send("CONFLICT: Passwords Must Match" );
          }
        }
      }
  )
});

module.exports = router;
