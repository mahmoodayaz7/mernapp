const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})

//This move to router.js file 
/*app.get('/', (req, res) => {
    res.status(200).json({message: 'Get Goals'})
})*/