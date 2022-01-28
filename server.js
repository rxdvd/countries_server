const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const Country = require("./models/country");

app.get("/country", (req, res) => {
  const countryData = Country.all;
  res.status(200).json(countryData);
});

app.get("/country/:id", (req, res) => {
  try {
    const countryId = parseInt(req.params.id);
    const selectedCountry = Country.findById(countryId);
    res.status(200).json(selectedCountry);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

app.post("/country", (req, res) => {
  const data = req.body;
  const newCountry = Country.create(data);
  res.status(201).json(newCountry);
});

app.post("/country/edit/:id", (req, res) => {

  try {
    const countryId = parseInt(req.params.id);
    const data = req.body;
    Country.editCountry(countryId, data);
    res.status(200).send('country has been edited');
  } catch (err) {
    console.log(err);
    res.status(404).send("country can not be edited");
  }
});

app.delete("/country/:id", (req, res) => {
  const countryId = parseInt(req.params.id);
  const countryToDelete = Country.findById(countryId);
  const reply = countryToDelete.deleteCountry();
  res.status(200).json(reply);
});

app.post("/", (req, res) => {
  res.status(405).send("Not allowd!");
});

module.exports = { app };
