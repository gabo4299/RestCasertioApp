const { Schema,model } =require('mongoose')


const productsSchema =new Schema({
    name : {
        type:String,
        // unique : true,
        required:true
    },
    stock : Number,
    price      : Number,
    description   : String,
    category : String
})

module.exports = model('Products',productsSchema)