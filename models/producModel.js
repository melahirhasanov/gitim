const mongoose=require("mongoose")
const Schema=mongoose.Schema
const newSchema=new Schema({
    title:{
        type:String,required:true
    },
    description:{
        type:String,required:true,trim:true
    },
    price:{
        type:Number,required:true
    },
    imageUrl:{
        type:String,required:true
    },
})
const ProductModel=mongoose.model("products",newSchema)
module.exports=ProductModel