require('dotenv').config()
const express = require('express');
const router = require('./routes.js');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port);