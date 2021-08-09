import express from "express"
import User from "../../model/UserModel/User.js"
import Post from "../../model/BlogModel/Post.js"
import bcrypt from "bcrypt"

const postRouter = express.Router()

//Create Post
postRouter.post("/", async (req, res)=>{
   const newPost = new Post(req.body);
   try {
           const savePost = await newPost.save()
           res.status(200).send(savePost)
   } catch (error) {
       res.status(500).send({msg: error.message})
   }
    
})

//Get All Post or query
postRouter.get("/", async(req, res)=>{
    const username = req.query.user
    const catName = req.query.cat;
    const comment  = req.query.comment
    try{
        let posts;
        if(username){
            posts = await Post.find({username:username})
        }else if (catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else if(comment){
            posts = await Post.find({comment:{
                $in:[comment]
            }})
        }else{
            posts = await Post.find({})
        }
        res.status(200).send(posts)
    }catch(error){
            res.status(500).send({msg: error.message})
    }
})
postRouter.get("/:id", async(req, res)=>{
       const postId = req.params.id
    try{
        const post = await Post.findById({_id:postId})
        if(post){
            res.send(post)
        }else{
            res.status(401).send("The Post does not exist")
        }
    
    }catch(error){
            res.status(500).send({msg: error.message})
    }
})
//updatePost

postRouter.put("/:id", async (req, res)=>{
    try {
        const getPost = await Post.findById(req.params.id)
        if(getPost.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                },{
                    new:true
                })
            } catch (error) {
                
            }
            
            res.status(200).send(getPost)
        }else{
            res.status(401).send("Cannot Update someoneelse Post")
        }

    } catch (error) {
        
        res.status(500).send({msg: error.message})
    }
    
})

//delete Post
postRouter.delete("/:id", async(req, res)=>{
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.body.id)
            try {
                await Post.deleteMany({username:user.username})
               await User.findByIdAndDelete(req.body.id)
                    res.status(200).send("User has been Deleted")
            } catch (error) {
                res.status(500).send({msg:error.message})
            }
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }else{
    res.status(401).send("You can only update your own account")
}
})





export default postRouter;