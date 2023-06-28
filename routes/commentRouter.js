const express = require('express')
const { newComment, allComments, singleComment, updateComment, deleteComment } = require('../controllers/commentController')


const router = express.Router()

router.post('/newcomment/:id', newComment)

router.get('/allcomments', allComments)

router.get('/onecomment/:id', singleComment)

router.patch('/updatecomment/:id', updateComment)

router.delete('/deletecomment/:blogId/:commentId', deleteComment)

module.exports = router