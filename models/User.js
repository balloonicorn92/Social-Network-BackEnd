const { model, Schema, Types } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [ // change this back to this.ObjectId... see if it works :)
        {
            type: Schema.Types.ObjectId,
            ref: 'User'  
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User;