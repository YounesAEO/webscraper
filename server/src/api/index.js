const express = require("express");

const scrape = require("./scrape");
const configs = require("./configs");
const log = require("./log");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/scrape", scrape);
router.use("/configs", configs);
router.use("/log", log);

module.exports = router;
