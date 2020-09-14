const express = require("express");
const monk = require("monk");

const router = express.Router();
const db = monk("localhost/data-scraping");
const scraper_configs = db.get("configs");
router.get("/", async (req, res, next) => {
  try {
    const items = await scraper_configs.find({});
    // console.log("config data sent from database");
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    res.json({ message: "READ One" });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  try {
    const inserted = await scraper_configs.insert(req.body);
    res.json(inserted);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  res.json({
    message: "Update one",
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await scraper_configs.remove({
      _id: id,
    });
    res.json({ message: "deleted successfully" });
  } catch (error) {}
});

module.exports = router;
