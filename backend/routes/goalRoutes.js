const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

//router.get('/', getGoals)
//router.post('/', setGoal)
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)

router.route('/').get(protect,getGoals).post(protect,setGoal)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

/*router.get('/', (req, res) => {
    res.status(200).json({message: 'Get Goals'})
})

router.post('/', (req, res) => {
    res.status(200).json({message: 'Set Goals'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
})*/

module.exports = router