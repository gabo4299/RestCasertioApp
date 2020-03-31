const { Schema,model } =require('mongoose')


const userSchema =new Schema({
    username : {
        type:String,
        unique : true,
        required:true
    },
    password : String,
    age      : Number,
    gender   : String,
    name : String
})

module.exports = model('Users',userSchema)