require('dotenv').config();
const express = require('express');
// const path = require('path');
const router = require('./routes.js');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static());

app.use('/', router);

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);