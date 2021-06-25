const router = require('express').Router();
const { 
    createUser,
    showAllUser, 
    showUserById,
    updateUser,
    deleteUser,
    addFriends,
    removeFriends
} = require('../../controllers/user-controllers')

router
.route('/')
.get(showAllUser)
.post(createUser)

router
.route('/:id')
.get(showUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/:userId/:friendId')
.post(addFriends)
.delete(removeFriends)

module.exports = router