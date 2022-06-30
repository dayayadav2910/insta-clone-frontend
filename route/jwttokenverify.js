const jwt = require('jsonwebtoken');
const User = require('../modals/user')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "You must be logged in "})
    }
    console.log(authorization);
    const token =  authorization.replace("Bearer ","")
    console.log("token", token);
    jwt.verify(token,"This is dummy text",(err, payload)=>{
        console.log("Payload",err);
        if(err){
            return res.status(401).json({error : "You must be logged in app"})
        }
        const {_id}= payload
        User.findById(_id).then(userdata =>{
            req.user =  userdata
            console.log("User",req.user);
            next()
        })
    })
}