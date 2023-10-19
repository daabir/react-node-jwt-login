const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
dotenv.config();

app.listen(4000, () => {
    console.log("Listening at 4000")
});