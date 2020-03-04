const dotenv = require("dotenv");
dotenv.config();

// Requiring dependencies
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var aylien = require("aylien_textapi");

// Setup empty JS object to act as an endpoint
let projectData = {};

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log("Example app listening on port 8081!");
});

app.post("/sentiment", (req, res) => {
  const urlUser = req.body.url;
  textapi.sentiment({ url: urlUser }, (error, response) => {
    if (error === null) {
      projectData["polarity"] = response.polarity;
      projectData["subjectivity"] = response.subjectivity;
      projectData["text"] = response.text;

      res.send(projectData);
      console.log(projectData);
    } else {
      console.log(error, "Error");
    }
  });
});
