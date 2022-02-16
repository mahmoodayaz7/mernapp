const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser) //registerUser is a function
router.post('/login', loginUser) //loginUser is a function
router.get('/me', protect, getMe) //getMe is a function


module.exports = router