import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    text: {type: String, required: true},
},
{timestamps: true}
)
 

const Comment = mongoose.model("Category", commentSchema)


export default Comment;