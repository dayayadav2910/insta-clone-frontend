const mongoose =  require('mongoose')

userSchema  = mongoose.Schema({
    id :  mongoose.Schema.Types.ObjectId,
    email : String,
    password  : String,
    username : String,
    name :  String,
})

module.exports = mongoose.model('User', userSchema )