const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
    postComment: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogpost"
    }]
}, {
    timestamps: true
})


const comment = mongoose.model('comments', commentModel)

module.exports = comment