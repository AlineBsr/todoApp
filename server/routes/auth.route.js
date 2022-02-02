const express = require("express");
const routeAuth = express.Router(); 
const User = require("../models/user.model");

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)

//Create
routeAuth.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save()
    .then( () => {      
      console.log( user.username + " is registered successfully")
      res.status(200).send(data) 
    })
    .catch( (err) => res.status(400).send(err) )
})

//Read 
routeAuth.post("/connexion", (req, res) => {
  // https://docs.mongodb.com/drivers/node/current/usage-examples/findOne/
  // https://www.bezkoder.com/node-js-express-login-mongodb/
  User.findOne({})
  // User.findOne( (err, data) => {
  // console.log(req.body)
// 
    // if(err) { res.send(err) }
    // res.status(200).send(data)
    // console.log(data.username)
    // res.send( )
  // })
  // })
})


module.exports = { routeAuth };