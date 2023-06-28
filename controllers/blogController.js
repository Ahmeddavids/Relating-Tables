const blogModel = require('../models/blogModel')
const comment = require('../models/commentModel')
const commentModel = require('../models/commentModel')

// create new blog post
const newPost = async (req, res) => {
    try {
        const newPosts = await blogModel.create(req.body)
        res.status(201).json({
            message: 'Post created successfully',
            data: newPosts
        })
    } catch (error) {
        res.status(400).json({
            message: 'Fail to create post',
            Error: error.message
        })
    }
}


// get all blog posts
const allPost = async (req, res) => {
    try {
        const allBlogs = await blogModel.find().populate('comment')
        if (allBlogs === null) {
            res.status(404).json({
                message: 'There are no blogs in this database'
            })
        } else {
            res.status(200).json({
                message: 'All blog posts showing',
                data: allBlogs,
                totalBlogs: `The total number of blogs in this database are: ${allBlogs.length}`
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

// get one blog post
const onePost = async (req, res) => {
    try {
        const oneBlog = await blogModel.findById(req.params.id).populate('comment')
        if (!oneBlog) {
            res.status(404).json({
                message: `The blog with id: ${req.params.id} not found`
            })
        } else {
            res.status(200).json({
                message: 'current blog post showing',
                data: oneBlog,
                TotalComments: `${oneBlog.comment.length}`
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


// updating a blog post
const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        if (!blogId) {
            res.status(404).json({
                message: `The blog with id: ${blogId} is not found`
            })
        } else {
            const updatePost = await blogModel.findByIdAndUpdate(blogId, req.body, { new: true })
            res.status(200).json({
                message: 'Blog updated successfuly',
                data: updatePost
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



// deleting a blog post
const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blogPost = await blogModel.findById(blogId)
        if (!blogPost) {
            res.status(404).json({
                message: `Blog with id: ${blogId} not found`
            })
        } else {
            const deletedPost = await blogModel.findByIdAndDelete(blogId)

            // loop into the comment database and check for all the comments associated to the blog and deletes them.
            await commentModel.deleteMany({_id: {$in: blogPost.comment}})
            res.status(200).json({
                message: `Blog successfully deleted`,
                data: deletedPost
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}






module.exports = {
    newPost,
    allPost,
    onePost,
    updateBlog,
    deleteBlog
}