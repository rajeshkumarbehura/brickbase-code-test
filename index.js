const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./src/routes/events');
const db = require('./src/config/db');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: true}),)
    .use(bodyParser.json());


app.use("/api/v1", eventRoutes)
    .use(function (req, res) {
        return res.status(404).send({message: 'Route' + req.url + ' Not found.'});
    })
    .use(cors);

app.listen(PORT, () => console.log('Application listening in port ', PORT));

module.exports = app;