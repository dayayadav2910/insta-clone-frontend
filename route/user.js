const express = require('express');
const app = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const requireLogin = require('./jwttokenverify');
const User = require('../modals/user');


// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message : "Home is working"
//     })
// })

app.get('/protected', requireLogin,(req, res) => {
    res.send("Hello Daya")
})
app.post('/signup', (req, res, next) => {

    const { name, email, password, username } = req.body
    if (!email || !password || !username || !name) {
        return res.status(422).json({
            error: "Please add all the fields"
        })
    }
    else {
        User.findOne({ email: email })
            .then((savedUser) => {
                if (savedUser) {
                    return res.status(422).json({ error: "User already exists" })
                }
                bcrypt.hash(password, 12)
                    .then(hashepassword => {
                        const user = new User({
                            name,
                            email,
                            password : hashepassword,
                            username
                        })
                        user.save()
                            .then(user => {
                                res.json({ new_user: user })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
})
// app.post('/login',(req,res)=>{
//     const {email,password} = req.body
//     if(!email || !password){
//        return res.status(422).json({error:"please add email or password"})
//     }
//     User.findOne({email:email})
//     .then(savedUser=>{
//         if(!savedUser){
//            return res.status(422).json({error:"Invalid Email or password"})
//         }
//         bcrypt.compare(password,savedUser.password)
//         .then(doMatch=>{
//             if(doMatch){
//                 // res.json({message:"successfully signed in"})
//                const token = jwt.sign({_id:savedUser._id, name:savedUser.name},"This is My Text", {expiresIn : "1800000"})
//                const {_id,name,email} = savedUser
//                res.json({token,user:{_id,name,email}})
//             }
//             else{
//                 return res.status(422).json({error:"Invalid Email or password"})
//             }
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     })
// })
app.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    msg: 'User not Found'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: 'Password is not correct'
                    })
                }
                if (result) {
                    // Creating Token
                    const token = jwt.sign({
                        id: user[0].id,
                        _id : user[0]._id,
                        email: user[0].email,
                        name : user[0].name,
                    }, 'This is dummy text', {
                        expiresIn: "1800000",
                    })
                    // Sending Token
                    res.status(200).json({
                        token: token,
                        user : {
                            email: user[0].email,
                            id: user[0].id,
                            _id : user[0]._id,
                            name : user[0].name,
                        }
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})

app.get('/alluser', async (req, res) => {
    try {
        const result = await User.find({})
        res.send(result)
    } catch (error) {
        console.log(error.msg)
    }
})
module.exports = app;



