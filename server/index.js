const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("./models/User");

app.use(express.json());
app.use(cors());
dotenv.config();

let refreshTokens = [];
const secret = process.env.ACCESS_SECRET
const refSecret = process.env.REFRESH_SECRET

const connect = async() => {
    try{
        await mongoose.connect(process.env.URI);
        console.log("Connected to mongoDb")
    } catch(err){
        console.error(err);
    }
}

const verify = (req, res, next) => {
    const authHeader = req.headers.authtoken;
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
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                })
            }
        })
    }
})

app.post('/login', async (req,res)=>{
    const { userData } = req.body;
    // console.log(userData)
    const user = await User.findOne({username:userData?.userId})
    if(!user){
        res.send({message:"User does not exist!"});
    }else if(userData?.password !== user.password){
        res.send({message: "Auth failed"});
    }else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.send([{username: user?.username, isAdmin: user?.isAdmin, accessToken, refreshToken}]);
    }
});


app.post('/logout', verify, (req,res)=>{
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);
    res.send(new Response ("Logout success", {status : 200}))
})


app.post('/register', async (req,res)=>{
    const newUser = new User(req.body);
    try{
        const saveUser = await newUser.save();
        res.send(new Response("Registration successful",{status: 200}))
    } catch(e){
        res.send(new Response("Registration failed",{status:501}))
        console.error(e);
    }
});

app.get('/home', verify, (req,res)=>{
    
});

app.listen(4000, () => {
    console.log("Listening at 4000")
    connect();
});