const express = require("express");
const { users, params } = require('../fish');
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    users: users,
    params: params,
  });
});

module.exports = router;