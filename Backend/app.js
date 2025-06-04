const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const connectDB = require('./db/db');
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app;