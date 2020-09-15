const express = require("express");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./errorHandlers");
const api = require("./api");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
