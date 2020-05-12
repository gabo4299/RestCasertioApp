const { Schema,model } =require('mongoose')


const userSchema =new Schema({
    username : {
        type:String,
        unique : true,
        required:true
    },
    password : String,
    mail      : String,
    phone   : Number,
    name : String,
    seller:Boolean
})

module.exports = model('Users',userSchema)