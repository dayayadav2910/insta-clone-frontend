const express =  require('express')
const app = express()
const mongoos = require('mongoose')
const bodyparser =  require('body-parser')
const cors = require('cors')

const userRoute = require("./route/user")
const userPost = require("./route/post")
const Student =  require("./route/student")
// app.use((req,res)=>{
//     res.status(200).json({
//         message : "app is running"
//     })
// })

app.use(express.json())
app.use(cors({
    origin: "*",
    // methods: ["GET", "POST", "PUT", "OPTIONS"]
}))
mongoos.connect('mongodb+srv://daya2910:Daya2910@instacluster.bgjlo.mongodb.net/?retryWrites=true&w=majority')
mongoos.connection.on('error', err=>{
    console.log("Connection failed")
})
mongoos.connection.on('connected', connected =>{
    console.log("Connection successfull")
})

app.use('/user', userRoute)
app.use("/post", userPost)
app.use("/student", Student)

module.exports = app