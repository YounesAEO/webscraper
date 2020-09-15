const express = require("express");

const { scrapeProduct } = require("./scraper/scraper");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const config = req.body;
    //console.log(req.body);
    let response = await scrapeProduct(config);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
