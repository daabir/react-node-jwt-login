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
const secret = "thisShouldBeYourSecretString"
const refSecret = "thisWillbeYourRefreshString"

const verify = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user)=>{
            if(err){
                res.send({ message: "Access Forbidden!" });
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        res.send({ message: "Authentication Failed!" });
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({id : user.id, isAdmin : user.isAdmin}, secret, {
        expiresIn: "15m"
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({id : user.id, isAdmin : user.isAdmin}, refSecret);
}

app.get('/',(req,res) => {
    res.send("Homepage for testing.")
});

app.post('/refreshToken', (req,res) => {
    const refreshToken = req.body.token;
    if(!refreshToken){
        res.send({ message: "Authentication Failed" })
    } else if(!refreshTokens.includes(refreshToken)){
        res.send({ message: "Invalid Token Received!"})
    } else {
        jwt.verify(refreshToken, refSecret, (err, user)=>{
            if(err){
                console.error(err);
            } else {
                refreshTokens = refreshTokens.filter((token)=> token !== refreshToken);
                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);
                refreshTokens.push(newRefreshToken);
                res.send({
                    accessToken: newAccessToken;
                    refreshToken: newRefreshToken
                })
            }
        })
    }
})

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