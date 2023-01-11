const express = require("express");
const { users } = require('../fish');
const router = express.Router();

const stepTime = 118000;

let timer = stepTime;
let step = 1;
let stepsCount = 1;

setInterval(() => {
  const currentTime = timer - 1000;
  
  if(currentTime < 0){
    nextStep();
  } else {
    timer = currentTime
  }
}, 1000);

const nextStep = () => {
  step = step + 1 > users.length ? 1 : step + 1;
  timer = stepTime;
  stepsCount++;

  if(stepsCount === 30){
    stepsCount = 1;
    step = 1
  }
}

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    timeLeft: timer,
    step: step,
  });
});

module.exports = router;