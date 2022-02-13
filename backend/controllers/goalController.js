const asyncHandler = require('express-async-handler')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'Get Goals'})
})

// @desc Set Goals
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
    //console.log(req.body)
    if (!req.body.text){
        res.status(400) //.json({message: 'Please add a text field'})
        throw new Error('Please add a text field')
    }

    res.status(200).json({message: 'Set Goals'})
})

// @desc Update Goals
// @route PUT /api/goals/id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})
})


// @desc Delete Goals
// @route DELETE /api/goals/id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}