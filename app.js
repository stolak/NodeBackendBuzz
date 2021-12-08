require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/public')));


// Logic goes here

module.exports = app;