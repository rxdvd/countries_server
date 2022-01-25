const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())

const Country = require('./models/country')

app.get('/country', (req, res) => {
    const countryData = Country.all;
    res.status(200).send(countryData);
});

app.get('/country/:id', (req, res) => {
    try {
        const countryId= parseInt(req.params.id);
        const selectedCountry = Country.findById(countryId);
        res.status(200).json(selectedCountry);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

app.post('/country', (req, res) => {
    const data = req.body;
    const newCountry = Country.create(data);
    res.status(201).send(newCountry);
});

app.delete('/country/:id', (req, res) => {
    const countryId = parseInt(req.params.id);
    const countryToDelete = Country.findById(countryId);
    countryToDelete.deleteCountry();
    res.status(204).send();
});

app.post('/', (req, res) => {
    res.status(405).send('Not allowd!');
});


module.exports = {app}

