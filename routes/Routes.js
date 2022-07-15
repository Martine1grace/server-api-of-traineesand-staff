
// const express = require("express")
// const router = express.Router();
// const fs = require('fs');

// const traineeRoutes = require('./trainee') ;
// router.use(traineeRoutes) 


// module.exports = traineeRoutes;

const traineeRoutes = require('../controller/trainee');

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  traineeRoutes(app, fs);
};


module.exports = appRouter;