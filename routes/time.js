const express = require("express");
const mongoose = require('mongoose');
const LastUpdate = require('../models/last-update');
const { users } = require('../fish');

const Schema = mongoose.Schema;
const router = express.Router();

const STEP_TIME = 120000;

let stepUpdate = 1;
const nextStep = () => stepUpdate = stepUpdate + 1 > users.length ? 1 : stepUpdate + 1;

let timeLeftUpdate = 0;
let data = {};

router.get("/", async (req, res, next) => {
  await LastUpdate
    .find()
    .then((updates) => data = updates[updates.length - 1])
    .catch((error) => console.log(error));

  const {lastCall, step, timeLeft} = data;
  
  stepUpdate = step;
  let diff = new Date().getTime() - lastCall;

  if(diff > timeLeft){
    nextStep();
    
    timeLeftUpdate = diff - timeLeft;
  
    while(timeLeftUpdate > STEP_TIME){
      nextStep();
      timeLeftUpdate = timeLeftUpdate - STEP_TIME;
    }
  } else {
    timeLeftUpdate = timeLeft - diff; 
  }

  const post = new LastUpdate({
    lastCall: new Date().getTime(),
    step: stepUpdate,
    timeLeft: timeLeftUpdate,
  });

  post
    .save()
    .then()
    .catch((error) => console.log(error));

  return res.status(200).json({
    timeLeft: timeLeftUpdate,
    step: stepUpdate,
  });
});

module.exports = router;