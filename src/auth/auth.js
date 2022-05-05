/******************  SERVER  ******************/
const express = require('express');
const Router = require('express')
const authWebRouter = new Router();

/******************  JWT  ******************/

const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "myprivatekey";

function generateToken(user) {
  const token = jwt.sign({data: user}, PRIVATE_KEY, { expiresIn: '24h' });
  return token;
}


//middleware to authenticate
function userAuthorization(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Not Authenticated'
    });
  }

  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(authHeader, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'Not Authorized'
      });
    }

    req.user = decoded.data;
    console.log("Hay autorización")
    return next(); // go to the middleware or endpoint
  });
};

/******************  DATABASE  ******************/

const users = [
  {
    id: 123,
    role: "basic",
    name: "Basic Thomas",
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    id: 434,
    role: "premium",
    name: "Premium Jim",
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];


/******************  MIDDLEWARES  ******************/

authWebRouter.use(express.json())

/******************  ROUTES  ******************/


// LOGIN
authWebRouter.post('/user', (req, res) => {

    const { username, password } = req.body
  
    const user = users.find(user => user.username == username && user.password == password)
    if (!user) {
      return res.json({ error: 'Invalid Credentials' });
    }
  
    const access_token = generateToken(user)
    res.json({ access_token })
  })
  
  // DATOS
authWebRouter.get('/user', userAuthorization, (req, res) => {
    const user = users.find(user => user.username == req.user.username);

    res.json(user)
  })
  
module.exports = authWebRouter, userAuthorization()