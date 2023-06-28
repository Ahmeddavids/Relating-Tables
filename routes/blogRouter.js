const express = require('express')
const { newPost, allPost, onePost, updateBlog, deleteBlog } = require('../controllers/blogController')


const router = express.Router()

router.post('/newblog', newPost)

router.get('/allblogs', allPost)

router.get('/oneblog/:id', onePost)

router.patch('/updateblog/:id', updateBlog)

router.delete('/deleteblog/:id', deleteBlog)


module.exports = router