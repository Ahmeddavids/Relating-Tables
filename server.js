const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
// dotenv.config({path: './config/config.env'})
const router = require('./routes/blogRouter')
const route = require('./routes/commentRouter')



const app = express()
app.use(express.json())

app.use('/api', router)
app.use('/api', route)

const url = process.env.ATLAS_LOGIN

mongoose.connect(url).then(() => {
    console.log('Connection to database successful');
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening to port: ${process.env.PORT}`);
    })
})