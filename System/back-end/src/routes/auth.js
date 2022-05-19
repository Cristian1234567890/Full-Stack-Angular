const express = require("express");
const router = express.Router();

// Importing Models Student and Course from model.js
const { User, Client } = require('../models/schemas');

const bcrypt = require("bcrypt");
const rounds = 10;

const jwt = require("jsonwebtoken");
const tokenSecret = "1234567890";

const middleware = require("../middlewares");

var request = require('request');


/* to login and get jwt token */

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(404).json({ error: "no user with that email found" });
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error);
          else if (match) res.status(200).json({token:`${generateToken(user)}`});
          else res.status(403).json({ error: "passwords do not match" });
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});



/* to signu up into the db */

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          const newUser = User({ email: req.body.email, password: hash });
          newUser
            .save()
            .then((user) => {
              /* res.status(200).json({ token: generateToken(user) }); */
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        } else {
          res.status(404).json({ error: "User email duplicated" });
        }
      });
    }
  });
});

/* connect to python microservice */

router.post("/servicio", (req, res) => {
  
  request.post(
    'http://localhost:80/evaluate',
    { json: {CLIENTNUM: req.body.CLIENTNUM} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.status(200).json(body);
        }else{
          console.log(error);
        }
    });
    
});



/* to get cliente specs */

router.post("/client", (req, res) => {
    Client.findOne({ CLIENTNUM: req.body.CLIENTNUM })
      .then((cliente) => {
        if (!cliente)
          res.status(404).json({ error: "El cliente no existe" });
        else{
            res.status(200).json({ 
                CLIENTNUM: cliente.CLIENTNUM,
                Attrition_Flag: cliente.Attrition_Flag,
                Customer_Age: cliente.Customer_Age,
                Gender: cliente.Gender,
                Education_Level: cliente.Education_Level,
                Marital_Status:cliente.Marital_Status,
                Income_Category: cliente.Income_Category,
                Card_Category: cliente.Card_Category,
                Months_on_book: cliente.Months_on_book,
                Months_Inactive_12_mon: cliente.Months_Inactive_12_mon,
                Credit_Limit: cliente.Credit_Limit,
                
            });
        }
    });
});


/* To verify routes */
router.get("/jwt-test", middleware.verify, (req, res) => {
  res.status(200).json(req.user);
});


/* to generate tokens */
function generateToken(user) {
  return jwt.sign({data:user },tokenSecret, {expiresIn: "24h"});
}

module.exports = router;
