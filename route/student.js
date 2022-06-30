const express = require('express');
const app = express.Router()
const mongoose = require('mongoose')
const Student =  require("../modals/student")


// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message : "Home is working"
//     })
// })

app.get('/', (req,res)=>{
    res.status(200).json({
        message : "Welcome"
    })
})  


app.post("/add", (req,res)=>{
    // const student = new Student({
    //     id :  new mongoose.Types.ObjectId,
    //     name :  req.body.name,
    //     age : req.body.age
    // })
    // student.save()
    // res.status(200).json({
    //     message : "This is students"
    // })
    console.log(req.body);
})

module.exports = app