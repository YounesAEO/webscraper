const express = require("express");

const router = express.Router();

router.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  res.download(`./src/files/${filename}.log`);
});

module.exports = router;
