const mongoose = require('mongoose');   //import mongoose
const Schema = mongoose.Schema;         //import Schema

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date
},
{
    timestamps: true
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;