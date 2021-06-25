const { Thought, User } = require('../models')

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch( err => {
            res.status(400).json(err)
        })
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            console.log(thoughtData)
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' })
                return;
            }
            res.json(thoughtData);
        })
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        })
        
    },
    createThought({ params, body }, res){
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No user user found with this ID' })
                return
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err))
    },
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        ).then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No user thought found with this ID' })
                return
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err))
    },
    deleteThought( { params }, res ){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then( deteteData => {
            if(!deteteData){
                return res.status(404).json({ message: 'No thought with this ID' })
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            )
        })
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({ message: 'No thought found with this ID' })
                return
            }
            res.json(thoughtData)
        })
        .catch(err => res.json(err))
    },
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
            ).then(thoughtData => {
                if (!thoughtData){
                    res.status(404).json({ message: 'No thought found with this ID' })
                    return
                }
                res.json(thoughtData)
            }).catch(err => res.json(err))
    },
    deleteReaction({ params }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { returnOriginal: false, runValidators: true }
            ).then(reactionData => { 
                if (!reactionData){
                    res.status(404).json({ message: 'No thought found with this ID' })
                    return
                }
                console.log(reactionData)
                res.json(reactionData)
            })
            .catch(err => {
                console.log(Err)
                res.json(err)
            })
    }
}

module.exports = thoughtController

