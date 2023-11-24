var express = require("express")
const jwt = require('jsonwebtoken');
const User = require('../models/User')
var userRoutes = express.Router();
userRoutes.use(express.json())

userRoutes.post("/signup", async (req,res)=>{
 
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
        return res.status(409).json({ status: false, message: 'Username or email already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save()
    
    res.status(201).json({ status: true, message: 'User registered successfully' });
  
 
})





userRoutes.post("/login", async (req,res)=>{
    const { username,email, password } = req.body;
    let user = await User.findOne({ $or: [{ username: username }, { email: email }] })
    
    if (!user) {
        return res.status(401).json({ status: false, message: 'Invalid Username or Email and Password' });
    }

    if (user.password !== password) {
        return res.status(401).json({ status: false, message: 'Invalid Password' });
    }

    const token = jwt.sign({ userId: user._id }, 'asd123asd123qweasdwrt', { expiresIn: '1h' });

    res.status(200).json({
        status: true,
        username: user.username,
        message: 'User logged in successfully',
        jwt_token: token,
    });
});

module.exports = userRoutes