const { Types, model, Schema } = require('mongoose');

const ReactionSchema = new Schema ({
    rectionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        requried: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
        //,
        // get: createdAt => formatDate(createdAt)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: { 
        type: Date,
        default: Date.now
       // get: createdAt => formatDate(createdAt)
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reactions: [ ReactionSchema ]

},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
})

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought 