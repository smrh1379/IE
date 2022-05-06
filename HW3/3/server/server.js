const cities = require('./cities.json');
const detail = require('./detail.json');

const express = require('express');
const app = express();

app.get('/cities/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(cities);
});

app.get('/cities/:id/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(detail[req.params.id - 1]);
});

app.listen(9000);
