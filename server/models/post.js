const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types
// we are creating a relation between user and the post so getting the objecId

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        // creating a relation between user and their Post
        type:ObjectId,
        // here we are refering to the UserSchema
        ref:"User"
    }
})

mongoose.model("Post" , postSchema)