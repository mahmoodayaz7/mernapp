const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');

const protect = asyncHandler(async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    const token = authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    req.user = user;
    next();

})

module.exports = {protect,};