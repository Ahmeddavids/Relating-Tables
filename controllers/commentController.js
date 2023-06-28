const commentModel = require('../models/commentModel')
const blogModel = require('../models/blogModel')

const newComment = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id)
        const postComments = await new commentModel(req.body)
        postComments.posts = blog
        await postComments.save()
        blog.comment.push(postComments)
        await blog.save()
        res.status(201).json({
            status: 'success',
            message: 'commented successfuly',
            data: blog
        })
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            Error: error.message
        })
    }
}

// get all comments
const allComments = async (req, res) => {
    try {
        const allComment = await commentModel.find()
        if (allComment === null) {
            res.status(404).json({
                message: 'There are no comments in this database'
            })
        } else {
            res.status(200).json({
                message: `All blog comments showing`,
                data: allComment,
                totalComments: `The total number of comments are: ${allComment.length}`
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


// get a single comment
const singleComment = async (req, res) => {
    try {
        const oneComment = await commentModel.findById(req.params.id)
        if (!oneComment) {
            res.status(404).json({
                message: `Comment with id: ${req.params.id} not found`
            })
        } else {
            res.status(200).json({
                message: 'Current blog post showing',
                data: oneComment
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


// updating a comment post
const updateComment = async (req, res) => {
    try {
        const updatePost = await commentModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatePost) {
            res.status(404).json({
                message: `Comment with id: ${req.params.id} not found`
            })
        } else {
            res.status(200).json({
                message: 'comment updated successfuly',
                data: updatePost
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// deleting a comment post
const deleteComment = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const commentId = req.params.commentId

        let blog = await blogModel.findById(blogId);
        if (!blog) {
            res.status(404).json({
                message: 'Blog not found'
            })
        } else {
            const deletedComment = await commentModel.findByIdAndDelete(commentId)

            if (!deletedComment) {
                res.status(404).json({
                    message: `Comment with id: ${commentId} not found`
                })
            } else {
                blog.comment = blog.comment.filter((comments) => comments !== commentId);
                await blog.save()
                res.status(200).json({
                    message: `comment successfully deleted`,
                    data: deletedComment
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}









module.exports = {
    newComment,
    allComments,
    singleComment,
    updateComment,
    deleteComment
}