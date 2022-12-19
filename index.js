require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const validator = require("validator");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", async (req, res) => {
  const { url } = req.body;

  if (!validator.isURL(url)) {
    return res.json({ error: "Invalid URL" });
  }

  const randomNumber = Math.floor(Math.random() * 10000);

  app.get(`/api/shorturl/${randomNumber}`, (req, res) => {
    res.redirect(url);
  });

  res.json({ original_url: url, short_url: randomNumber });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
