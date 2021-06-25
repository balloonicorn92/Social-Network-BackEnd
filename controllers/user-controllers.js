const { User } = require('../models');

const userController = {
    createUser({ body }, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    },
    showAllUser(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.json(400).json(err)
        })
    },
    showUserById({ params }, res){
        User.findOne({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'There was no user found by that ID' })
                return
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err)
            res.json(400).json(err)
        })
    },
    updateUser( { params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true } )
        .then(userData => {
            if(!userData){
                res.status(404).json({ message: 'There was no user found by that ID' })
                return
            }
            res.json({ message: 'User successfully updated' })
        })
        .catch(err => {
            console.log(err)
            res.json(400).json(err)
        })
    },
    deleteUser( { params }, res){
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData){
                res.status(404).json({ message: 'No user found under this ID, either user does not exist or has already been deleted' })
                return
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    },
    addFriends( { params, body }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then( userData => {
            if (!userDataa ){
                res.status(404).json({ message: 'This user was not found'})
            }
            res.json(userData)
        })
        .catch(err => res.json(err))
    },
    removeFriends( { params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        ).then(userData => res.json(userData))
        .catch(err => res.json(err))
    }
}

module.exports = userController