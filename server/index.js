const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { scrapeProduct } = require("./scraper");

const app = express();
app.use(cors());
app.use(express.json());

//handling the post request from client
app.post("/config", async (req, res) => {
  const config = req.body;
  //console.log(req.body);
  let response = await scrapeProduct(config);
  res.json(response);
});

app.get("/log", async (req, res) => {
  res.download("./files/logs.txt");
});

app.listen(5000, () => {
  console.log(`listening on port 5000...`);
});
