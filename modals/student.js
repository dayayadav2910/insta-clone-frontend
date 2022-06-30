const mongoose =  require("mongoose");


studentSchema = mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name : String,
    age :  String
})


module.exports = mongoose.model('Student', studentSchema)