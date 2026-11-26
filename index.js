require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Request Header Parser Microservice
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip,
    language: req.headers["accept-language"] || "",
    software: req.headers["user-agent"] || ""
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});