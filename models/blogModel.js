const mongoose = require('mongoose')

const blogModel = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments"
    }]
}, {
    timestamps: true
})


const blog = mongoose.model('blogpost', blogModel)

module.exports = blog