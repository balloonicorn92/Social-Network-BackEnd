const router = require('express').Router()

const {
    createThought, 
    deleteThought,
    addReaction,
    deleteReaction,
    getAllThoughts,
    getThoughtById,
    updateThought
} = require ('../../controllers/thought-controller')

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)

router
.route('/:userId/:thoughtId')
.put(addReaction)
.delete(deleteThought)

router
.route('/')
.get(getAllThoughts)

router
.route('/:userId')
.post(createThought)


router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router
