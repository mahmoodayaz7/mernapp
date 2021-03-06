const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler( async (req, res) => {
    //res.status(200).json({message: 'Get Goals'})
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
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

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)

    //res.status(200).json({message: 'Set Goals'})
})

// @desc Update Goals
// @route PUT /api/goals/id
// @access private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await Goal.findById(req.user.id)
    
    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the loggedin user is logged in
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedGoal)

    //res.status(200).json({message: `Update Goals ${req.params.id}`})
})


// @desc Delete Goals
// @route DELETE /api/goals/id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await Goal.findById(req.user.id)
    
    //Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the loggedin user is logged in
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.remove()
    
    res.status(200).json({id: req.params.id})

    //res.status(200).json({message: `Delete Goals ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}