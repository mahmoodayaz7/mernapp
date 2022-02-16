const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel');


// @desc Register User
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password, dateOfBirth} = req.body;

    if (!name || !email || !password || !dateOfBirth) {
        res.status(400)
        throw new Error('Please enter all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        dateOfBirth
    });

    // Send response
    if(user){
    res.status(201).json({
        success: true,
        token : generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth
        }
    });
} else {
        res.status(400).json({
            success: false,
            message: 'User not created'
        });
    }
    //res.status(200).json({message: 'Register User'})
});

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    
    //check for user email
    
    const {email, password} = req.body;
    
    if (!email || !password) {
        res.status(400)
        throw new Error('Please enter all fields');
    }

    //check for user
    const user = await User.findOne({email});
    if (!user) {
        res.status(400)
        throw new Error('User does not exist');
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400)
        throw new Error('Incorrect password');
    }

    //Send response
    if(user){
    res.status(200).json({
        success: true,
        token : generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth
        }
    });
    }else{
        res.status(400)
        throw new Error('User does not exist');
    }
    
    //res.status(200).json({message: 'Login User'})
})

// @desc Get user data
// @route POST /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    
    const {_id, name, email, dateOfBirth} = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user: {
            id: _id,
            name: name,
            email: email,
            dateOfBirth: dateOfBirth
        }
    });
    
    //res.status(200).json({message: 'User data display'})
})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}