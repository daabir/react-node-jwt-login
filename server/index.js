const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
dotenv.config();

const refreshTokens = [];

const verify = () => {

}

const generateAccessToken = () => {

}

const generateRefreshToken = () => {

}

app.get('/',(req,res) => {
    res.send("Homepage for testing.")
});

app.post('/login', (req,res)=>{
    const { userData } = req.body;

});

app.post('/register', (req,res)=>{
    const { userData } = req.body;
});

app.get('/home', (req,res)=>{
    
});

app.listen(4000, () => {
    console.log("Listening at 4000")
});