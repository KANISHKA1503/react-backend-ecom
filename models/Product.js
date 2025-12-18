const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema(
{      
        id:{type:Number,unique:true},
        name:{type:String,required:true},
        originalPrice:{type:Number,required:true,min:1},
        sellingPrice:{type:Number,required:true,min:1},
        imageurl:{type:String,required:true},
        category:{type:String,required:true}
        
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("products",ProductSchema)