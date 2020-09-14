const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { scrapeProduct } = require("./scraper");
const configs = require("./api/configs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/configs", configs);

//handling the post request from client
app.post("/scrape", async (req, res) => {
  const config = req.body;
  //console.log(req.body);
  let response = await scrapeProduct(config);
  res.json(response);
});

app.get("/log/:filename", async (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  res.download(`./files/${filename}.log`);
});

app.listen(5000, () => {
  console.log(`listening on port 5000...`);
});
